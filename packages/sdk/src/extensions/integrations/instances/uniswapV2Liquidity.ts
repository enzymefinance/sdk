import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const uniswapV2LiquidityLendEncoding = [
  {
    name: "outgoingAssets",
    type: "address[2]",
  },
  {
    name: "maxOutgoingAssetAmounts",
    type: "uint256[2]",
  },
  {
    name: "minOutgoingAssetAmounts",
    type: "uint256[2]",
  },
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
] as const;

export type UniswapV2LiquidityLendArgs = {
  outgoingAssets: [Address, Address];
  maxOutgoingAssetAmounts: [bigint, bigint];
  minOutgoingAssetAmounts: [bigint, bigint];
  minIncomingAssetAmount: bigint;
};

export function encodeUniswapV2LiquidityLendArgs({
  outgoingAssets,
  maxOutgoingAssetAmounts,
  minOutgoingAssetAmounts,
  minIncomingAssetAmount,
}: UniswapV2LiquidityLendArgs): Hex {
  return encodeAbiParameters(uniswapV2LiquidityLendEncoding, [
    outgoingAssets,
    maxOutgoingAssetAmounts,
    minOutgoingAssetAmounts,
    minIncomingAssetAmount,
  ]);
}

export function decodeUniswapV2LiquidityLendArgs(callArgs: Hex): UniswapV2LiquidityLendArgs {
  const [outgoingAssets, maxOutgoingAssetAmounts, minOutgoingAssetAmounts, minIncomingAssetAmount] =
    decodeAbiParameters(uniswapV2LiquidityLendEncoding, callArgs);

  return {
    outgoingAssets: [...outgoingAssets],
    maxOutgoingAssetAmounts: [...maxOutgoingAssetAmounts],
    minOutgoingAssetAmounts: [...minOutgoingAssetAmounts],
    minIncomingAssetAmount,
  };
}

export const uniswapV2LiquidityRedeemEncoding = [
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "incomingAssets",
    type: "address[]",
  },
  {
    name: "minIncomingAssetAmounts",
    type: "uint256[]",
  },
] as const;

export type UniswapV2LiquidityRedeemArgs = {
  outgoingAssetAmount: bigint;
  incomingAssets: Address[];
  minIncomingAssetAmounts: bigint[];
};

export function encodeUniswapV2LiquidityRedeemArgs({
  outgoingAssetAmount,
  incomingAssets,
  minIncomingAssetAmounts,
}: UniswapV2LiquidityRedeemArgs): Hex {
  return encodeAbiParameters(uniswapV2LiquidityRedeemEncoding, [
    outgoingAssetAmount,
    incomingAssets,
    minIncomingAssetAmounts,
  ]);
}

export function decodeUniswapV2LiquidityRedeemArgs(integrationData: Hex): UniswapV2LiquidityRedeemArgs {
  const [outgoingAssetAmount, incomingAssets, minIncomingAssetAmounts] = decodeAbiParameters(
    uniswapV2LiquidityRedeemEncoding,
    integrationData,
  );

  return {
    outgoingAssetAmount,
    incomingAssets: [...incomingAssets],
    minIncomingAssetAmounts: [...minIncomingAssetAmounts],
  };
}
