import { type Address, type PublicClient } from "viem";
import { Viem } from "../../Utils.js";

const resolverAbi = [
  {
    inputs: [
      { internalType: "contract IArrakisV2", name: "vaultV2_", type: "address" },
      { internalType: "uint256", name: "amount0Max_", type: "uint256" },
      { internalType: "uint256", name: "amount1Max_", type: "uint256" },
    ],
    name: "getMintAmounts",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
      { internalType: "uint256", name: "mintAmount", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getMintAmounts(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    resolver: Address;
    arrakisVault: Address;
    amount0Max: bigint;
    amount1Max: bigint;
  }>,
) {
  const [amount0, amount1, mintAmount] = await Viem.readContract(client, args, {
    abi: resolverAbi,
    functionName: "getMintAmounts",
    address: args.resolver,
    args: [args.arrakisVault, args.amount0Max, args.amount1Max],
  });

  return {
    amount0,
    amount1,
    mintAmount,
  };
}
