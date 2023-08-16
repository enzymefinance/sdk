import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const curveLiquidityLendEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "orderedOutgoingAssetAmounts",
    type: "uint256[]",
  },
  {
    name: "minIncomingLpTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
] as const;

export type CurveLiquidityLendArgs = {
  pool: Address;
  orderedOutgoingAssetAmounts: bigint[];
  minIncomingLpTokenAmount: bigint;
  useUnderlyings: boolean;
};

export function encodeCurveLiquidityLendArgs({
  pool,
  orderedOutgoingAssetAmounts,
  minIncomingLpTokenAmount,
  useUnderlyings,
}: CurveLiquidityLendArgs): Hex {
  return encodeAbiParameters(curveLiquidityLendEncoding, [
    pool,
    orderedOutgoingAssetAmounts,
    minIncomingLpTokenAmount,
    useUnderlyings,
  ]);
}

export function decodeCurveLiquidityLendArgs(callArgs: Hex): CurveLiquidityLendArgs {
  const [pool, orderedOutgoingAssetAmounts, minIncomingLpTokenAmount, useUnderlyings] = decodeAbiParameters(
    curveLiquidityLendEncoding,
    callArgs,
  );

  return {
    pool,
    orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
    minIncomingLpTokenAmount,
    useUnderlyings,
  };
}

export const curveLiquidityLendAndStakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "orderedOutgoingAssetAmounts",
    type: "uint256[]",
  },
  {
    name: "incomingStakingToken",
    type: "address",
  },
  {
    name: "minIncomingStakingTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
] as const;

export type CurveLiquidityLendAndStakeArgs = {
  pool: Address;
  orderedOutgoingAssetAmounts: bigint[];
  incomingStakingToken: Address;
  minIncomingStakingTokenAmount: bigint;
  useUnderlyings: boolean;
};

export function encodeCurveLiquidityLendAndStakeArgs({
  pool,
  orderedOutgoingAssetAmounts,
  incomingStakingToken,
  minIncomingStakingTokenAmount,
  useUnderlyings,
}: CurveLiquidityLendAndStakeArgs): Hex {
  return encodeAbiParameters(curveLiquidityLendAndStakeEncoding, [
    pool,
    orderedOutgoingAssetAmounts,
    incomingStakingToken,
    minIncomingStakingTokenAmount,
    useUnderlyings,
  ]);
}

export function decodeCurveLiquidityLendAndStakeArgs(callArgs: Hex): CurveLiquidityLendAndStakeArgs {
  const [pool, orderedOutgoingAssetAmounts, incomingStakingToken, minIncomingStakingTokenAmount, useUnderlyings] =
    decodeAbiParameters(curveLiquidityLendAndStakeEncoding, callArgs);

  return {
    pool,
    orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
    incomingStakingToken,
    minIncomingStakingTokenAmount,
    useUnderlyings,
  };
}

export const RedeemType = {
  Standard: 0,
  OneCoin: 1,
} as const;

export type RedeemTypeValue = typeof RedeemType[keyof typeof RedeemType];

export const curveLiquidityRedeemEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingLpTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
  {
    name: "redeemType",
    type: "uint8",
  },
  {
    name: "incomingAssetsData",
    type: "bytes",
  },
] as const;

export function assertRedeemTypeValue(value: number): asserts value is RedeemTypeValue {
  if (!Object.values(RedeemType).includes(value as RedeemTypeValue)) {
    throw new Error(`Invalid redeemType: ${value}`);
  }
}

export type CurveLiquidityRedeemArgs = {
  pool: Address;
  outgoingLpTokenAmount: bigint;
  useUnderlyings: boolean;
  redeemType: RedeemTypeValue;
  incomingAssetsData: Hex;
};

export function encodeCurveLiquidityRedeemArgs({
  pool,
  outgoingLpTokenAmount,
  useUnderlyings,
  redeemType,
  incomingAssetsData,
}: CurveLiquidityRedeemArgs): Hex {
  return encodeAbiParameters(curveLiquidityRedeemEncoding, [
    pool,
    outgoingLpTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  ]);
}

export function decodeCurveLiquidityRedeemArgs(integrationData: Hex): CurveLiquidityRedeemArgs {
  const [pool, outgoingLpTokenAmount, useUnderlyings, redeemType, incomingAssetsData] = decodeAbiParameters(
    curveLiquidityRedeemEncoding,
    integrationData,
  );

  assertRedeemTypeValue(redeemType);

  return {
    pool,
    outgoingLpTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  };
}

export const curveLiquidityClaimRewardsEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
] as const;

export type CurveLiquidityClaimRewardsArgs = {
  stakingToken: Address;
};

export function encodeCurveLiquidityClaimRewardsArgs({ stakingToken }: CurveLiquidityClaimRewardsArgs): Hex {
  return encodeAbiParameters(curveLiquidityClaimRewardsEncoding, [stakingToken]);
}

export function decodeCurveLiquidityClaimRewardsArgs(integrationData: Hex): CurveLiquidityClaimRewardsArgs {
  const [stakingToken] = decodeAbiParameters(curveLiquidityClaimRewardsEncoding, integrationData);

  return { stakingToken };
}

export const curveLiquidityStakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "incomingStakingToken",
    type: "address",
  },
  {
    name: "amount",
    type: "uint256",
  },
] as const;

export type CurveLiquidityStakeArgs = {
  pool: Address;
  incomingStakingToken: Address;
  amount: bigint;
};

export function encodeCurveLiquidityStakeArgs({ pool, incomingStakingToken, amount }: CurveLiquidityStakeArgs): Hex {
  return encodeAbiParameters(curveLiquidityStakeEncoding, [pool, incomingStakingToken, amount]);
}

export function decodeCurveLiquidityStakeArgs(integrationData: Hex): CurveLiquidityStakeArgs {
  const [pool, incomingStakingToken, amount] = decodeAbiParameters(curveLiquidityStakeEncoding, integrationData);

  return { pool, incomingStakingToken, amount };
}

export const curveLiquidityUnstakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingStakingToken",
    type: "address",
  },
  {
    name: "amount",
    type: "uint256",
  },
] as const;

export type CurveLiquidityUnstakeArgs = {
  pool: Address;
  outgoingStakingToken: Address;
  amount: bigint;
};

export function encodeCurveLiquidityUnstakeArgs({
  pool,
  outgoingStakingToken,
  amount,
}: CurveLiquidityUnstakeArgs): Hex {
  return encodeAbiParameters(curveLiquidityUnstakeEncoding, [pool, outgoingStakingToken, amount]);
}

export function decodeCurveLiquidityUnstakeArgs(integrationData: Hex): CurveLiquidityUnstakeArgs {
  const [pool, outgoingStakingToken, amount] = decodeAbiParameters(curveLiquidityUnstakeEncoding, integrationData);

  return { pool, outgoingStakingToken, amount };
}

export const curveLiquidityUnstakeAndRedeemEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingStakingToken",
    type: "address",
  },
  {
    name: "outgoingStakingTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
  {
    name: "redeemType",
    type: "uint8",
  },
  {
    name: "incomingAssetsData",
    type: "bytes",
  },
] as const;

export type CurveLiquidityUnstakeAndRedeemArgs = {
  pool: Address;
  outgoingStakingToken: Address;
  outgoingStakingTokenAmount: bigint;
  useUnderlyings: boolean;
  redeemType: RedeemTypeValue;
  incomingAssetsData: Hex;
};

export function encodeCurveLiquidityUnstakeAndRedeemArgs({
  pool,
  outgoingStakingToken,
  outgoingStakingTokenAmount,
  useUnderlyings,
  redeemType,
  incomingAssetsData,
}: CurveLiquidityUnstakeAndRedeemArgs): Hex {
  return encodeAbiParameters(curveLiquidityUnstakeAndRedeemEncoding, [
    pool,
    outgoingStakingToken,
    outgoingStakingTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  ]);
}

export function decodeCurveLiquidityUnstakeAndRedeemArgs(integrationData: Hex): CurveLiquidityUnstakeAndRedeemArgs {
  const [pool, outgoingStakingToken, outgoingStakingTokenAmount, useUnderlyings, redeemType, incomingAssetsData] =
    decodeAbiParameters(curveLiquidityUnstakeAndRedeemEncoding, integrationData);

  assertRedeemTypeValue(redeemType);

  return {
    pool,
    outgoingStakingToken,
    outgoingStakingTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  };
}
