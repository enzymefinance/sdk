import { WETH } from "../../tests/constants.js";
import { ETH_ADDRESS } from "../constants/misc.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, ContractFunctionExecutionError, type PublicClient } from "viem";

// same address for polygon and ethereum
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

export async function getCurveBestPrice(
  client: PublicClient,
  args: ReadContractParameters<{
    incoming: Address;
    outgoing: Address;
    quantity: bigint;
  }>,
) {
  const curveSwaps = await client.readContract({
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
