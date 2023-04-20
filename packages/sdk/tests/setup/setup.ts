import { afterAll, beforeAll } from "vitest";
import { testClient } from "../globals.js";
import { FORK_BLOCK_NUMBER, FORK_URL, VITALIK } from "../constants.js";

beforeAll(async () => {
  await testClient.impersonateAccount({
    address: VITALIK,
  });
});

afterAll(async () => {
  await testClient.reset({
    blockNumber: FORK_BLOCK_NUMBER,
    jsonRpcUrl: FORK_URL,
  });
});
