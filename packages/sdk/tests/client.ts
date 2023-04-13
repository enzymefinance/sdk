import { createPublicClient, createTestClient, http } from "viem";
import { mainnet } from "viem/chains";
import { createTestSender } from "./utils/transactions.js";

export const testClient = createTestClient({
  chain: mainnet,
  mode: "anvil",
  transport: http("http://127.0.0.1:8545"),
});

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http("http://127.0.0.1:8545"),
});

export const sendTestTransaction = createTestSender(testClient, publicClient);
