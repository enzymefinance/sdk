import { createPublicClient, createTestClient, http } from "viem";
import { execa, type ExecaChildProcess } from "execa";
import { beforeAll, afterAll, beforeEach } from "vitest";

export const anvilPort = 8545 + Number(process.env.VITEST_POOL_ID ?? 1);

export function setupAnvil({
  forkUrl = process.env.VITEST_ANVIL_FORK_URL,
  forkBlockNumber = Number(process.env.VITEST_ANVIL_FORK_BLOCK_NUMBER ?? 16994400),
}: {
  forkUrl?: string;
  forkBlockNumber?: number;
} = {}) {
  let subprocess: ExecaChildProcess;
  const signal = new AbortController();

  const testClient = createTestClient({
    mode: "anvil",
    transport: http(`http://127.0.0.1:${anvilPort}`),
  });

  const publicClient = createPublicClient({
    transport: http(`http://127.0.0.1:${anvilPort}`),
  });

  beforeAll(async () => {
    const options = {
      "--port": `${anvilPort}`,
      ...(forkUrl ? { "--fork-url": forkUrl } : {}),
      ...(forkBlockNumber ? { "--fork-block-number": `${forkBlockNumber}` } : {}),
    };

    const args = Object.entries(options).flatMap(([key, value]) => [key, value]);

    subprocess = execa("anvil", args, {
      signal: signal.signal,
      cleanup: true,
    });

    while (true) {
      try {
        await publicClient.getChainId();
        break;
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }, 1000);

  beforeEach(async () => {
    await testClient.reset({
      blockNumber: BigInt(forkBlockNumber),
      ...(forkUrl ? { jsonRpcUrl: forkUrl } : {}),
    });
  }, 1000);

  afterAll(async () => {
    signal.abort();

    try {
      await subprocess;
    } catch (error) {}
  }, 1000);
}
