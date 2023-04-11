import { IVault } from "@enzymefinance/abis";
import { createTestClient, createPublicClient, http } from "viem";
import { expect, test } from "vitest";
import { createTestSender } from "./utils/transactions.js";
import {
  encodeFeeSettings,
  encodeManagementFeeSettings,
  encodeMinMaxInvestmentPolicySettings,
  encodePerformanceFeeSettings,
  encodePolicySettings,
  prepareSetupVaultParams,
  toBps,
  toSeconds,
} from "../src/index.js";
import { mainnet } from "viem/chains";

const testAccount = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const testClient = createTestClient({
  chain: mainnet,
  mode: "anvil",
  transport: http("http://127.0.0.1:8545"),
});

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http("http://127.0.0.1:8545"),
});

const sendTestTransaction = createTestSender(testClient);

test("should allow vault creation", async () => {
  const setupVaultParams = prepareSetupVaultParams({
    vaultOwner: testAccount,
    vaultName: "Test Vault",
    vaultSymbol: "TEST",
    denominationAsset: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    sharesActionTimelock: toSeconds({ days: 1 }),
    feeSettings: encodeFeeSettings([
      {
        address: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
        settings: encodePerformanceFeeSettings({ feeRateInBps: toBps(0.1) }),
      },
      {
        address: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
        settings: encodeManagementFeeSettings({ perAnnumRateInBps: toBps(0.1) }),
      },
    ]),
    policySettings: encodePolicySettings([
      {
        address: "0xebdadfc929c357d12281118828aea556db5be30c",
        settings: encodeMinMaxInvestmentPolicySettings({ minInvestmentAmount: 100n, maxInvestmentAmount: 5000n }),
      },
    ]),
  });

  const {
    result: [_, vaultProxy],
  } = await sendTestTransaction(publicClient, {
    account: testAccount,
    address: "0x4f1c53f096533c04d8157efb6bca3eb22ddc6360",
    ...setupVaultParams,
  });

  const vaultOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getOwner",
  });

  expect(vaultOwner).toBe(testAccount);
});
