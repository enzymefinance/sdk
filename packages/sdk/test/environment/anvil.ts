import { Utils } from "@enzymefinance/sdk";
import { fetchLogs } from "@viem/anvil";
import {
  http,
  Abi,
  type Chain,
  ExtractChainFormatterReturnType,
  Hash,
  HttpTransport,
  PublicClient,
  SimulateContractReturnType,
  TestClient,
  TransactionReceipt,
  WriteContractParameters,
  createPublicClient,
  createTestClient,
} from "viem";
import { encodeFunctionData, parseAccount } from "viem/utils";
import { beforeAll, beforeEach } from "vitest";

// TODO: Use proper constants type.
import type { Constants } from "./mainnet.js";

const poolId = Number(process.env.VITEST_POOL_ID ?? 1);

export type TestEnvironment<TChain extends Chain = Chain> = {
  send: TestSend<TChain>;
  anvil: TestClient<"anvil", HttpTransport, TChain>;
  client: PublicClient<HttpTransport, TChain>;
  chain: TChain;
  constants: Constants;
};

export type TestSend<TChain extends Chain> = <TFunctionName extends string, TAbi extends Abi>(
  params: TestSendParams<TFunctionName, TAbi, TChain>,
) => Promise<TestSendReturnType<TFunctionName, TAbi, TChain>>;

export type TestSendParams<
  TFunctionName extends string,
  TAbi extends Abi,
  TChain extends Chain,
> = Utils.Viem.PopulatedTransactionSimulateParams<TChain> & {
  transaction: Utils.Viem.PopulatedTransaction<TFunctionName, TAbi>;
};

export type TestSendReturnType<
  TFunctionName extends string,
  TAbi extends Abi,
  TChain extends Chain,
> = SimulateContractReturnType<TAbi, TFunctionName, TChain> & {
  hash: Hash;
  receipt: ExtractChainFormatterReturnType<TChain, "transactionReceipt", TransactionReceipt>;
};

export function createSetup<TChain extends Chain>({
  chain,
  constants,
  proxyFamily,
  forkUrl,
  forkBlockNumber: defaultForkBlockNumber,
}: {
  chain: TChain;
  constants: Constants;
  proxyFamily: number;
  forkBlockNumber: bigint;
  forkUrl: string;
}) {
  return ({
    resetHook = "beforeAll",
    forkBlockNumber = defaultForkBlockNumber,
  }: {
    resetHook?: "beforeAll" | "beforeEach";
    forkBlockNumber?: bigint;
  } = {}): TestEnvironment<TChain> => {
    const proxyId = proxyFamily + poolId;
    const transport = http(`http://127.0.0.1:8545/${proxyId}`, {
      timeout: 150_000,
      fetchOptions: {
        headers: {
          "x-anvil-fork-chain": `${chain.id}`,
          "x-anvil-fork-block": `${forkBlockNumber}`,
          "x-anvil-fork-url": forkUrl,
        },
      },
    });

    const anvil = createTestClient({
      chain,
      mode: "anvil",
      transport,
    });

    const client = createPublicClient({
      chain,
      transport,
    });

    const send = async <TFunctionName extends string, TAbi extends Abi>({
      transaction,
      ...params
    }: Utils.Viem.PopulatedTransactionSimulateParams<TChain> & {
      transaction: Utils.Viem.PopulatedTransaction<TFunctionName, TAbi>;
    }): Promise<TestSendReturnType<TFunctionName, TAbi, TChain>> => {
      const { request, result } = await transaction.simulate(client, params);

      // We simply pretend that the simulation is always correct. This is not going to work outside of a pristine, isolated, test environment.
      const hash = await anvil.sendUnsignedTransaction({
        from: parseAccount(request.account).address,
        to: request.address,
        data: encodeFunctionData(request as unknown as WriteContractParameters),
        ...(request.value === undefined ? {} : { value: request.value }),
        ...(request.nonce === undefined ? {} : { nonce: request.nonce }),
        ...(request.gas === undefined ? {} : { gas: request.gas }),
        ...(request.gasPrice === undefined ? {} : { gas: request.gasPrice }),
        ...(request.accessList === undefined ? {} : { accessList: request.accessList }),
        ...(request.maxFeePerGas === undefined ? {} : { maxFeePerGas: request.maxFeePerGas }),
        ...(request.maxPriorityFeePerGas === undefined ? {} : { maxPriorityFeePerGas: request.maxPriorityFeePerGas }),
      });

      const receipt = await client.waitForTransactionReceipt({ hash });

      return { request, result, receipt, hash } as const;
    };

    if (resetHook === "beforeAll") {
      beforeAll(async () => {
        await anvil.reset({
          blockNumber: forkBlockNumber,
          jsonRpcUrl: forkUrl,
        });
      });
    }

    beforeEach(async (context) => {
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

      if (resetHook === "beforeEach") {
        await anvil.reset({
          blockNumber: forkBlockNumber,
          jsonRpcUrl: forkUrl,
        });
      }
    });

    return {
      send,
      anvil,
      client,
      chain,
      constants,
    } as const;
  };
}
