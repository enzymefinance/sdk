import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
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

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - MAPLE POOL
//--------------------------------------------------------------------------------------------

export async function getMaxDeposit(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
    receiver: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function maxDeposit(address receiver) view returns (uint256)"]),
    functionName: "maxDeposit",
    address: args.pool,
    args: [args.receiver],
  });
}

export async function getTotalAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function totalAssets() view returns (uint256)"]),
    functionName: "totalAssets",
    address: args.pool,
  });
}

export async function getUnrealizedLosses(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function unrealizedLosses() view returns (uint256)"]),
    functionName: "unrealizedLosses",
    address: args.pool,
  });
}

export async function getSharesConvertedToExitAssets(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
    shares: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function convertToExitAssets(uint256 shares) view returns (uint256)"]),
    functionName: "convertToExitAssets",
    address: args.pool,
    args: [args.shares],
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - POOL MANAGER
//--------------------------------------------------------------------------------------------

export async function getWithdrawalManager(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    poolManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function withdrawalManager() view returns (address)"]),
    functionName: "withdrawalManager",
    address: args.poolManager,
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - WITHDRAWAL MANAGER
//--------------------------------------------------------------------------------------------

export async function getLockedShares(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    withdrawalManager: Address;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function lockedShares(address user) view returns (uint256)"]),
    functionName: "lockedShares",
    address: args.withdrawalManager,
    args: [args.user],
  });
}

export async function getCurrentCycleId(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    withdrawalManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getCurrentCycleId() view returns (uint256)"]),
    functionName: "getCurrentCycleId",
    address: args.withdrawalManager,
  });
}

export async function getWindowAtId(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    withdrawalManager: Address;
    cycleId: bigint;
  }>,
) {
  const [windowStart, windowEnd] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getWindowAtId(uint256 cycleId) view returns (uint256 windowStart, uint256 windowEnd)"]),
    functionName: "getWindowAtId",
    address: args.withdrawalManager,
    args: [args.cycleId],
  });

  return { windowStart, windowEnd };
}

export async function getExitCycleId(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    withdrawalManager: Address;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function exitCycleId(address user) view returns (uint256)"]),
    functionName: "exitCycleId",
    address: args.withdrawalManager,
    args: [args.user],
  });
}

export async function getRedemptionPreview(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    withdrawalManager: Address;
    user: Address;
    shares: bigint;
  }>,
) {
  const [redeemableShares, resultingAssets] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function previewRedeem(address user, uint256 shares) view returns (uint256 redeemableShares, uint256 resultingAssets)",
    ]),
    functionName: "previewRedeem",
    address: args.withdrawalManager,
    args: [args.user, args.shares],
  });

  return { redeemableShares, resultingAssets };
}
