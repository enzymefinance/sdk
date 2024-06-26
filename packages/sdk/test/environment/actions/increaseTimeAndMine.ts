import type { TestEnvironment } from "@enzymefinance/sdk/test";

export async function increaseTimeAndMine({
  environment,
  seconds,
  blocks = 1,
}: {
  environment: TestEnvironment;
  seconds: bigint;
  blocks?: number;
}) {
  if (seconds <= 0) {
    throw new Error("Seconds must be a positive integer");
  }

  if (blocks <= 0) {
    throw new Error("Number of blocks must be a positive integer");
  }

  await environment.anvil.increaseTime({ seconds: Number(seconds) });
  await environment.anvil.mine({ blocks });
}
