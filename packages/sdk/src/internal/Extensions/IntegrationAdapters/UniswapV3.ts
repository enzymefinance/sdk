import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

const takeOrderSelector = "0x03e38a2b"; // takeOrder(address,bytes,bytes)
export const takeOrder = IntegrationManager.makeUse(takeOrderSelector, takeOrderEncode);

const takeOrderEncoding = [
  {
    name: "pathAddresses",
    type: "address[]",
  },
  {
    name: "pathFees",
    type: "uint24[]",
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

export type TakeOrderArgs = {
  pathAddresses: ReadonlyArray<Address>;
  pathFees: ReadonlyArray<number>;
  outgoingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [
    args.pathAddresses,
    args.pathFees,
    args.outgoingAssetAmount,
    args.minIncomingAssetAmount,
  ]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [pathAddresses, pathFees, outgoingAssetAmount, minIncomingAssetAmount] = decodeAbiParameters(
    takeOrderEncoding,
    encoded,
  );

  return {
    pathAddresses,
    pathFees,
    outgoingAssetAmount,
    minIncomingAssetAmount,
  };
}
