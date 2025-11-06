import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Assertion } from "../../Utils.js";
import { assertEnumType } from "../../Utils/assertion.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

export type AdapterAction = (typeof AdapterAction)[keyof typeof AdapterAction];
export const AdapterAction = {
  SwapSingle: 0n,
} as const;

export type AdapterActionArgs = {
  actionId: AdapterAction;
  encodedActionArgs: Hex;
};

const adapterActionEncoding = [
  {
    name: "actionId",
    type: "uint256",
  },
  {
    name: "encodedActionArgs",
    type: "bytes",
  },
] as const;

export function encodeAdapterAction(args: AdapterActionArgs): Hex {
  return encodeAbiParameters(adapterActionEncoding, [args.actionId, args.encodedActionArgs]);
}

export function decodeAdapterAction(encoded: Hex): AdapterActionArgs {
  const [actionId, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);

  assertEnumType(AdapterAction, actionId);

  return {
    actionId,
    encodedActionArgs,
  };
}

type Single = {
  expiry: bigint;
  taker_address: Address;
  maker_address: Address;
  maker_nonce: bigint;
  taker_token: Address;
  maker_token: Address;
  taker_amount: bigint;
  maker_amount: bigint;
  receiver: Address;
  packed_commands: bigint;
  flags: bigint;
};

type MakerSignature = {
  signatureBytes: Hex;
  flags: bigint;
};

export type SwapSingleActionArgs = {
  order: Single;
  makerSignature: MakerSignature;
  minIncomingAssetAmount: bigint;
};

const swapSingleActionArgsEncoding = [
  {
    type: "tuple",
    name: "swapSingleActionArgs",
    internalType: "struct IBebopBlendAdapter.SwapSingleActionArgs",
    components: [
      {
        type: "tuple",
        name: "order",
        internalType: "struct IBebopBlend.Single",
        components: [
          { type: "uint256", name: "expiry" },
          { type: "address", name: "taker_address" },
          { type: "address", name: "maker_address" },
          { type: "uint256", name: "maker_nonce" },
          { type: "address", name: "taker_token" },
          { type: "address", name: "maker_token" },
          { type: "uint256", name: "taker_amount" },
          { type: "uint256", name: "maker_amount" },
          { type: "address", name: "receiver" },
          { type: "uint256", name: "packed_commands" },
          { type: "uint256", name: "flags" },
        ],
      },
      {
        type: "tuple",
        name: "makerSignature",
        internalType: "struct IBebopBlend.MakerSignature",
        components: [
          { type: "bytes", name: "signatureBytes" },
          { type: "uint256", name: "flags" },
        ],
      },
      { type: "uint256", name: "minIncomingAssetAmount" },
    ],
  },
] as const;

export function swapSingleEncode(args: SwapSingleActionArgs): Hex {
  const encodedActionArgs = encodeAbiParameters(swapSingleActionArgsEncoding, [
    {
      order: args.order,
      makerSignature: args.makerSignature,
      minIncomingAssetAmount: args.minIncomingAssetAmount,
    },
  ]);
  return encodeAbiParameters(adapterActionEncoding, [AdapterAction.SwapSingle, encodedActionArgs]);
}

export function swapSingleDecode(encoded: Hex): SwapSingleActionArgs {
  const [action, encodedActionArgs] = decodeAbiParameters(adapterActionEncoding, encoded);

  Assertion.invariant(action === AdapterAction.SwapSingle, "Action Type should be SwapSingle");

  const { order, makerSignature, minIncomingAssetAmount } = decodeAbiParameters(
    swapSingleActionArgsEncoding,
    encodedActionArgs,
  )[0];

  return {
    order,
    makerSignature,
    minIncomingAssetAmount,
  };
}

export const swapSingle = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  swapSingleEncode,
);

