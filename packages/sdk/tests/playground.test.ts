import { IVault } from "@enzymefinance/abis";
import { createTestClient, createPublicClient, getAccount, http } from "viem";
import { expect, it } from "vitest";
import {
  encodeManagementFeeConfig,
  encodeMinMaxInvestmentPolicy,
  encodePerformanceFeeConfig,
  setupVaultParams,
} from "../src/index.js";
import { toBps } from "../src/utils/conversion.js";
import { createTestSender } from "./utils/transactions.js";

const testAccount = getAccount("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266");
const testClient = createTestClient({
  mode: "anvil",
  transport: http("http://127.0.0.1:8545"),
});

const publicClient = createPublicClient({
  transport: http("http://127.0.0.1:8545"),
});

const sendTestTransaction = createTestSender(testClient);

it("should allow vault creation", async () => {
  const [_, vaultProxy] = await sendTestTransaction(publicClient, {
    account: testAccount,
    address: "0x4f1c53f096533c04d8157efb6bca3eb22ddc6360",
    ...setupVaultParams({
      vaultOwner: testAccount.address,
      vaultName: "Test Vault",
      vaultSymbol: "TEST",
      denominationAsset: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      sharesActionTimelock: 0n,
      feeSettings: [
        {
          address: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
          settings: encodePerformanceFeeConfig({ feeRateInBps: toBps(0.1) }),
        },
        {
          address: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
          settings: encodeManagementFeeConfig({ perAnnumRateInBps: toBps(0.1) }),
        },
      ],
      policySettings: [
        {
          address: "0xebdadfc929c357d12281118828aea556db5be30c",
          settings: encodeMinMaxInvestmentPolicy({ minInvestmentAmount: 100n, maxInvestmentAmount: 5000n }),
        },
      ],
    }),
  });

  const vaultOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getOwner",
  });

  expect(vaultOwner).toBe(testAccount.address);
});
