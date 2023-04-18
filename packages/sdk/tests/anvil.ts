import { execa, type ExecaChildProcess } from "execa";
import { beforeAll, afterAll, beforeEach } from "vitest";
import { publicClient, testClient } from "./globals.js";

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

  beforeAll(async () => {
    const options = {
      "--port": `${anvilPort}`,
      ...(forkUrl ? { "--fork-url": forkUrl } : {}),
      ...(forkBlockNumber ? { "--fork-block-number": `${forkBlockNumber}` } : {}),
    };

    const args = Object.entries(options).flatMap(([key, value]) => [key, value]);

    // TODO: This needs fixing (zombie processes, port collisions, etc.).
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
  }, 10000);

  beforeEach(async () => {
    await testClient.reset({
      blockNumber: BigInt(forkBlockNumber),
      ...(forkUrl ? { jsonRpcUrl: forkUrl } : {}),
    });
  }, 10000);

  afterAll(async () => {
    signal.abort();

    try {
      await subprocess;
    } catch (error) {}
  }, 10000);
}
