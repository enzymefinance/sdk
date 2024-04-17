import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// FACTORY
//--------------------------------------------------------------------------------------------

export function deployProxy(args: {
  redemptionQueueFactory: Address;
  vaultProxy: Address;
  redemptionAsset: Address;
  bypassableSharesThreshold: bigint;
  managers: ReadonlyArray<Address>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetRedemptionQueueFactory,
    functionName: "deployProxy",
    address: args.redemptionQueueFactory,
    args: [args.vaultProxy, args.redemptionAsset, args.bypassableSharesThreshold, args.managers],
  });
}

//--------------------------------------------------------------------------------------------
// SHARE HOLDER TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function requestRedeem(args: {
  redemptionQueue: Address;
  sharesAmount: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetRedemptionQueueLib,
    functionName: "requestRedeem",
    address: args.redemptionQueue,
    args: [args.sharesAmount],
  });
}

export function withdrawRequest(args: {
  redemptionQueue: Address;
  requestId: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetRedemptionQueueLib,
    functionName: "withdrawRequest",
    address: args.redemptionQueue,
    args: [args.requestId],
  });
}

//--------------------------------------------------------------------------------------------
// MANAGER TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function redeemFromQueue(args: {
  redemptionQueue: Address;
  endId: bigint;
  idsToBypass: ReadonlyArray<bigint>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetRedemptionQueueLib,
    functionName: "redeemFromQueue",
    address: args.redemptionQueue,
    args: [args.endId, args.idsToBypass],
  });
}

//--------------------------------------------------------------------------------------------
// OWNER TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function addManagers(args: {
  redemptionQueue: Address;
  managers: ReadonlyArray<Address>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetRedemptionQueueLib,
    functionName: "addManagers",
    address: args.redemptionQueue,
    args: [args.managers],
  });
}

export function removeManagers(args: {
  redemptionQueue: Address;
  managers: ReadonlyArray<Address>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetRedemptionQueueLib,
    functionName: "removeManagers",
    address: args.redemptionQueue,
    args: [args.managers],
  });
}

export function setBypassableSharesThreshold(args: {
  redemptionQueue: Address;
  threshold: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetRedemptionQueueLib,
    functionName: "setBypassableSharesThreshold",
    address: args.redemptionQueue,
    args: [args.threshold],
  });
}

export function setRedemptionAsset(args: {
  redemptionQueue: Address;
  redemptionAsset: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetRedemptionQueueLib,
    functionName: "setRedemptionAsset",
    address: args.redemptionQueue,
    args: [args.redemptionAsset],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getBypassableSharesThreshold(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "getBypassableSharesThreshold",
  });
}

export function getNextNewId(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "getNextNewId",
  });
}

export function getNextQueuedId(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "getNextQueuedId",
  });
}

export function getRedemptionAsset(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "getRedemptionAsset",
  });
}

export function getSharesForRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
    requestId: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "getSharesForRequest",
    args: [args.requestId],
  });
}

export function getUserForRequest(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
    requestId: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "getUserForRequest",
    args: [args.requestId],
  });
}

export function getVaultProxy(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "getVaultProxy",
  });
}

export function isManager(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "isManager",
    args: [args.user],
  });
}

export function queueIsShutdown(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    redemptionQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetRedemptionQueueLib,
    address: args.redemptionQueue,
    functionName: "queueIsShutdown",
  });
}
