import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { readContract, simulateContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

const lendEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  cToken: Address;
  depositAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.cToken, args.depositAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [cToken, depositAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    cToken,
    depositAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  cToken: Address;
  redeemAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.cToken, args.redeemAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [cToken, redeemAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { cToken, redeemAmount };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

export const claimRewards = IntegrationManager.makeUse(IntegrationManager.Selector.ClaimRewards, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    type: "address[]",
    name: "cTokens",
  },
] as const;

export type ClaimRewardsArgs = {
  cTokens: ReadonlyArray<Address>;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.cTokens]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [cTokens] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return { cTokens };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

// ABI from https://etherscan.io/address/0x7a1316220a46dce22fd5c6d55a39513367e6c967#code
const cometAbi = [
  {
    inputs: [],
    name: "getUtilization",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "utilization", type: "uint256" }],
    name: "getSupplyRate",
    outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "baseTrackingSupplySpeed",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

// ABI from https://etherscan.io/address/0x1b0e765f6224c21223aea2af16c1c46e38885a40#code
const cometRewardsAbi = [
  {
    inputs: [
      { internalType: "address", name: "comet", type: "address" },
      { internalType: "address", name: "account", type: "address" },
    ],
    name: "getRewardOwed",
    outputs: [
      {
        components: [
          { internalType: "address", name: "token", type: "address" },
          { internalType: "uint256", name: "owed", type: "uint256" },
        ],
        internalType: "struct CometRewards.RewardOwed",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export function getUtilization(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cometAbi,
    functionName: "getUtilization",
    address: args.asset,
  });
}

export function getSupplyRate(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
    utilization: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cometAbi,
    functionName: "getSupplyRate",
    address: args.asset,
    args: [args.utilization],
  });
}

export function getTotalSupply(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cometAbi,
    functionName: "totalSupply",
    address: args.asset,
  });
}

export function getBaseTrackingSupplySpeed(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cometAbi,
    functionName: "baseTrackingSupplySpeed",
    address: args.asset,
  });
}

export async function getRewardOwed(
  client: Client,
  args: Viem.ContractCallParameters<{
    cometRewards: Address;
    asset: Address;
    user: Address;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: cometRewardsAbi,
    functionName: "getRewardOwed",
    address: args.cometRewards,
    args: [args.asset, args.user],
  });

  return result;
}
