import { FORK_BLOCK_NUMBER, FORK_BLOCK_NUMBER_POLYGON, FORK_URL, FORK_URL_POLYGON } from "../constants.js";
import { startProxy } from "@viem/anvil";

export default async function () {
  return await startProxy({
    options: (id) => {
      let forkUrl: string;
      let forkBlockNumber: bigint;

      if (id > 2000 && id < 3000) {
        forkUrl = FORK_URL_POLYGON;
        forkBlockNumber = FORK_BLOCK_NUMBER_POLYGON;
      } else if (id > 1000 && id < 2000) {
        forkUrl = FORK_URL;
        forkBlockNumber = FORK_BLOCK_NUMBER;
      } else {
        throw new Error("Invalid pool id");
      }

      return {
        forkBlockNumber,
        forkUrl,
      };
    },
  });
}
