import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

const balancerV2LiquidityLendEncodingAndRedeemEncoding = [
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

export type BalancerV2LiquidityLendArgsAndRedeemArgs = {
  poolId: Hex;
  bptAmount: bigint;
  usedTokens: Address[];
  usedTokenAmounts: bigint[];
  request: {
    assets: Address[];
    limits: bigint[];
    userData: Hex;
    useInternalBalance: boolean;
  };
};

export function encodeBalancerV2LiquidityLendArgsAndRedeemArgs({
  poolId,
  bptAmount,
  usedTokens,
  usedTokenAmounts,
  request,
}: BalancerV2LiquidityLendArgsAndRedeemArgs): Hex {
  return encodeAbiParameters(balancerV2LiquidityLendEncodingAndRedeemEncoding, [
    poolId,
    bptAmount,
    usedTokens,
    usedTokenAmounts,
    request,
  ]);
}

export function decodeBalancerV2LiquidityLendArgsAndRedeemArgs(
  callArgs: Hex,
): BalancerV2LiquidityLendArgsAndRedeemArgs {
  const [poolId, bptAmount, usedTokens, usedTokenAmounts, request] = decodeAbiParameters(
    balancerV2LiquidityLendEncodingAndRedeemEncoding,
    callArgs,
  );

  return {
    poolId,
    bptAmount,
    usedTokens: [...usedTokens],
    usedTokenAmounts: [...usedTokenAmounts],
    request: { ...request, assets: [...request.assets], limits: [...request.limits] },
  };
}

const balancerV2LiquidityLendAndStakeEncodingAndUnstakeEncodingAndUnstakeAndRedeemEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
  ...balancerV2LiquidityLendEncodingAndRedeemEncoding,
] as const;

export type BalancerV2LiquidityLendAndStakeArgsAndUnstakeAndRedeemArgs = BalancerV2LiquidityLendArgsAndRedeemArgs & {
  stakingToken: Address;
};

export function encodeBalancerV2LiquidityLendAndStakeArgsAndUnstakeAndRedeemArgs({
  poolId,
  bptAmount,
  usedTokens,
  usedTokenAmounts,
  request,
  stakingToken,
}: BalancerV2LiquidityLendAndStakeArgsAndUnstakeAndRedeemArgs): Hex {
  return encodeAbiParameters(balancerV2LiquidityLendAndStakeEncodingAndUnstakeEncodingAndUnstakeAndRedeemEncoding, [
    stakingToken,
    poolId,
    bptAmount,
    usedTokens,
    usedTokenAmounts,
    request,
  ]);
}

export function decodeBalancerV2LiquidityLendAndStakeArgsAndUnstakeAndRedeemArgs(
  callArgs: Hex,
): BalancerV2LiquidityLendAndStakeArgsAndUnstakeAndRedeemArgs {
  const [stakingToken, poolId, bptAmount, usedTokens, usedTokenAmounts, request] = decodeAbiParameters(
    balancerV2LiquidityLendAndStakeEncodingAndUnstakeEncodingAndUnstakeAndRedeemEncoding,
    callArgs,
  );

  return {
    stakingToken,
    poolId,
    bptAmount,
    usedTokens: [...usedTokens],
    usedTokenAmounts: [...usedTokenAmounts],
    request: { ...request, assets: [...request.assets], limits: [...request.limits] },
  };
}

const balancerV2LiquidityClaimRewardsEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
] as const;

export type BalancerV2LiquidityClaimRewardsArgs = {
  stakingToken: Address;
};

export function encodeBalancerV2LiquidityClaimRewardsArgs({ stakingToken }: BalancerV2LiquidityClaimRewardsArgs): Hex {
  return encodeAbiParameters(balancerV2LiquidityClaimRewardsEncoding, [stakingToken]);
}

export function decodeBalancerV2LiquidityClaimRewardsArgs(integrationData: Hex): BalancerV2LiquidityClaimRewardsArgs {
  const [stakingToken] = decodeAbiParameters(balancerV2LiquidityClaimRewardsEncoding, integrationData);

  return { stakingToken };
}

const balancerV2LiquidityStakeEncodingAndUnstakeEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
  {
    name: "bptAmount",
    type: "uint256",
  },
] as const;

export type BalancerV2LiquidityStakeArgsAndUnstakeArgs = {
  stakingToken: Address;
  bptAmount: bigint;
};

export function encodeBalancerV2LiquidityStakeArgsAndUnstakeArgs({
  stakingToken,
  bptAmount,
}: BalancerV2LiquidityStakeArgsAndUnstakeArgs): Hex {
  return encodeAbiParameters(balancerV2LiquidityStakeEncodingAndUnstakeEncoding, [stakingToken, bptAmount]);
}

export function decodeBalancerV2LiquidityStakeArgsAndUnstakeArgs(
  integrationData: Hex,
): BalancerV2LiquidityStakeArgsAndUnstakeArgs {
  const [stakingToken, bptAmount] = decodeAbiParameters(
    balancerV2LiquidityStakeEncodingAndUnstakeEncoding,
    integrationData,
  );

  return { stakingToken, bptAmount };
}

export const SwapKind = {
  GivenIn: 0,
  GivenOut: 1,
} as const;

export type SwapKindValue = typeof SwapKind[keyof typeof SwapKind];

function assertSwapKindValue(value: number): asserts value is SwapKindValue {
  if (!Object.values(SwapKind).includes(value as SwapKindValue)) {
    throw new Error(`Invalid SwapKind: ${value}`);
  }
}

const balancerV2LiquidityTakeOrderEncoding = [
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

export type BalancerV2LiquidityTakeOrderArgs = {
  kind: SwapKindValue;
  swaps: {
    poolId: Hex;
    assetInIndex: bigint;
    assetOutIndex: bigint;
    amount: bigint;
    userData: Hex;
  }[];
  assets: Address[];
  limits: bigint[];
  stakingTokens: Address[];
};

export function encodeBalancerV2LiquidityTakeOrderArgs({
  kind,
  swaps,
  assets,
  limits,
  stakingTokens,
}: BalancerV2LiquidityTakeOrderArgs): Hex {
  return encodeAbiParameters(balancerV2LiquidityTakeOrderEncoding, [kind, swaps, assets, limits, stakingTokens]);
}

export function decodeBalancerV2LiquidityTakeOrderArgs(integrationData: Hex): BalancerV2LiquidityTakeOrderArgs {
  const [kind, swaps, assets, limits, stakingTokens] = decodeAbiParameters(
    balancerV2LiquidityTakeOrderEncoding,
    integrationData,
  );

  assertSwapKindValue(kind);

  return { kind, swaps: [...swaps], assets: [...assets], limits: [...limits], stakingTokens: [...stakingTokens] };
}
