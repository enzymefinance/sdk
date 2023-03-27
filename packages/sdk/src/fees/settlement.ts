import { encodePacked } from "viem/abi";
import { Address } from "../types.js";

export function encodeSettlePreBuySharesArgs({
  sharesBuyer,
  investmentAmount,
}: {
  sharesBuyer: Address;
  investmentAmount: bigint;
}) {
  return encodePacked(["address", "uint256"], [sharesBuyer, investmentAmount]);
}

export function encodeSettlePostBuySharesArgs({
  sharesBuyer,
  investmentAmount,
  sharesBought,
}: {
  sharesBuyer: Address;
  investmentAmount: bigint;
  sharesBought: bigint;
}) {
  return encodePacked(["address", "uint256", "uint256"], [sharesBuyer, investmentAmount, sharesBought]);
}

export function encodeSettlePreRedeemSharesArgs({
  sharesRedeemer,
  sharesToRedeem,
  forSpecifiedAssets,
}: {
  sharesRedeemer: Address;
  sharesToRedeem: bigint;
  forSpecifiedAssets: boolean;
}) {
  return encodePacked(["address", "uint256", "bool"], [sharesRedeemer, sharesToRedeem, forSpecifiedAssets]);
}

export function calculateSharesDueWithInflation({
  rawSharesDue,
  sharesSupply,
}: {
  rawSharesDue: bigint;
  sharesSupply: bigint;
}) {
  if (rawSharesDue === 1n || sharesSupply === 1n) {
    return 1n;
  }

  return (rawSharesDue * sharesSupply) / (sharesSupply - rawSharesDue);
}
