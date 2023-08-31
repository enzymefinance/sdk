import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const curveExchangeTakeOrderEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingAsset",
    type: "address",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAsset",
    type: "address",
  },
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
] as const;

export type CurveExchangeTakeOrderArgs = {
  pool: Address;
  outgoingAsset: Address;
  outgoingAssetAmount: bigint;
  minIncomingAsset: Address;
  minIncomingAssetAmount: bigint;
};

export function encodeCurveExchangeTakeOrderArgs({
  pool,
  outgoingAsset,
  outgoingAssetAmount,
  minIncomingAsset,
  minIncomingAssetAmount,
}: CurveExchangeTakeOrderArgs): Hex {
  return encodeAbiParameters(curveExchangeTakeOrderEncoding, [
    pool,
    outgoingAsset,
    outgoingAssetAmount,
    minIncomingAsset,
    minIncomingAssetAmount,
  ]);
}

export function decodeCurveExchangeTakeOrderArgs(callArgs: Hex): CurveExchangeTakeOrderArgs {
  const [pool, outgoingAsset, outgoingAssetAmount, minIncomingAsset, minIncomingAssetAmount] = decodeAbiParameters(
    curveExchangeTakeOrderEncoding,
    callArgs,
  );

  return {
    pool,
    outgoingAsset,
    outgoingAssetAmount,
    minIncomingAsset,
    minIncomingAssetAmount,
  };
}
