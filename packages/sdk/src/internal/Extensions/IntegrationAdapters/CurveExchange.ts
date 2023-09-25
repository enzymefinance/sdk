import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

const takeOrderSelector = "0x03e38a2b"; // takeOrder(address,bytes,bytes)
export const takeOrder = IntegrationManager.makeUse(takeOrderSelector, takeOrderEncode);

const takeOrderEncoding = [
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
    name: "incomingAsset",
    type: "address",
  },
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
] as const;

export type TakeOrderArgs = {
  pool: Address;
  outgoingAsset: Address;
  outgoingAssetAmount: bigint;
  minIncomingAsset: Address;
  minIncomingAssetAmount: bigint;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [
    args.pool,
    args.outgoingAsset,
    args.outgoingAssetAmount,
    args.minIncomingAsset,
    args.minIncomingAssetAmount,
  ]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [pool, outgoingAsset, outgoingAssetAmount, minIncomingAsset, minIncomingAssetAmount] = decodeAbiParameters(
    takeOrderEncoding,
    encoded,
  );

  return {
    pool,
    outgoingAsset,
    outgoingAssetAmount,
    minIncomingAsset,
    minIncomingAssetAmount,
  };
}
