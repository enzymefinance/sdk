import { testClient } from "../client.js";
import { toSeconds } from "../../src/utils/conversion.js";

export async function increaseTimeAndMine({ days, blocks }: { days: number; blocks: number }) {
  return await Promise.all([
    testClient.increaseTime({ seconds: Number(toSeconds({ days })) }),
    testClient.mine({ blocks }),
  ]);
}
