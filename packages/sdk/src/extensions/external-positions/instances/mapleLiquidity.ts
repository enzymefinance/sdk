import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type MapleLiquidityAction = typeof MapleLiquidityAction[keyof typeof MapleLiquidityAction];
export const MapleLiquidityAction = {
  // Lower action ids are deprecated, and we don't support them
  ClaimRewardsV1: 8n,
  LendV2: 9n,
  RequestRedeemV2: 10n,
  RedeemV2: 11n,
  CancelRedeemV2: 12n,
} as const;

const mapleLiquidityLendV2ArgsEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "liquidityAssetAmount",
    type: "uint256",
  },
] as const;

export type MapleLiquidityLendV2Args = {
  pool: Address;
  liquidityAssetAmount: bigint;
  externalPositionProxy: Address;
};

export function encodeMapleLiquidityLendV2Args({
  externalPositionProxy,
  pool,
  liquidityAssetAmount,
}: MapleLiquidityLendV2Args): Hex {
  const actionArgs = encodeAbiParameters(mapleLiquidityLendV2ArgsEncoding, [pool, liquidityAssetAmount]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: MapleLiquidityAction.LendV2,
    actionArgs,
  });
}

export function decodeMapleLiquidityLendV2Args(callArgs: Hex): MapleLiquidityLendV2Args {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [pool, liquidityAssetAmount] = decodeAbiParameters(mapleLiquidityLendV2ArgsEncoding, actionArgs);

  return {
    pool,
    liquidityAssetAmount,
    externalPositionProxy,
  };
}

const mapleLiquidityRequestRedeemV2ArgsEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "poolTokenAmount",
    type: "uint256",
  },
] as const;

export type MapleLiquidityRequestRedeemV2Args = {
  pool: Address;
  poolTokenAmount: bigint;
  externalPositionProxy: Address;
};

export function encodeMapleLiquidityRequestRedeemV2Args({
  externalPositionProxy,
  pool,
  poolTokenAmount,
}: MapleLiquidityRequestRedeemV2Args): Hex {
  const actionArgs = encodeAbiParameters(mapleLiquidityRequestRedeemV2ArgsEncoding, [pool, poolTokenAmount]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: MapleLiquidityAction.RequestRedeemV2,
    actionArgs,
  });
}

export function decodeMapleLiquidityRequestRedeemV2Args(callArgs: Hex): MapleLiquidityRequestRedeemV2Args {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [pool, poolTokenAmount] = decodeAbiParameters(mapleLiquidityRequestRedeemV2ArgsEncoding, actionArgs);

  return {
    pool,
    poolTokenAmount,
    externalPositionProxy,
  };
}

const mapleLiquidityRedeemV2ArgsEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "poolTokenAmount",
    type: "uint256",
  },
] as const;

export type MapleLiquidityRedeemV2Args = {
  pool: Address;
  poolTokenAmount: bigint;
  externalPositionProxy: Address;
};

export function encodeMapleLiquidityRedeemV2Args({
  externalPositionProxy,
  pool,
  poolTokenAmount,
}: MapleLiquidityRedeemV2Args): Hex {
  const actionArgs = encodeAbiParameters(mapleLiquidityRedeemV2ArgsEncoding, [pool, poolTokenAmount]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: MapleLiquidityAction.RedeemV2,
    actionArgs,
  });
}

export function decodeMapleLiquidityRedeemV2Args(callArgs: Hex): MapleLiquidityRedeemV2Args {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [pool, poolTokenAmount] = decodeAbiParameters(mapleLiquidityRedeemV2ArgsEncoding, actionArgs);

  return {
    pool,
    poolTokenAmount,
    externalPositionProxy,
  };
}

const mapleLiquidityCancelRedeemV2ArgsEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "poolTokenAmount",
    type: "uint256",
  },
] as const;

export type MapleLiquidityCancelRedeemV2Args = {
  pool: Address;
  poolTokenAmount: bigint;
  externalPositionProxy: Address;
};

export function encodeMapleLiquidityCancelRedeemV2Args({
  externalPositionProxy,
  pool,
  poolTokenAmount,
}: MapleLiquidityCancelRedeemV2Args): Hex {
  const actionArgs = encodeAbiParameters(mapleLiquidityCancelRedeemV2ArgsEncoding, [pool, poolTokenAmount]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: MapleLiquidityAction.CancelRedeemV2,
    actionArgs,
  });
}

export function decodeMapleLiquidityCancelRedeemV2Args(callArgs: Hex): MapleLiquidityCancelRedeemV2Args {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [pool, poolTokenAmount] = decodeAbiParameters(mapleLiquidityCancelRedeemV2ArgsEncoding, actionArgs);

  return {
    pool,
    poolTokenAmount,
    externalPositionProxy,
  };
}

const mapleLiquidityClaimRewardsV1ArgsEncoding = [
  {
    name: "rewardsContract",
    type: "address",
  },
] as const;

export type MapleLiquidityClaimRewardsV1Args = {
  rewardsContract: Address;
  externalPositionProxy: Address;
};

export function encodeMapleLiquidityClaimRewardsV1Args({
  externalPositionProxy,
  rewardsContract,
}: MapleLiquidityClaimRewardsV1Args): Hex {
  const actionArgs = encodeAbiParameters(mapleLiquidityClaimRewardsV1ArgsEncoding, [rewardsContract]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: MapleLiquidityAction.ClaimRewardsV1,
    actionArgs,
  });
}

export function decodeMapleLiquidityClaimRewardsV1Args(callArgs: Hex): MapleLiquidityClaimRewardsV1Args {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [rewardsContract] = decodeAbiParameters(mapleLiquidityClaimRewardsV1ArgsEncoding, actionArgs);

  return {
    rewardsContract,
    externalPositionProxy,
  };
}
