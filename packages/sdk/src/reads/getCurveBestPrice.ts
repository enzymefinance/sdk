import { WETH } from "../../tests/constants.js";
import { ETH_ADDRESS } from "../constants/misc.js";
import { CURVE_REGISTRY } from "../constants/selectors.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

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

export async function getCurveBestPrice(
  client: PublicClient,
  args: ReadContractParameters<{
    incoming: Address;
    outgoing: Address;
    quantity: bigint;
  }>,
) {
  const address = await client.readContract({
    ...readContractParameters(args),
    abi: [curveRegistryAbi],
    functionName: "get_address",
    address: CURVE_REGISTRY,
    args: [swapId],
  });

  const curveOutgoing = args.outgoing === WETH ? ETH_ADDRESS : args.outgoing;
  const curveIncoming = args.incoming === WETH ? ETH_ADDRESS : args.incoming;

  const [bestPool, amountReceived] = await client.readContract({
    abi: [curveSwapsAbi],
    address: address,
    functionName: "get_best_rate",
    args: [curveOutgoing, curveIncoming, args.quantity],
  });

  const amount = amountReceived;
  const price = amount / args.quantity;

  const name = await client.readContract({
    abi: [erc20Abi],
    address: bestPool,
    functionName: "name",
  });

  return {
    amount,
    bestRoute: name,
    pool: bestPool,
    price,
  };
}
