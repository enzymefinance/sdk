import { type BuySharesParams, prepareBuySharesParams } from "../../src/actions/buyShares.js";
import { getSharesActionTimelock } from "../../src/reads/getSharesActionTimelock.js";
import { toSeconds } from "../../src/utils/conversion.js";
import type { PartialPick } from "../../src/utils/types.js";
import { WETH } from "../constants.js";
import { publicClient, sendTestTransaction } from "../globals.js";
import { approveSpend } from "./approveSpend.js";
import { increaseTimeAndMine } from "./increaseTimeAndMine.js";
import { wrapEther } from "./wrapEther.js";
import { IComptrollerLib } from "@enzymefinance/abis";
import type { Address } from "viem";

export type BuySharesSettings = PartialPick<BuySharesParams, "minSharesQuantity"> & {
  comptrollerProxy: Address;
  sharesBuyer: Address;
  skipSharesActionTimelock?: boolean;
};

export async function buyShares({
  comptrollerProxy,
  investmentAmount,
  sharesBuyer,
  minSharesQuantity,
  skipSharesActionTimelock = true,
}: BuySharesSettings) {
  const denominationAsset = await publicClient.readContract({
    abi: IComptrollerLib,
    address: comptrollerProxy,
    functionName: "getDenominationAsset",
  });

  if (denominationAsset === WETH) {
    await wrapEther({
      account: sharesBuyer,
      amount: investmentAmount,
    });
  }

  await approveSpend({
    token: denominationAsset,
    amount: investmentAmount,
    spender: comptrollerProxy,
    account: sharesBuyer,
  });

  const { result: sharesReceived } = await sendTestTransaction({
    ...prepareBuySharesParams({
      investmentAmount: investmentAmount,
      minSharesQuantity: minSharesQuantity ?? 1n, // NOTE: You should never use `1n` in production. This is only for testing.
    }),
    account: sharesBuyer,
    address: comptrollerProxy,
  });

  if (skipSharesActionTimelock) {
    const sharesActionTimelock = await getSharesActionTimelock(publicClient, {
      comptrollerProxy,
    });

    await increaseTimeAndMine({
      // NOTE: We add an extra hour to the timelock to be extra sure that the timelock has passed. This solves a weird issue
      // with anvil where sometimes it doesn't seem to reliably increase the time exactly by the given value.
      seconds: sharesActionTimelock + toSeconds({ hours: 1 }),
      blocks: 1,
    });
  }

  return sharesReceived;
}
