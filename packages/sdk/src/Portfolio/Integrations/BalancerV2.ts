import {
  type Address,
  type Hex,
  PublicClient,
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbi,
  parseAbiParameters,
} from "viem";
import { Assertion, Types, Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

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

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

//--------------------------------------------------------------------------------------------
// LEND AND STAKE
//--------------------------------------------------------------------------------------------

export const lendAndStake = IntegrationManager.makeUse(IntegrationManager.Selector.LendAndStake, lendAndStakeEncode);

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

export const unstakeAndRedeem = IntegrationManager.makeUse(
  IntegrationManager.Selector.UnstakeAndRedeem,
  unstakeAndRedeemEncode,
);

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

export const claimRewards = IntegrationManager.makeUse(IntegrationManager.Selector.ClaimRewards, claimRewardsEncode);

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

export const stake = IntegrationManager.makeUse(IntegrationManager.Selector.Stake, stakeEncode);

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

export const unstake = IntegrationManager.makeUse(IntegrationManager.Selector.Unstake, unstakeEncode);

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

export const takeOrder = IntegrationManager.makeUse(IntegrationManager.Selector.TakeOrder, takeOrderEncode);

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
// EXTERNAL READ FUNCTIONS - BALANCER GAUGE
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
// EXTERNAL READ FUNCTIONS - BALANCER VAULT
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

//--------------------------------------------------------------------------------------------
// WEIGHTED POOLS
//--------------------------------------------------------------------------------------------

export enum WeightedPoolJoinKind {
  INIT = 0,
  EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
  TOKEN_IN_FOR_EXACT_BPT_OUT = 2,
  ALL_TOKENS_IN_FOR_EXACT_BPT_OUT = 3,
  ADD_TOKEN = 4,
}

export enum WeightedPoolExitKind {
  EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
  EXACT_BPT_IN_FOR_TOKENS_OUT = 1,
  BPT_IN_FOR_EXACT_TOKENS_OUT = 2,
  REMOVE_TOKEN = 3,
}

// exits

export function weightedPoolsUserDataBptInForExactTokensOut({
  amountsOut,
  maxBPTAmountIn,
}: {
  amountsOut: bigint[];
  maxBPTAmountIn: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters("uint8, uint256[], uint256"), [
    WeightedPoolExitKind.BPT_IN_FOR_EXACT_TOKENS_OUT,
    amountsOut,
    maxBPTAmountIn,
  ]);
}

export function weightedPoolsUserDataExactBptInForOneTokenOut({
  bptAmountIn,
  tokenIndex,
}: {
  bptAmountIn: bigint;
  tokenIndex: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256, uint256"]), [
    WeightedPoolExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
    bptAmountIn,
    tokenIndex,
  ]);
}

export function weightedPoolsUserDataExactBptInForTokensOut({ bptAmountIn }: { bptAmountIn: bigint }) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256"]), [
    WeightedPoolExitKind.EXACT_BPT_IN_FOR_TOKENS_OUT,
    bptAmountIn,
  ]);
}

// joins

export function weightedPoolsUserDataExactTokensInForBptOut({
  amountsIn,
  bptOut,
}: {
  amountsIn: bigint[];
  bptOut: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256[], uint256"]), [
    WeightedPoolJoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT,
    amountsIn,
    bptOut,
  ]);
}

export function weightedPoolsUserDataTokenInForExactBptOut({
  bptAmountOut,
  tokenIndex,
}: {
  bptAmountOut: bigint;
  tokenIndex: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256, uint256"]), [
    WeightedPoolJoinKind.TOKEN_IN_FOR_EXACT_BPT_OUT,
    bptAmountOut,
    tokenIndex,
  ]);
}

//--------------------------------------------------------------------------------------------
// STABLE POOLS
//--------------------------------------------------------------------------------------------

export enum StablePoolJoinKind {
  INIT = 0,
  EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
  TOKEN_IN_FOR_EXACT_BPT_OUT = 2,
  ALL_TOKENS_IN_FOR_EXACT_BPT_OUT = 3,
}

export enum StablePoolExitKind {
  EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
  EXACT_BPT_IN_FOR_TOKENS_OUT = 1,
  BPT_IN_FOR_EXACT_TOKENS_OUT = 2,
}

// exits

export function stablePoolsUserDataExactBptInForOneTokenOut({
  bptAmountIn,
  tokenIndex,
}: {
  bptAmountIn: bigint;
  tokenIndex: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256, uint256"]), [
    StablePoolExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
    bptAmountIn,
    tokenIndex,
  ]);
}

export function stablePoolsUserDataExactBptInForTokensOut({ bptAmountIn }: { bptAmountIn: bigint }) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256"]), [
    StablePoolExitKind.EXACT_BPT_IN_FOR_TOKENS_OUT,
    bptAmountIn,
  ]);
}

// joins

export function stablePoolsUserDataExactTokensInForBptOut({
  amountsIn,
  bptOut,
}: {
  amountsIn: bigint[];
  bptOut: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256[], uint256"]), [
    StablePoolJoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT,
    amountsIn,
    bptOut,
  ]);
}

export function stablePoolsUserDataTokenInForExactBptOut({
  bptAmountOut,
  tokenIndex,
}: {
  bptAmountOut: bigint;
  tokenIndex: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256, uint256"]), [
    StablePoolJoinKind.TOKEN_IN_FOR_EXACT_BPT_OUT,
    bptAmountOut,
    tokenIndex,
  ]);
}

//--------------------------------------------------------------------------------------------
// COMPOSABLE STABLE POOLS - V1
//--------------------------------------------------------------------------------------------

export enum ComposableStableV1PoolJoinKind {
  INIT = 0,
  EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
  TOKEN_IN_FOR_EXACT_BPT_OUT = 2,
  ALL_TOKENS_IN_FOR_EXACT_BPT_OUT = 3,
}

export enum ComposableStableV1PoolExitKind {
  EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
  BPT_IN_FOR_EXACT_TOKENS_OUT = 1,
}

// joins

export function composableStableV1PoolsUserDataExactTokensInForBptOut({
  amountsIn,
  bptOut,
}: {
  amountsIn: bigint[];
  bptOut: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256[], uint256"]), [
    ComposableStableV1PoolJoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT,
    amountsIn,
    bptOut,
  ]);
}

// exits

export function composableStableV1PoolsUserDataExactBptInForOneTokenOut({
  bptAmountIn,
  tokenIndex,
}: {
  bptAmountIn: bigint;
  tokenIndex: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256, uint256"]), [
    ComposableStableV1PoolExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
    bptAmountIn,
    tokenIndex,
  ]);
}

export function composableStableV1PoolsUserDataBptInForExactTokensOut({
  bptAmountIn,
}: {
  bptAmountIn: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256"]), [
    ComposableStableV1PoolExitKind.BPT_IN_FOR_EXACT_TOKENS_OUT,
    bptAmountIn,
  ]);
}

//--------------------------------------------------------------------------------------------
// COMPOSABLE STABLE POOLS - V2
//--------------------------------------------------------------------------------------------

export enum ComposableStableV2PoolJoinKind {
  INIT = 0,
  EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
  TOKEN_IN_FOR_EXACT_BPT_OUT = 2,
  ALL_TOKENS_IN_FOR_EXACT_BPT_OUT = 3,
}

export enum ComposableStableV2PoolExitKind {
  EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
  BPT_IN_FOR_EXACT_TOKENS_OUT = 1,
  EXACT_BPT_IN_FOR_ALL_TOKENS_OUT = 2,
}

// joins

export function composableStableV2PoolsUserDataExactTokensInForBptOut({
  amountsIn,
  bptOut,
}: {
  amountsIn: bigint[];
  bptOut: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256[], uint256"]), [
    ComposableStableV2PoolJoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT,
    amountsIn,
    bptOut,
  ]);
}

// exits

export function composableStableV2PoolsUserDataExactBptInForOneTokenOut({
  bptAmountIn,
  tokenIndex,
}: {
  bptAmountIn: bigint;
  tokenIndex: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256, uint256"]), [
    ComposableStableV2PoolExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
    bptAmountIn,
    tokenIndex,
  ]);
}

export function composableStableV2PoolsUserDataExactBptInForTokensOut({
  bptAmountIn,
}: {
  bptAmountIn: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256"]), [
    ComposableStableV2PoolExitKind.EXACT_BPT_IN_FOR_ALL_TOKENS_OUT,
    bptAmountIn,
  ]);
}
