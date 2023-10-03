import { Constants, Viem } from "@enzymefinance/sdk/Utils";
import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import {
  type Address,
  ContractFunctionExecutionError,
  type Hex,
  type PublicClient,
  decodeAbiParameters,
  encodeAbiParameters,
  isAddressEqual,
} from "viem";

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
  incomingAsset: Address;
  minIncomingAssetAmount: bigint;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [
    args.pool,
    args.outgoingAsset,
    args.outgoingAssetAmount,
    args.incomingAsset,
    args.minIncomingAssetAmount,
  ]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [pool, outgoingAsset, outgoingAssetAmount, incomingAsset, minIncomingAssetAmount] = decodeAbiParameters(
    takeOrderEncoding,
    encoded,
  );

  return {
    pool,
    outgoingAsset,
    outgoingAssetAmount,
    incomingAsset,
    minIncomingAssetAmount,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL CONTRACT METHODS
//--------------------------------------------------------------------------------------------

const CURVE_REGISTRY = "0x0000000022d53366457f9d5e68ec105046fc4383" as const;

const curveRegistryAbi = {
  name: "get_address",
  outputs: [{ type: "address", name: "" }],
  inputs: [{ type: "uint256", name: "_id" }],
  stateMutability: "view",
  type: "function",
} as const;

const curveSwapsAbi = {
  name: "get_best_rate",
  outputs: [
    { type: "address", name: "bestPool" },
    { type: "uint256", name: "amountReceived" },
  ],
  inputs: [
    { type: "address", name: "_from" },
    { type: "address", name: "_to" },
    { type: "uint256", name: "_amount" },
  ],
  stateMutability: "view",
  type: "function",
} as const;

const erc20Abi = {
  name: "name",
  outputs: [{ type: "string", name: "" }],
  inputs: [],
  stateMutability: "view",
  type: "function",
} as const;

const swapId = 2n; // id won't change, for swaps it will be always the same id in the registry

export async function getBestPrice(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    incoming: Address;
    outgoing: Address;
    quantity: bigint;
    weth: Address;
  }>,
) {
  const curveSwaps = await Viem.readContract(client, args, {
    abi: [curveRegistryAbi],
    functionName: "get_address",
    address: CURVE_REGISTRY,
    args: [swapId],
  });

  const curveOutgoing = isAddressEqual(args.outgoing, args.weth) ? Constants.EthAddress : args.outgoing;
  const curveIncoming = isAddressEqual(args.incoming, args.weth) ? Constants.EthAddress : args.incoming;

  const [bestPool, amountReceived] = await client.readContract({
    abi: [curveSwapsAbi],
    address: curveSwaps,
    functionName: "get_best_rate",
    args: [curveOutgoing, curveIncoming, args.quantity],
  });

  const amount = amountReceived;
  const price = amount / args.quantity;

  let poolName;
  try {
    // not all pools support this method, this is why we need to catch the error
    poolName = await client.readContract({
      abi: [erc20Abi],
      address: bestPool,
      functionName: "name",
    });
  } catch (error) {
    if (!(error instanceof ContractFunctionExecutionError)) {
      throw error;
    }
  }

  return {
    amount,
    poolName,
    pool: bestPool,
    price,
  };
}
