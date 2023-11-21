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

const helperAbi = [
  {
    inputs: [{ internalType: "contract IArrakisV2", name: "vault_", type: "address" }],
    name: "totalUnderlying",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function totalUnderlying(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    helper: Address;
    arrakisVault: Address;
  }>,
) {
  const [amount0, amount1] = await Viem.readContract(client, args, {
    abi: helperAbi,
    functionName: "totalUnderlying",
    address: args.helper,
    args: [args.arrakisVault],
  });

  return {
    amount0,
    amount1,
  };
}

const vaultAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "burnAmount_", type: "uint256" },
      { internalType: "address", name: "receiver_", type: "address" },
    ],
    name: "burn",
    outputs: [
      { internalType: "uint256", name: "amount0", type: "uint256" },
      { internalType: "uint256", name: "amount1", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export async function burn(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    arrakisVault: Address;
    receiver: Address;
    burnAmount: bigint;
  }>,
) {
  const {
    result: [amount0, amount1],
  } = await Viem.simulateContract(client, args, {
    abi: vaultAbi,
    functionName: "burn",
    address: args.arrakisVault,
    args: [args.burnAmount, args.receiver],
  });

  return {
    amount0,
    amount1,
  };
}
