import { WETH } from "../../tests/constants.js";
import { ETH_ADDRESS } from "../constants/misc.js";
import { invariant } from "../utils/assertions.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, parseAbi, zeroAddress } from "viem";

const abi = {
  name: "get_address",
  outputs: [{ type: "address", name: "" }],
  inputs: [{ type: "uint256", name: "_id" }],
  stateMutability: "view",
  type: "function",
  gas: 1308,
} as const;

type Asset = {
  address: Address;
  decimals: number;
  symbol: string;
};

const curveRegistry = "0x0000000022d53366457f9d5e68ec105046fc4383" as const;
const swapId = 2n; // id won't change, for swaps it will be always the same id in the registry

export async function getCurveBestPrice(
  client: PublicClient,
  args: ReadContractParameters<{
    incoming: Asset;
    outgoing: Asset;
    quantity: bigint;
  }>,
) {
  invariant(args.incoming.address !== args.outgoing.address, "Incoming and outgoing asset are identical");

  const address = await client.readContract({
    ...readContractParameters(args),
    abi: [abi],
    functionName: "get_address",
    address: curveRegistry,
    args: [swapId],
  });

  const curveOutgoing = args.outgoing.address === WETH ? ETH_ADDRESS : args.outgoing.address;
  const curveIncoming = args.incoming.address === WETH ? ETH_ADDRESS : args.incoming.address;

  const curveSwaps = parseAbi([
    "function get_best_rate(address _from, address to, uint256 amount) view returns (address bestPool, uint256 amountReceived)",
  ] as const);

  const [bestPool, amountReceived] = (await client.readContract({
    abi: curveSwaps,
    address,
    functionName: "get_best_rate",
    args: [curveOutgoing, curveIncoming, args.quantity],
  })) as unknown as [Address, bigint];

  invariant(bestPool !== zeroAddress, "Pool returned zero address");
  invariant(amountReceived !== 0n, "Amount received is zero");

  const amount = amountReceived;
  const price = amount / args.quantity;

  invariant(price > 0n, "Price is zero");

  const ERC20 = parseAbi(["function name() view returns (string)"] as const);

  const [name] = (await client.readContract({
    abi: ERC20,
    address: bestPool,
    functionName: "name",
  })) as unknown as [string];

  const bestPoolName = name ?? `Curve Pool ${args.incoming.symbol}-${args.outgoing.symbol}`;

  return {
    amount,
    bestRoute: bestPoolName,
    pool: bestPool,
    price,
  };
}
