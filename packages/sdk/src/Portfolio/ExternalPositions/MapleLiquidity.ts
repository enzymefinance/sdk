import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  // Lower action ids are deprecated, and we don't support them
  ClaimRewardsV1: 8n,
  LendV2: 9n,
  RequestRedeemV2: 10n,
  RedeemV2: 11n,
  CancelRedeemV2: 12n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// LEND V2
//--------------------------------------------------------------------------------------------

export const lendV2 = ExternalPositionManager.makeUse(Action.LendV2, lendV2Encode);
export const createAndLendV2 = ExternalPositionManager.makeCreateAndUse(Action.LendV2, lendV2Encode);

const lendV2Encoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "liquidityAssetAmount",
    type: "uint256",
  },
] as const;

export type LendV2Args = {
  pool: Address;
  liquidityAssetAmount: bigint;
};

export function lendV2Encode(args: LendV2Args): Hex {
  return encodeAbiParameters(lendV2Encoding, [args.pool, args.liquidityAssetAmount]);
}

export function lendV2Decode(encoded: Hex): LendV2Args {
  const [pool, liquidityAssetAmount] = decodeAbiParameters(lendV2Encoding, encoded);

  return {
    pool,
    liquidityAssetAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REQUEST REEDEEM V2
//--------------------------------------------------------------------------------------------

export const requestRedeemV2 = ExternalPositionManager.makeUse(Action.RequestRedeemV2, requestRedeemV2Encode);

const requestRedeemV2Encoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "poolTokenAmount",
    type: "uint256",
  },
] as const;

export type RequestRedeemV2Args = {
  pool: Address;
  poolTokenAmount: bigint;
};

export function requestRedeemV2Encode(args: RequestRedeemV2Args): Hex {
  return encodeAbiParameters(requestRedeemV2Encoding, [args.pool, args.poolTokenAmount]);
}

export function requestRedeemV2Decode(encoded: Hex): RequestRedeemV2Args {
  const [pool, poolTokenAmount] = decodeAbiParameters(requestRedeemV2Encoding, encoded);

  return {
    pool,
    poolTokenAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM V2
//--------------------------------------------------------------------------------------------

export const redeemV2 = ExternalPositionManager.makeUse(Action.RedeemV2, redeemV2Encode);

const redeemV2Encoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "poolTokenAmount",
    type: "uint256",
  },
] as const;

export type RedeemV2Args = {
  pool: Address;
  poolTokenAmount: bigint;
};

export function redeemV2Encode(args: RedeemV2Args): Hex {
  return encodeAbiParameters(redeemV2Encoding, [args.pool, args.poolTokenAmount]);
}

export function redeemV2Decode(encoded: Hex): RedeemV2Args {
  const [pool, poolTokenAmount] = decodeAbiParameters(redeemV2Encoding, encoded);

  return {
    pool,
    poolTokenAmount,
  };
}

//--------------------------------------------------------------------------------------------
// CANCEL REDEEM V2
//--------------------------------------------------------------------------------------------

export const cancelRedeemV2 = ExternalPositionManager.makeUse(Action.CancelRedeemV2, cancelRedeemV2Encode);

const cancelRedeemV2Encoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "poolTokenAmount",
    type: "uint256",
  },
] as const;

export type CancelRedeemV2Args = {
  pool: Address;
  poolTokenAmount: bigint;
};

export function cancelRedeemV2Encode(args: CancelRedeemV2Args): Hex {
  return encodeAbiParameters(cancelRedeemV2Encoding, [args.pool, args.poolTokenAmount]);
}

export function cancelRedeemV2Decode(encoded: Hex): CancelRedeemV2Args {
  const [pool, poolTokenAmount] = decodeAbiParameters(cancelRedeemV2Encoding, encoded);

  return {
    pool,
    poolTokenAmount,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS V1
//--------------------------------------------------------------------------------------------

export const claimRewardsV1 = ExternalPositionManager.makeUse(Action.ClaimRewardsV1, claimRewardsV1Encode);

const claimRewardsV1Encoding = [
  {
    name: "rewardsContract",
    type: "address",
  },
] as const;

export type ClaimRewardsV1Args = {
  rewardsContract: Address;
};

export function claimRewardsV1Encode(args: ClaimRewardsV1Args): Hex {
  return encodeAbiParameters(claimRewardsV1Encoding, [args.rewardsContract]);
}

export function claimRewardsV1Decode(encoded: Hex): ClaimRewardsV1Args {
  const [rewardsContract] = decodeAbiParameters(claimRewardsV1Encoding, encoded);

  return {
    rewardsContract,
  };
}
