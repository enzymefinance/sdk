import { type Address, Hex, type PublicClient, parseAbi } from "viem";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// BALANCER MINTER
//--------------------------------------------------------------------------------------------

const minterAbi = [
  {
    inputs: [{ internalType: "address", name: "gauge", type: "address" }],
    name: "mint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
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

//--------------------------------------------------------------------------------------------
// BALANCER GAUGE
//--------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------
// BALANCER VAULT
//--------------------------------------------------------------------------------------------

export const BatchSwapKind = {
  GIVEN_IN: 0n,
  GIVEN_OUT: 1n,
} as const;

export interface BatchSwapStep {
  poolId: Hex;
  assetInIndex: bigint;
  assetOutIndex: bigint;
  amount: bigint;
  userData: Hex;
}

export interface BatchSwapFunds {
  sender: Address;
  recipient: Address;
  fromInternalBalance: boolean;
  toInternalBalance: boolean;
}

export async function queryBatchSwap(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    balancerVault: Address;
    kind: typeof BatchSwapKind[keyof typeof BatchSwapKind];
    swaps: BatchSwapStep[];
    assets: Address[];
    funds: BatchSwapFunds;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi([
      "function queryBatchSwap(uint8 kind, (bytes32 poolId, uint256 assetInIndex, uint256 assetOutIndex, uint256 amount, bytes userData)[] memory swaps, address[] memory assets, (address sender, bool fromInternalBalance, address payable recipient, bool toInternalBalance) memory funds) external view returns (int256[] memory assetDeltas)",
    ]),
    functionName: "queryBatchSwap",
    address: args.balancerVault,
    args: [args.kind, args.swaps, args.assets, args.funds],
  });
}
