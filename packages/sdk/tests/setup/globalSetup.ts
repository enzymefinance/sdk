import { FORK_BLOCK_NUMBER, FORK_URL } from "../constants.js";
import { startProxy } from "@viem/anvil";

export default async function () {
  return await startProxy({
    options: {
      forkBlockNumber: FORK_BLOCK_NUMBER,
      forkUrl: FORK_URL,
    },
  });
}
