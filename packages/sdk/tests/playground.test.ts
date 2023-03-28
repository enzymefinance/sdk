import { IFundDeployer, IVault } from "@enzymefinance/abis";
import { createTestClient, createPublicClient, getAccount, http } from "viem";
import { expect, it } from "vitest";
import {
  encodeFeeManagerConfigArgs,
  encodeManagementFeeConfigArgs,
  encodePerformanceFeeConfigArgs,
  TEN_PERCENT_IN_BPS,
  TEN_PERCENT_IN_WEI,
} from "../src/index.js";
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

it("should be able to create a vault", async () => {
  const fees = encodeFeeManagerConfigArgs([
    {
      address: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
      settings: encodePerformanceFeeConfigArgs({ feeRate: TEN_PERCENT_IN_BPS }),
    },
    {
      address: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
      settings: encodeManagementFeeConfigArgs({ scaledPerAnnumRate: TEN_PERCENT_IN_WEI }),
    },
  ]);

  const [_, vaultProxy] = await sendTestTransaction(publicClient, {
    account: testAccount,
    abi: IFundDeployer,
    functionName: "createNewFund",
    args: [testAccount.address, "Test Fund", "TEST", "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", 0n, fees, "0x"],
    address: "0x4f1c53f096533c04d8157efb6bca3eb22ddc6360",
  });

  const vaultOwner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getOwner",
  });

  expect(vaultOwner).toBe(testAccount.address);
});
