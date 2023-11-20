import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

const takeOrderSelector = "0x03e38a2b"; // takeOrder(address,bytes,bytes)
export const takeOrder = IntegrationManager.makeUse(takeOrderSelector, takeOrderEncode);

const takeOrderEncoding = [
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

export type TakeOrderArgs = {
  path: ReadonlyArray<Address>;
  outgoingAssetAmount: bigint;
  minIncomingAssetAmount: bigint;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [args.path, args.outgoingAssetAmount, args.minIncomingAssetAmount]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [path, outgoingAssetAmount, minIncomingAssetAmount] = decodeAbiParameters(takeOrderEncoding, encoded);

  return {
    path,
    outgoingAssetAmount,
    minIncomingAssetAmount,
  };
}
