import { fetchLogs } from "@viem/anvil";
import {
  http,
  Abi,
  type Chain,
  HttpTransport,
  PublicClient,
  SimulateContractParameters,
  TestClient,
  WriteContractParameters,
  createPublicClient,
  createTestClient,
} from "viem";
import { localhost, mainnet as viemMainnet, polygon as viemPolygon } from "viem/chains";
import { encodeFunctionData, parseAccount } from "viem/utils";
import { beforeAll, beforeEach } from "vitest";
import { FORK_BLOCK_NUMBER, FORK_BLOCK_NUMBER_POLYGON, FORK_URL, FORK_URL_POLYGON } from "./constants.js";

const poolId = Number(process.env.VITEST_POOL_ID ?? 1);

export type TestEnvironment<TChain extends Chain> = {
  sendTestTransaction: ReturnType<typeof createSendTestTransaction<TChain>>;
  testClient: TestClient<"anvil", HttpTransport, TChain>;
  publicClient: PublicClient<HttpTransport, TChain>;
};

const mainnet = {
  ...localhost,
  id: viemMainnet.id,
  contracts: viemMainnet.contracts,
} as const satisfies Chain;

export const setupMainnet: (options?: {
  forkBlockNumber: bigint;
  forkUrl: string;
}) => TestEnvironment<typeof mainnet> = createSetup({
  chain: mainnet,
  defaultForkUrl: FORK_URL,
  defaultForkBlockNumber: FORK_BLOCK_NUMBER,
  proxyFamily: 1000,
});

const polygon = {
  ...localhost,
  id: viemPolygon.id,
  contracts: viemPolygon.contracts,
} as const satisfies Chain;

export const setupPolygon: (options?: {
  forkBlockNumber: bigint;
  forkUrl: string;
}) => TestEnvironment<typeof polygon> = createSetup({
  chain: polygon,
  defaultForkUrl: FORK_URL_POLYGON,
  defaultForkBlockNumber: FORK_BLOCK_NUMBER_POLYGON,
  proxyFamily: 2000,
});

function createSendTestTransaction<TChain extends Chain>({
  testClient,
  publicClient,
}: {
  testClient: TestClient<"anvil", HttpTransport, TChain>;
  publicClient: PublicClient<HttpTransport, TChain>;
}) {
  return async function sendTestTransaction<
    TAbi extends Abi | readonly unknown[],
    TFunctionName extends string = string,
  >(args: SimulateContractParameters<TAbi, TFunctionName>) {
    const { request, result } = await publicClient.simulateContract(args);
    const account = parseAccount(request.account);
    const params = request as unknown as WriteContractParameters;

    // We simply pretend that the simulation is always correct. This is not going to work outside of a pristine, isolated, test environment.
    const hash = await testClient.sendUnsignedTransaction({
      from: account.address,
      to: params.address,
      data: encodeFunctionData(params),
      ...(params.value === undefined ? {} : { value: params.value }),
      ...(params.nonce === undefined ? {} : { nonce: params.nonce }),
      ...(params.gas === undefined ? {} : { gas: params.gas }),
      ...(params.gasPrice === undefined ? {} : { gas: params.gasPrice }),
      ...(params.accessList === undefined ? {} : { accessList: params.accessList }),
      ...(params.maxFeePerGas === undefined ? {} : { maxFeePerGas: params.maxFeePerGas }),
      ...(params.maxPriorityFeePerGas === undefined ? {} : { maxPriorityFeePerGas: params.maxPriorityFeePerGas }),
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return { request, result, receipt, hash };
  };
}

function createSetup<TChain extends Chain>({
  chain,
  proxyFamily,
  defaultForkBlockNumber,
  defaultForkUrl,
}: {
  chain: TChain;
  proxyFamily: number;
  defaultForkBlockNumber: bigint;
  defaultForkUrl: string;
}) {
  return ({
    forkBlockNumber = defaultForkBlockNumber,
    forkUrl = defaultForkUrl,
  }: {
    forkBlockNumber?: bigint;
    forkUrl?: string;
  } = {}) => {
    const proxyId = proxyFamily + poolId;
    const transport = http(`http://127.0.0.1:8545/${proxyId}`, {
      timeout: 150_000,
      fetchOptions: {
        headers: {
          "x-anvil-fork-block": `${forkBlockNumber}`,
          "x-anvil-fork-url": forkUrl,
        },
      },
    });

    const testClient = createTestClient({
      chain,
      mode: "anvil",
      transport,
    });

    const publicClient = createPublicClient({
      chain,
      transport,
    });

    beforeAll(async () => {
      await testClient.reset({
        blockNumber: FORK_BLOCK_NUMBER,
        jsonRpcUrl: FORK_URL,
      });
    });

    beforeEach((context) => {
      // Print the last log entries from anvil after each test.
      context.onTestFailed(async (result) => {
        try {
          const response = await fetchLogs("http://127.0.0.1:8545", proxyId);
          const logs = response.slice(-20);

          if (logs.length === 0) {
            return;
          }

          // Try to append the log messages to the vitest error message if possible. Otherwise, print them to the console.
          const error = result.errors?.[0];

          if (error !== undefined) {
            error.message += "\n\nAnvil log output\n=======================================\n";
            error.message += `\n${logs.join("\n")}`;
          } else {
            console.log(...logs);
          }
        } catch {}
      });
    });

    return {
      sendTestTransaction: createSendTestTransaction({ testClient, publicClient }),
      testClient,
      publicClient,
    };
  };
}
