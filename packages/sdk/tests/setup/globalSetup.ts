import { createAnvilProxy } from "@fubhy/anvil";
import { FORK_BLOCK_NUMBER, FORK_URL } from "../constants.js";

export default async function () {
  return await createAnvilProxy({
    anvilOptions: {
      forkBlockNumber: FORK_BLOCK_NUMBER,
      forkUrl: FORK_URL,
    },
  });
}
