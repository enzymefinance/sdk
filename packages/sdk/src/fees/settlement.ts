import { encodeAbiParameters } from "viem/abi";
import { Address } from "../types.js";

export function encodeSettlePreBuySharesArgs({
  sharesBuyer,
  investmentAmount,
}: {
  sharesBuyer: Address;
  investmentAmount: bigint;
}) {
  return encodeAbiParameters(
    [
      {
        type: "address",
        name: "sharesBuyer",
      },
      {
        type: "uint256",
        name: "investmentAmount",
      },
    ],
    [sharesBuyer, investmentAmount],
  );
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
  return encodeAbiParameters(
    [
      {
        type: "address",
        name: "sharesBuyer",
      },
      {
        type: "uint256",
        name: "investmentAmount",
      },
      {
        type: "uint256",
        name: "sharesBought",
      },
    ],
    [sharesBuyer, investmentAmount, sharesBought],
  );
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
  return encodeAbiParameters(
    [
      {
        type: "address",
        name: "sharesRedeemer",
      },
      {
        type: "uint256",
        name: "sharesToRedeem",
      },
      {
        type: "bool",
        name: "forSpecifiedAssets",
      },
    ],
    [sharesRedeemer, sharesToRedeem, forSpecifiedAssets],
  );
}
