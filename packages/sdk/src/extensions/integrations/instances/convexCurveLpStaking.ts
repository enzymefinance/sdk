import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const convexCurveLpStakingLendAndStakeEncoding = [
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

export type ConvexCurveLpStakingLendAndStakeArgs = {
  pool: Address;
  orderedOutgoingAssetAmounts: bigint[];
  incomingStakingToken: Address;
  minIncomingStakingTokenAmount: bigint;
  useUnderlyings: boolean;
};

export function encodeConvexCurveLpStakingLendAndStakeArgs({
  pool,
  orderedOutgoingAssetAmounts,
  incomingStakingToken,
  minIncomingStakingTokenAmount,
  useUnderlyings,
}: ConvexCurveLpStakingLendAndStakeArgs): Hex {
  return encodeAbiParameters(convexCurveLpStakingLendAndStakeEncoding, [
    pool,
    orderedOutgoingAssetAmounts,
    incomingStakingToken,
    minIncomingStakingTokenAmount,
    useUnderlyings,
  ]);
}

export function decodeConvexCurveLpStakingLendAndStakeArgs(callArgs: Hex): ConvexCurveLpStakingLendAndStakeArgs {
  const [pool, orderedOutgoingAssetAmounts, incomingStakingToken, minIncomingStakingTokenAmount, useUnderlyings] =
    decodeAbiParameters(convexCurveLpStakingLendAndStakeEncoding, callArgs);

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

function assertRedeemTypeValue(value: number): asserts value is RedeemTypeValue {
  if (!Object.values(RedeemType).includes(value as RedeemTypeValue)) {
    throw new Error(`Invalid redeemType: ${value}`);
  }
}

export const convexCurveLpStakingClaimRewardsEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
] as const;

export type ConvexCurveLpStakingClaimRewardsArgs = {
  stakingToken: Address;
};

export function encodeConvexCurveLpStakingClaimRewardsArgs({
  stakingToken,
}: ConvexCurveLpStakingClaimRewardsArgs): Hex {
  return encodeAbiParameters(convexCurveLpStakingClaimRewardsEncoding, [stakingToken]);
}

export function decodeConvexCurveLpStakingClaimRewardsArgs(integrationData: Hex): ConvexCurveLpStakingClaimRewardsArgs {
  const [stakingToken] = decodeAbiParameters(convexCurveLpStakingClaimRewardsEncoding, integrationData);

  return { stakingToken };
}

export const convexCurveLpStakingStakeEncoding = [
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

export type ConvexCurveLpStakingStakeArgs = {
  pool: Address;
  incomingStakingToken: Address;
  amount: bigint;
};

export function encodeConvexCurveLpStakingStakeArgs({
  pool,
  incomingStakingToken,
  amount,
}: ConvexCurveLpStakingStakeArgs): Hex {
  return encodeAbiParameters(convexCurveLpStakingStakeEncoding, [pool, incomingStakingToken, amount]);
}

export function decodeConvexCurveLpStakingStakeArgs(integrationData: Hex): ConvexCurveLpStakingStakeArgs {
  const [pool, incomingStakingToken, amount] = decodeAbiParameters(convexCurveLpStakingStakeEncoding, integrationData);

  return { pool, incomingStakingToken, amount };
}

export const convexCurveLpStakingUnstakeEncoding = [
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

export type ConvexCurveLpStakingUnstakeArgs = {
  pool: Address;
  outgoingStakingToken: Address;
  amount: bigint;
};

export function encodeConvexCurveLpStakingUnstakeArgs({
  pool,
  outgoingStakingToken,
  amount,
}: ConvexCurveLpStakingUnstakeArgs): Hex {
  return encodeAbiParameters(convexCurveLpStakingUnstakeEncoding, [pool, outgoingStakingToken, amount]);
}

export function decodeConvexCurveLpStakingUnstakeArgs(integrationData: Hex): ConvexCurveLpStakingUnstakeArgs {
  const [pool, outgoingStakingToken, amount] = decodeAbiParameters(
    convexCurveLpStakingUnstakeEncoding,
    integrationData,
  );

  return { pool, outgoingStakingToken, amount };
}

export const convexCurveLpStakingUnstakeAndRedeemEncoding = [
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

export type ConvexCurveLpStakingUnstakeAndRedeemArgs = {
  pool: Address;
  outgoingStakingToken: Address;
  outgoingStakingTokenAmount: bigint;
  useUnderlyings: boolean;
  redeemType: RedeemTypeValue;
  incomingAssetsData: Hex;
};

export function encodeConvexCurveLpStakingUnstakeAndRedeemArgs({
  pool,
  outgoingStakingToken,
  outgoingStakingTokenAmount,
  useUnderlyings,
  redeemType,
  incomingAssetsData,
}: ConvexCurveLpStakingUnstakeAndRedeemArgs): Hex {
  return encodeAbiParameters(convexCurveLpStakingUnstakeAndRedeemEncoding, [
    pool,
    outgoingStakingToken,
    outgoingStakingTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  ]);
}

export function decodeConvexCurveLpStakingUnstakeAndRedeemArgs(
  integrationData: Hex,
): ConvexCurveLpStakingUnstakeAndRedeemArgs {
  const [pool, outgoingStakingToken, outgoingStakingTokenAmount, useUnderlyings, redeemType, incomingAssetsData] =
    decodeAbiParameters(convexCurveLpStakingUnstakeAndRedeemEncoding, integrationData);

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
