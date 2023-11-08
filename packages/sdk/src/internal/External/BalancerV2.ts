import { type Address, type PublicClient } from "viem";
import { Viem } from "../../Utils.js";

const minterAbi = [
  {
    inputs: [{ internalType: "address", name: "gauge", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const gaugeAbi = [
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "rewardToken", type: "address" },
    ],
    name: "claimable_reward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getMinterRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    minter: Address;
    beneficiary: Address;
    gauge: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: minterAbi,
    functionName: "mint",
    address: args.minter,
    args: [args.gauge],
    account: args.beneficiary,
  });

  return result;
}

export async function getClaimableRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    gauge: Address;
    user: Address;
    rewardToken: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: gaugeAbi,
    functionName: "claimable_reward",
    address: args.gauge,
    args: [args.user, args.rewardToken],
  });
}
