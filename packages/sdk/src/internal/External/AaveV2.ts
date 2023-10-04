import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient } from "viem";

const aaveIncentivesControllerAbi = [
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getRewardsBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserUnclaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getRewardsBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    aaveIncentivesController: Address;
    assets: Address[];
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: aaveIncentivesControllerAbi,
    functionName: "getRewardsBalance",
    address: args.aaveIncentivesController,
    args: [args.assets, args.user],
  });
}

export async function getUserUnclaimedRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    aaveIncentivesController: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: aaveIncentivesControllerAbi,
    functionName: "getUserUnclaimedRewards",
    address: args.aaveIncentivesController,
    args: [args.user],
  });
}
