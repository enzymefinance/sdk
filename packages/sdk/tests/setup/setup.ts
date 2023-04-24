import { afterAll } from "vitest";
import { testClient } from "../globals.js";
import { FORK_BLOCK_NUMBER, FORK_URL } from "../constants.js";

afterAll(async () => {
  await testClient.reset({
    blockNumber: FORK_BLOCK_NUMBER,
    jsonRpcUrl: FORK_URL,
  });
});
