import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  PlaceOrder: 0n,
  RefundOrder: 1n,
  Sweep: 2n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// PLACE ORDER
//--------------------------------------------------------------------------------------------

export const placeOrder = ExternalPositionManager.makeUse(Action.PlaceOrder, placeOrderEncode);
export const createAndPlaceOrder = ExternalPositionManager.makeCreateAndUse(Action.PlaceOrder, placeOrderEncode);

const placeOrderEncoding = [
  {
    type: "uint16",
    name: "instrumentId",
  },
  {
    name: "isBuyOrder",
    type: "bool",
  },
  {
    name: "quantityToSell",
    type: "uint256",
  },
  {
    name: "limitAmountToGet",
    type: "uint256",
  },
] as const;

export type PlaceOrderArgs = {
  instrumentId: number;
  isBuyOrder: boolean;
  quantityToSell: bigint;
  limitAmountToGet: bigint;
};

export function placeOrderEncode(args: PlaceOrderArgs): Hex {
  return encodeAbiParameters(placeOrderEncoding, [
    args.instrumentId,
    args.isBuyOrder,
    args.limitAmountToGet,
    args.quantityToSell,
  ]);
}

export function placeOrderDecode(encoded: Hex): PlaceOrderArgs {
  const [instrumentId, isBuyOrder, limitAmountToGet, quantityToSell] = decodeAbiParameters(placeOrderEncoding, encoded);

  return {
    instrumentId,
    isBuyOrder,
    limitAmountToGet,
    quantityToSell,
  };
}

//--------------------------------------------------------------------------------------------
// REFUND ORDER
//--------------------------------------------------------------------------------------------

export const refundOrder = ExternalPositionManager.makeUse(Action.RefundOrder, refundOrderEncode);

const refundOrderEncoding = [
  {
    type: "uint256",
    name: "orderId",
  },
  {
    type: "uint16",
    name: "instrumentId",
  },
  {
    type: "bool",
    name: "isBuyOrder",
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
] as const;

export type RefundOrderArgs = {
  orderId: bigint;
  instrumentId: number;
  isBuyOrder: boolean;
  quantityToSell: bigint;
  limitAmountToGet: bigint;
  timestamp: bigint;
};

export function refundOrderEncode(args: RefundOrderArgs): Hex {
  return encodeAbiParameters(refundOrderEncoding, [
    args.orderId,
    args.instrumentId,
    args.isBuyOrder,
    args.quantityToSell,
    args.limitAmountToGet,
    args.timestamp,
  ]);
}

export function refundOrderDecode(encoded: Hex): RefundOrderArgs {
  const [orderId, instrumentId, isBuyOrder, quantityToSell, limitAmountToGet, timestamp] = decodeAbiParameters(
    refundOrderEncoding,
    encoded,
  );

  return {
    orderId,
    instrumentId,
    isBuyOrder,
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
    type: "uint256[]",
    name: "orderIds",
  },
] as const;

export type SweepArgs = {
  orderIds: Array<bigint>;
};

export function sweepEncode(args: SweepArgs): Hex {
  return encodeAbiParameters(sweepEncoding, [args.orderIds]);
}

export function sweepDecode(encoded: Hex): SweepArgs {
  const [orderIds] = decodeAbiParameters(sweepEncoding, encoded);

  return {
    orderIds: [...orderIds],
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function getInstrument(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    aliceOrderManagerAddress: Address;
    instrumentId: number;
    mustBeActive: boolean;
  }>,
) {
  const [id, enabled, baseAssetAddress, quoteAssetAddress] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function getInstrument(uint16 _instrumentId, bool _mustBeActive) view returns (uint16 id_, bool enabled_, address base_, address quote_)",
    ]),
    functionName: "getInstrument",
    address: args.aliceOrderManagerAddress,
    args: [args.instrumentId, args.mustBeActive],
  });

  return { id, enabled, baseAssetAddress, quoteAssetAddress };
}

export function getOrderHash(
  client: PublicClient,
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
  client: PublicClient,
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
