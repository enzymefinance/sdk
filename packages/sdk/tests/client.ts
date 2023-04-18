import { createPublicClient, createTestClient, http } from "viem";
import { mainnet } from "viem/chains";
import { createTestSender } from "./utils/createTestSender.js";
import { approveSpend } from "./actions/approveSpend.js";
import { buyShares } from "./actions/buyShares.js";
import { createTestVault } from "./actions/createTestVault.js";
import { wrapEther } from "./actions/wrapEther.js";
import { getBalanceOf } from "./actions/getBalanceOf.js";
import { increaseTimeAndMine } from "./actions/increaseTimeAndMine.js";

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

export const testActions = {
  createTestVault,
  wrapEther,
  approveSpend,
  buyShares,
  getBalanceOf,
  increaseTimeAndMine,
};
