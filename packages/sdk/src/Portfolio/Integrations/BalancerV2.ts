import {
  type Address,
  type Hex,
  type PublicClient,
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbiParameters,
} from "viem";
import { readContract, simulateContract } from "viem/actions";
import { Assertion, type Types, Viem } from "../../Utils.js";
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
  usedTokens: readonly Address[];
  usedTokenAmounts: readonly bigint[];
  request: {
    assets: readonly Address[];
    limits: readonly bigint[];
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

export type SwapKind = (typeof SwapKind)[keyof typeof SwapKind];
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
  assets: readonly Address[];
  limits: readonly bigint[];
  stakingTokens: readonly Address[];
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [args.kind, args.swaps, args.assets, args.limits, args.stakingTokens]);
}

export function isValidSwapKind(kind: number): kind is SwapKind {
  return Object.values(SwapKind).includes(kind as SwapKind);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [kind, swaps, assets, limits, stakingTokens] = decodeAbiParameters(takeOrderEncoding, encoded);

  Assertion.invariant(isValidSwapKind(kind), `Invalid swap kind ${kind}`);

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
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
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
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: gaugeAbi,
    functionName: "claimable_reward",
    address: args.gauge,
    args: [args.user, args.rewardToken],
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - BALANCER QUERIES
//--------------------------------------------------------------------------------------------

const balancerQueriesAbi = [
  {
    inputs: [{ internalType: "contract IVault", name: "_vault", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      { internalType: "enum IVault.SwapKind", name: "kind", type: "uint8" },
      {
        components: [
          { internalType: "bytes32", name: "poolId", type: "bytes32" },
          { internalType: "uint256", name: "assetInIndex", type: "uint256" },
          { internalType: "uint256", name: "assetOutIndex", type: "uint256" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes", name: "userData", type: "bytes" },
        ],
        internalType: "struct IVault.BatchSwapStep[]",
        name: "swaps",
        type: "tuple[]",
      },
      { internalType: "contract IAsset[]", name: "assets", type: "address[]" },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "bool", name: "fromInternalBalance", type: "bool" },
          { internalType: "address payable", name: "recipient", type: "address" },
          { internalType: "bool", name: "toInternalBalance", type: "bool" },
        ],
        internalType: "struct IVault.FundManagement",
        name: "funds",
        type: "tuple",
      },
    ],
    name: "queryBatchSwap",
    outputs: [{ internalType: "int256[]", name: "assetDeltas", type: "int256[]" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "poolId", type: "bytes32" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      {
        components: [
          { internalType: "contract IAsset[]", name: "assets", type: "address[]" },
          { internalType: "uint256[]", name: "minAmountsOut", type: "uint256[]" },
          { internalType: "bytes", name: "userData", type: "bytes" },
          { internalType: "bool", name: "toInternalBalance", type: "bool" },
        ],
        internalType: "struct IVault.ExitPoolRequest",
        name: "request",
        type: "tuple",
      },
    ],
    name: "queryExit",
    outputs: [
      { internalType: "uint256", name: "bptIn", type: "uint256" },
      { internalType: "uint256[]", name: "amountsOut", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "bytes32", name: "poolId", type: "bytes32" },
      { internalType: "address", name: "sender", type: "address" },
      { internalType: "address", name: "recipient", type: "address" },
      {
        components: [
          { internalType: "contract IAsset[]", name: "assets", type: "address[]" },
          { internalType: "uint256[]", name: "maxAmountsIn", type: "uint256[]" },
          { internalType: "bytes", name: "userData", type: "bytes" },
          { internalType: "bool", name: "fromInternalBalance", type: "bool" },
        ],
        internalType: "struct IVault.JoinPoolRequest",
        name: "request",
        type: "tuple",
      },
    ],
    name: "queryJoin",
    outputs: [
      { internalType: "uint256", name: "bptOut", type: "uint256" },
      { internalType: "uint256[]", name: "amountsIn", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "bytes32", name: "poolId", type: "bytes32" },
          { internalType: "enum IVault.SwapKind", name: "kind", type: "uint8" },
          { internalType: "contract IAsset", name: "assetIn", type: "address" },
          { internalType: "contract IAsset", name: "assetOut", type: "address" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "bytes", name: "userData", type: "bytes" },
        ],
        internalType: "struct IVault.SingleSwap",
        name: "singleSwap",
        type: "tuple",
      },
      {
        components: [
          { internalType: "address", name: "sender", type: "address" },
          { internalType: "bool", name: "fromInternalBalance", type: "bool" },
          { internalType: "address payable", name: "recipient", type: "address" },
          { internalType: "bool", name: "toInternalBalance", type: "bool" },
        ],
        internalType: "struct IVault.FundManagement",
        name: "funds",
        type: "tuple",
      },
    ],
    name: "querySwap",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "vault",
    outputs: [{ internalType: "contract IVault", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

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
    balancerQueries: Address;
    kind: (typeof SwapKind)[keyof typeof SwapKind];
    swaps: readonly BatchSwapStep[];
    assets: readonly Address[];
    funds: BatchSwapFunds;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: balancerQueriesAbi,
    functionName: "queryBatchSwap",
    address: args.balancerQueries,
    args: [
      args.kind,
      args.swaps.map((swap) => ({
        poolId: swap.poolId,
        assetInIndex: swap.assetInIndex,
        assetOutIndex: swap.assetOutIndex,
        amount: swap.amount,
        userData: swap.userData,
      })),
      args.assets,
      {
        sender: args.funds.sender,
        fromInternalBalance: args.funds.fromInternalBalance,
        recipient: args.funds.recipient,
        toInternalBalance: args.funds.toInternalBalance,
      },
    ],
  });

  return result;
}

export async function queryExit(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    balancerQueries: Address;
    poolId: Hex;
    sender: Address;
    recipient: Address;
    request: {
      assets: readonly Address[];
      minAmountsOut: readonly bigint[];
      userData: Hex;
      toInternalBalance: boolean;
    };
  }>,
) {
  const {
    result: [bptIn, amountsOut],
  } = await simulateContract(client, {
    address: args.balancerQueries,
    abi: balancerQueriesAbi,
    functionName: "queryExit",
    args: [args.poolId, args.sender, args.recipient, args.request],
  });

  return {
    bptIn,
    amountsOut,
  };
}

export async function queryJoin(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    balancerQueries: Address;
    poolId: Hex;
    sender: Address;
    recipient: Address;
    request: {
      assets: readonly Address[];
      maxAmountsIn: readonly bigint[];
      userData: Hex;
      fromInternalBalance: boolean;
    };
  }>,
) {
  const {
    result: [bptOut, amountsIn],
  } = await simulateContract(client, {
    address: args.balancerQueries,
    abi: balancerQueriesAbi,
    functionName: "queryJoin",
    args: [args.poolId, args.sender, args.recipient, args.request],
  });

  return {
    bptOut,
    amountsIn,
  };
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
  amountsOut: readonly bigint[];
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
  amountsIn: readonly bigint[];
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
  amountsIn: readonly bigint[];
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
// COMPOSABLE STABLE POOLS
//--------------------------------------------------------------------------------------------

export enum ComposableStablePoolJoinKind {
  INIT = 0,
  EXACT_TOKENS_IN_FOR_BPT_OUT = 1,
  TOKEN_IN_FOR_EXACT_BPT_OUT = 2,
  ALL_TOKENS_IN_FOR_EXACT_BPT_OUT = 3,
}

export enum ComposableStablePoolExitKind {
  EXACT_BPT_IN_FOR_ONE_TOKEN_OUT = 0,
  BPT_IN_FOR_EXACT_TOKENS_OUT = 1,
  EXACT_BPT_IN_FOR_ALL_TOKENS_OUT = 2,
}

// joins

export function composableStablePoolsUserDataExactTokensInForBptOut({
  amountsIn,
  bptOut,
}: {
  amountsIn: readonly bigint[];
  bptOut: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256[], uint256"]), [
    ComposableStablePoolJoinKind.EXACT_TOKENS_IN_FOR_BPT_OUT,
    amountsIn,
    bptOut,
  ]);
}

// exits

export function composableStablePoolsUserDataExactBptInForOneTokenOut({
  bptAmountIn,
  tokenIndex,
}: {
  bptAmountIn: bigint;
  tokenIndex: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256, uint256"]), [
    ComposableStablePoolExitKind.EXACT_BPT_IN_FOR_ONE_TOKEN_OUT,
    bptAmountIn,
    tokenIndex,
  ]);
}

export function composableStablePoolsUserDataExactBptInForTokensOut({
  bptAmountIn,
}: {
  bptAmountIn: bigint;
}) {
  return encodeAbiParameters(parseAbiParameters(["uint8, uint256"]), [
    ComposableStablePoolExitKind.EXACT_BPT_IN_FOR_ALL_TOKENS_OUT,
    bptAmountIn,
  ]);
}
