import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const uniswapV2ExchangeTakeOrderEncoding = [
  {
    name: "path",
    type: "address[]",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
] as const;

export type UniswapV2ExchangeTakeOrderArgs = {
  path: Address[];
  outgoingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
};

export function encodeUniswapV2ExchangeTakeOrderArgs({
  path,
  outgoingAssetAmount,
  minIncomingAssetAmount,
}: UniswapV2ExchangeTakeOrderArgs): Hex {
  return encodeAbiParameters(uniswapV2ExchangeTakeOrderEncoding, [path, outgoingAssetAmount, minIncomingAssetAmount]);
}

export function decodeUniswapV2ExchangeTakeOrderArgs(callArgs: Hex): UniswapV2ExchangeTakeOrderArgs {
  const [path, outgoingAssetAmount, minIncomingAssetAmount] = decodeAbiParameters(
    uniswapV2ExchangeTakeOrderEncoding,
    callArgs,
  );

  return {
    path: [...path],
    outgoingAssetAmount,
    minIncomingAssetAmount,
  };
}
