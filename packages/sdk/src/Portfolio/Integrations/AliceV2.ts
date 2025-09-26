import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  PlaceOrder: 0n,
  RefundOrder: 1n,
  Sweep: 2n,
  PlaceOrderWithReferenceId: 3n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// PLACE ORDER
//--------------------------------------------------------------------------------------------

export const placeOrder = ExternalPositionManager.makeUse(Action.PlaceOrder, placeOrderEncode);

const placeOrderEncoding = [
  {
    type: "tuple",
    components: [
      {
        type: "address",
        name: "tokenToSell",
      },
      {
        type: "address",
        name: "tokenToBuy",
      },
      {
        name: "quantityToSell",
        type: "uint256",
      },
      {
        name: "limitAmountToGet",
        type: "uint256",
      },
    ],
  },
] as const;

export type PlaceOrderArgs = {
  tokenToSell: Address;
  tokenToBuy: Address;
  quantityToSell: bigint;
  limitAmountToGet: bigint;
};

export function placeOrderEncode(args: PlaceOrderArgs): Hex {
  return encodeAbiParameters(placeOrderEncoding, [
    {
      tokenToSell: args.tokenToSell,
      tokenToBuy: args.tokenToBuy,
      quantityToSell: args.quantityToSell,
      limitAmountToGet: args.limitAmountToGet,
    },
  ]);
}

export function placeOrderDecode(encoded: Hex): PlaceOrderArgs {
  const [{ tokenToSell, tokenToBuy, quantityToSell, limitAmountToGet }] = decodeAbiParameters(
    placeOrderEncoding,
    encoded,
  );

  return {
    tokenToSell,
    tokenToBuy,
    quantityToSell,
    limitAmountToGet,
  };
}

//--------------------------------------------------------------------------------------------
// PLACE ORDER WITH REFERENCE ID
//--------------------------------------------------------------------------------------------

export const placeOrderWithRefId = ExternalPositionManager.makeUse(Action.PlaceOrderWithReferenceId, placeOrderEncode);

// Note: PlaceOrderWithRefId uses the same args as PlaceOrder
export type PlaceOrderWithRefIdArgs = PlaceOrderArgs;

//--------------------------------------------------------------------------------------------
// REFUND ORDER
//--------------------------------------------------------------------------------------------

export const refundOrder = ExternalPositionManager.makeUse(Action.RefundOrder, refundOrderEncode);

const refundOrderEncoding = [
  {
    type: "tuple",
    components: [
      {
        type: "uint256",
        name: "orderId",
      },
      {
        type: "address",
        name: "tokenToSell",
      },
      {
        type: "address",
        name: "tokenToBuy",
      },
      {
        type: "uint256",
        name: "quantityToSell",
      },
      {
        type: "uint256",
        name: "limitAmountToGet",
      },
      {
        type: "uint256",
        name: "timestamp",
      },
    ],
  },
] as const;

export type RefundOrderArgs = {
  orderId: bigint;
  tokenToSell: Address;
  tokenToBuy: Address;
  quantityToSell: bigint;
  limitAmountToGet: bigint;
  timestamp: bigint;
};

export function refundOrderEncode(args: RefundOrderArgs): Hex {
  return encodeAbiParameters(refundOrderEncoding, [
    {
      orderId: args.orderId,
      tokenToSell: args.tokenToSell,
      tokenToBuy: args.tokenToBuy,
      quantityToSell: args.quantityToSell,
      limitAmountToGet: args.limitAmountToGet,
      timestamp: args.timestamp,
    },
  ]);
}

export function refundOrderDecode(encoded: Hex): RefundOrderArgs {
  const [{ orderId, tokenToSell, tokenToBuy, quantityToSell, limitAmountToGet, timestamp }] = decodeAbiParameters(
    refundOrderEncoding,
    encoded,
  );

  return {
    orderId,
    tokenToSell,
    tokenToBuy,
    quantityToSell,
    limitAmountToGet,
    timestamp,
  };
}

//--------------------------------------------------------------------------------------------
// SWEEP
//--------------------------------------------------------------------------------------------

export const sweep = ExternalPositionManager.makeUse(Action.Sweep, sweepEncode);

const sweepEncoding = [
  {
    type: "tuple",
    components: [
      {
        type: "uint256[]",
        name: "orderIds",
      },
    ],
  },
] as const;

export type SweepArgs = {
  orderIds: ReadonlyArray<bigint>;
};

export function sweepEncode(args: SweepArgs): Hex {
  return encodeAbiParameters(sweepEncoding, [{ orderIds: args.orderIds }]);
}

export function sweepDecode(encoded: Hex): SweepArgs {
  const [{ orderIds }] = decodeAbiParameters(sweepEncoding, encoded);

  return {
    orderIds,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getOrderHash(
  client: Client,
  args: Viem.ContractCallParameters<{
    aliceOrderManagerAddress: Address;
    orderId: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getOrderHash(uint256 _orderId) view returns (bytes32 orderHash_)"]),
    functionName: "getOrderHash",
    address: args.aliceOrderManagerAddress,
    args: [args.orderId],
  });
}

export async function isAddressWhitelisted(
  client: Client,
  args: Viem.ContractCallParameters<{
    aliceOrderManagerAddress: Address;
    addressToCheck: Address;
  }>,
) {
  const whitelistContractAddress = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function whitelistContract() view returns (address)"]),
    functionName: "whitelistContract",
    address: args.aliceOrderManagerAddress,
  });

  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function verifyWhitelistedUser(address addressToCheck) view returns (bool)"]),
    functionName: "verifyWhitelistedUser",
    address: whitelistContractAddress,
    args: [args.addressToCheck],
  });
}
