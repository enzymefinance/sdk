import { Assertion, Types, Viem } from "@enzymefinance/sdk/Utils";
import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515" as const; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

const lendEncoding = [
  {
    name: "poolId",
    type: "bytes32",
  },
  {
    name: "bptAmount",
    type: "uint256",
  },
  {
    name: "usedTokens",
    type: "address[]",
  },
  {
    name: "usedTokenAmounts",
    type: "uint256[]",
  },
  {
    components: [
      {
        name: "assets",
        type: "address[]",
      },
      {
        name: "limits",
        type: "uint256[]",
      },
      {
        name: "userData",
        type: "bytes",
      },
      {
        name: "useInternalBalance",
        type: "bool",
      },
    ],
    name: "request",
    type: "tuple",
  },
] as const;

export type LendArgs = {
  poolId: Hex;
  bptAmount: bigint;
  usedTokens: ReadonlyArray<Address>;
  usedTokenAmounts: ReadonlyArray<bigint>;
  request: {
    assets: ReadonlyArray<Address>;
    limits: ReadonlyArray<bigint>;
    userData: Hex;
    useInternalBalance: boolean;
  };
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [
    args.poolId,
    args.bptAmount,
    args.usedTokens,
    args.usedTokenAmounts,
    args.request,
  ]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [poolId, bptAmount, usedTokens, usedTokenAmounts, request] = decodeAbiParameters(lendEncoding, encoded);

  return {
    poolId,
    bptAmount,
    usedTokens,
    usedTokenAmounts,
    request,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export type RedeemArgs = LendArgs;
export const redeemEncode: (args: RedeemArgs) => Hex = lendEncode;
export const redeemDecode: (args: Hex) => RedeemArgs = lendDecode;

const redeemSelector = "0xc29fa9dd" as const; // redeem(address,bytes,bytes)
export const redeem = IntegrationManager.makeUse(redeemSelector, redeemEncode);

//--------------------------------------------------------------------------------------------
// LEND AND STAKE
//--------------------------------------------------------------------------------------------

const lendAndStakeSelector = "0x29fa046e" as const; // lendAndStake(address,bytes,bytes)
export const lendAndStake = IntegrationManager.makeUse(lendAndStakeSelector, lendAndStakeEncode);

const lendAndStakeEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
  ...lendEncoding,
] as const;

export type LendAndStakeArgs = Types.Prettify<LendArgs & { stakingToken: Address }>;

export function lendAndStakeEncode(args: LendAndStakeArgs): Hex {
  return encodeAbiParameters(lendAndStakeEncoding, [
    args.stakingToken,
    args.poolId,
    args.bptAmount,
    args.usedTokens,
    args.usedTokenAmounts,
    args.request,
  ]);
}

export function lendAndStakeDecode(encoded: Hex): LendAndStakeArgs {
  const [stakingToken, poolId, bptAmount, usedTokens, usedTokenAmounts, request] = decodeAbiParameters(
    lendAndStakeEncoding,
    encoded,
  );

  return {
    stakingToken,
    poolId,
    bptAmount,
    usedTokens,
    usedTokenAmounts,
    request,
  };
}

//--------------------------------------------------------------------------------------------
// UNSTAKE AND REDEEM
//--------------------------------------------------------------------------------------------

export type UnstakeAndRedeemArgs = LendAndStakeArgs;
export const unstakeAndRedeemEncode: (args: UnstakeAndRedeemArgs) => Hex = lendAndStakeEncode;
export const unstakeAndRedeemDecode: (args: Hex) => UnstakeAndRedeemArgs = lendAndStakeDecode;

const unstakeAndRedeemSelector = "0x8334eb99" as const; // unstakeAndRedeem(address,bytes,bytes)
export const unstakeAndRedeem = IntegrationManager.makeUse(unstakeAndRedeemSelector, unstakeAndRedeemEncode);

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

const claimRewardsSelector = "0xb9dfbacc" as const; // claimRewards(address,bytes,bytes)
export const claimRewards = IntegrationManager.makeUse(claimRewardsSelector, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
] as const;

export type ClaimRewardsArgs = {
  stakingToken: Address;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.stakingToken]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [stakingToken] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return { stakingToken };
}

//--------------------------------------------------------------------------------------------
// STAKE
//--------------------------------------------------------------------------------------------

const stakeSelector = "0xfa7dd04d" as const; // stake(address,bytes,bytes)
export const stake = IntegrationManager.makeUse(stakeSelector, stakeEncode);

const stakeEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
  {
    name: "bptAmount",
    type: "uint256",
  },
] as const;

export type StakeArgs = {
  stakingToken: Address;
  bptAmount: bigint;
};

export function stakeEncode(args: StakeArgs): Hex {
  return encodeAbiParameters(stakeEncoding, [args.stakingToken, args.bptAmount]);
}

export function stakeDecode(encoded: Hex): StakeArgs {
  const [stakingToken, bptAmount] = decodeAbiParameters(stakeEncoding, encoded);

  return { stakingToken, bptAmount };
}

//--------------------------------------------------------------------------------------------
// UNSTAKE
//--------------------------------------------------------------------------------------------

export type UnstakeArgs = StakeArgs;
export const unstakeEncode: (args: UnstakeArgs) => Hex = stakeEncode;
export const unstakeDecode: (args: Hex) => UnstakeArgs = stakeDecode;

const unstakeSelector = "0x68e30677" as const; // unstake(address,bytes,bytes)
export const unstake = IntegrationManager.makeUse(unstakeSelector, unstakeEncode);

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

const takeOrderSelector = "0x03e38a2b" as const; // takeOrder(address,bytes,bytes)
export const takeOrder = IntegrationManager.makeUse(takeOrderSelector, takeOrderEncode);

const takeOrderEncoding = [
  {
    name: "kind",
    type: "uint8",
  },
  {
    components: [
      {
        name: "poolId",
        type: "bytes32",
      },
      {
        name: "assetInIndex",
        type: "uint256",
      },
      {
        name: "assetOutIndex",
        type: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
      },
      {
        name: "userData",
        type: "bytes",
      },
    ],
    name: "swaps",
    type: "tuple[]",
  },
  {
    name: "assets",
    type: "address[]",
  },
  {
    name: "limits",
    type: "int256[]",
  },
  {
    name: "stakingTokens",
    type: "address[]",
  },
] as const;

export type SwapKind = typeof SwapKind[keyof typeof SwapKind];
export const SwapKind = {
  GivenIn: 0,
  GivenOut: 1,
} as const;

export type TakeOrderArgs = {
  kind: SwapKind;
  swaps: ReadonlyArray<{
    poolId: Hex;
    assetInIndex: bigint;
    assetOutIndex: bigint;
    amount: bigint;
    userData: Hex;
  }>;
  assets: ReadonlyArray<Address>;
  limits: ReadonlyArray<bigint>;
  stakingTokens: ReadonlyArray<Address>;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [args.kind, args.swaps, args.assets, args.limits, args.stakingTokens]);
}

export function isValidSwapKind(kind: number): kind is SwapKind {
  return Object.values(SwapKind).includes(kind as SwapKind);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [kind, swaps, assets, limits, stakingTokens] = decodeAbiParameters(takeOrderEncoding, encoded);

  if (!isValidSwapKind(kind)) {
    Assertion.invariant(false, "Invalid swap kind");
  }

  return { kind, swaps, assets, limits, stakingTokens };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL CONTRACT METHODS
//--------------------------------------------------------------------------------------------

const mintAbi = {
  inputs: [{ internalType: "address", name: "gauge", type: "address" }],
  name: "mint",
  outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
  stateMutability: "nonpayable",
  type: "function",
} as const;

export async function getMinterRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    beneficiary: Address;
    gauge: Address;
    minter: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: [mintAbi],
    functionName: "mint",
    address: args.minter,
    args: [args.gauge],
    account: args.beneficiary,
  });

  return result;
}
