import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// TRANSFER
//--------------------------------------------------------------------------------------------

export const transfer = IntegrationManager.makeUse(IntegrationManager.Selector.Transfer, transferEncode);

const transferEncoding = [
  {
    name: "actionData",
    type: "bytes",
  },
  {
    name: "assetData",
    type: "bytes",
  },
] as const;

export type TransferArgs = {
  actionData: Hex;
  assetData: Hex;
};

export function transferEncode(args: TransferArgs): Hex {
  return encodeAbiParameters(transferEncoding, [args.actionData, args.assetData]);
}

export function transferDecode(encoded: Hex): TransferArgs {
  const [actionData, assetData] = decodeAbiParameters(transferEncoding, encoded);

  return {
    actionData,
    assetData,
  };
}
