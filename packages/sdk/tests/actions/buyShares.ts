import { type Address } from "viem";
import { WETH } from "../constants.js";
import { prepareBuySharesParams, type BuySharesParams } from "../../src/actions/buyShares.js";
import { IComptroller } from "../../../abis/src/abis/IComptroller.js";
import { wrapEther } from "./wrapEther.js";
import { approveSpend } from "./approveSpend.js";
import type { PartialPick } from "../../src/utils/types.js";
import { publicClient, sendTestTransaction } from "../globals.js";

export type BuySharesSettings = PartialPick<BuySharesParams, "minSharesQuantity"> & {
  comptrollerProxy: Address;
  sharesBuyer: Address;
};

export async function buyShares(settings: BuySharesSettings) {
  const denominationAsset = await publicClient.readContract({
    abi: IComptroller,
    address: settings.comptrollerProxy,
    functionName: "getDenominationAsset",
  });

  if (denominationAsset === WETH) {
    await wrapEther({
      account: settings.sharesBuyer,
      amount: settings.investmentAmount,
    });
  }

  await approveSpend({
    token: denominationAsset,
    amount: settings.investmentAmount,
    spender: settings.comptrollerProxy,
    account: settings.sharesBuyer,
  });

  const { result: sharesReceived } = await sendTestTransaction({
    ...prepareBuySharesParams({
      investmentAmount: settings.investmentAmount,
      minSharesQuantity: settings.minSharesQuantity ?? 1n, // NOTE: You should never use `1n` in production. This is only for testing.
    }),
    account: settings.sharesBuyer,
    address: settings.comptrollerProxy,
  });

  return sharesReceived;
}
