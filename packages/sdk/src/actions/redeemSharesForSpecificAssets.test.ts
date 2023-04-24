import { expect, test } from "vitest";
import { toWei } from "../utils/conversion.js";
import {
  decodeRedeemSharesForSpecificAssetsParams,
  prepareRedeemSharesForSpecificAssetsParams,
  simulateRedeemSharesForSpecificAssets,
} from "./redeemSharesForSpecificAssets.js";
import { encodeFunctionData, getAbiItem, type Address, parseAbiItem } from "viem";
import { prepareFunctionParams } from "../utils/viem.js";
import { publicClient, sendTestTransaction, testActions, testClient } from "../../tests/globals.js";
import { ALICE, WETH, WMATIC, MATIC } from "../../tests/constants.js";
import { IVault } from "@enzymefinance/abis/IVault";

test("test", async () => {
  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  // buy shares...
  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer: ALICE,
    investmentAmount: depositAmount,
  });

  // transfer USDC
  const account = "0x7713974908Be4BEd47172370115e8b1219F4A5f0";
  const USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // usdc

  await testClient.impersonateAccount({
    address: account,
  });

  const abi = parseAbiItem("function transfer(address _to, uint256 _value) public returns (bool success)");

  const recipient = vaultProxy;
  const amount = 1000000n;

  const res = await sendTestTransaction({
    address: USDC,
    abi: [abi],
    functionName: "transfer",
    account: account,
    args: [recipient, amount],
  });

  console.log("TRANSFER RESULT", res);

  const { request, result } = await simulateRedeemSharesForSpecificAssets({
    comptrollerProxy,
    publicClient,
    sharesOwner: ALICE,
    sharesQuantity: depositAmount,
    payoutAssets: [USDC],
    payoutAssetPercentages: [10000n],
  });

  console.log("REDEEM REQUEST", request);
  console.log("REDEEM RESULT", result);
});
