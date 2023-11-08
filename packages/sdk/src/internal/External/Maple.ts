import { type Address, type PublicClient, parseAbi } from "viem";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// MAPLE POOL
//--------------------------------------------------------------------------------------------

export async function getMaxDeposit(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
    receiver: Address;
  }>,
) {
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
    abi: parseAbi(["function convertToExitAssets(uint256 shares) view returns (uint256)"]),
    functionName: "convertToExitAssets",
    address: args.pool,
    args: [args.shares],
  });
}

//--------------------------------------------------------------------------------------------
// POOL MANAGER
//--------------------------------------------------------------------------------------------

export async function getWithdrawalManager(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    poolManager: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function withdrawalManager() view returns (address)"]),
    functionName: "withdrawalManager",
    address: args.poolManager,
  });
}

//--------------------------------------------------------------------------------------------
// WITHDRAWAL MANAGER
//--------------------------------------------------------------------------------------------

export async function getLockedShares(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    withdrawalManager: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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
  const [windowStart, windowEnd] = await Viem.readContract(client, args, {
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
  return Viem.readContract(client, args, {
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
  const [redeemableShares, resultingAssets] = await Viem.readContract(client, args, {
    abi: parseAbi([
      "function previewRedeem(address user, uint256 shares) view returns (uint256 redeemableShares, uint256 resultingAssets)",
    ]),
    functionName: "previewRedeem",
    address: args.withdrawalManager,
    args: [args.user, args.shares],
  });

  return { redeemableShares, resultingAssets };
}
