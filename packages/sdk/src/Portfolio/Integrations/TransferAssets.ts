import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// TRANSFER
//--------------------------------------------------------------------------------------------

export const transfer = IntegrationManager.makeUse(IntegrationManager.Selector.Transfer, transferEncode);

const transferEncoding = [
  {
    components: [
      {
        name: "recipient",
        type: "address",
      },
      {
        name: "assetAddresses",
        type: "address[]",
      },
      {
        name: "assetAmounts",
        type: "uint256[]",
      },
    ],
    type: "tuple",
  },
] as const;

export type TransferArgs = {
  recipient: Address;
  assetAddresses: ReadonlyArray<Address>;
  assetAmounts: ReadonlyArray<bigint>;
};

export function transferEncode(args: TransferArgs): Hex {
  return encodeAbiParameters(transferEncoding, [args]);
}

export function transferDecode(encoded: Hex): TransferArgs {
  const [{ recipient, assetAddresses, assetAmounts }] = decodeAbiParameters(transferEncoding, encoded);

  return { recipient, assetAddresses, assetAmounts };
}
