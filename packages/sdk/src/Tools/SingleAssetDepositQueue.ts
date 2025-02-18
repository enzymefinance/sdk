import * as Abis from "@enzymefinance/abis";
import { type Address, type Client, encodeFunctionData } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// DEPLOYMENT HELPERS
//--------------------------------------------------------------------------------------------

export function encodeProxyConstructData(args: {
  vaultProxy: Address;
  depositAsset: Address;
  managers: ReadonlyArray<Address>;
  minDepositAssetAmount: bigint;
  minRequestTime: bigint;
  depositorAllowlistId: bigint;
}) {
  return encodeFunctionData({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "init",
    args: [
      args.vaultProxy,
      args.depositAsset,
      args.managers,
      args.minDepositAssetAmount,
      args.minRequestTime,
      args.depositorAllowlistId,
    ],
  });
}

//--------------------------------------------------------------------------------------------
// DEPOSITOR TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function requestDeposit(args: {
  depositQueue: Address;
  assetAmount: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "requestDeposit",
    address: args.depositQueue,
    args: [args.assetAmount],
  });
}

export function cancelRequest(args: {
  depositQueue: Address;
  requestId: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "cancelRequest",
    address: args.depositQueue,
    args: [args.requestId],
  });
}

//--------------------------------------------------------------------------------------------
// MANAGER TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function depositFromQueue(args: {
  depositQueue: Address;
  endId: bigint;
  idsToBypass: ReadonlyArray<bigint>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "depositFromQueue",
    address: args.depositQueue,
    args: [args.endId, args.idsToBypass],
  });
}

//--------------------------------------------------------------------------------------------
// OWNER TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function addManagers(args: {
  depositQueue: Address;
  managers: ReadonlyArray<Address>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "addManagers",
    address: args.depositQueue,
    args: [args.managers],
  });
}

export function removeManagers(args: {
  depositQueue: Address;
  managers: ReadonlyArray<Address>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "removeManagers",
    address: args.depositQueue,
    args: [args.managers],
  });
}

export function shutdown(args: {
  depositQueue: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "shutdown",
    address: args.depositQueue,
  });
}

export function setMinDepositAssetAmount(args: {
  depositQueue: Address;
  minDepositAssetAmount: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "setMinDepositAssetAmount",
    address: args.depositQueue,
    args: [args.minDepositAssetAmount],
  });
}

export function setMinRequestTime(args: {
  depositQueue: Address;
  minRequestTime: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "setMinRequestTime",
    address: args.depositQueue,
    args: [args.minRequestTime],
  });
}

export function setDepositorAllowlistId(args: {
  depositQueue: Address;
  depositorAllowlistId: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.ISingleAssetDepositQueueLib,
    functionName: "setDepositorAllowlistId",
    address: args.depositQueue,
    args: [args.depositorAllowlistId],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getNextNewId(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "getNextNewId",
  });
}

export function getNextQueuedId(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "getNextQueuedId",
  });
}

export function getDepositAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "getDepositAsset",
  });
}

export function getRequest(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
    requestId: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "getRequest",
    args: [args.requestId],
  });
}

export function getVaultProxy(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "getVaultProxy",
  });
}

export function isManager(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "isManager",
    args: [args.user],
  });
}

export function queueIsShutdown(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "queueIsShutdown",
  });
}

export function getMinRequestTime(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "getMinRequestTime",
  });
}

export function getMinDepositAssetAmount(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "getMinDepositAssetAmount",
  });
}

export function getDepositorAllowlistId(
  client: Client,
  args: Viem.ContractCallParameters<{
    depositQueue: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.ISingleAssetDepositQueueLib,
    address: args.depositQueue,
    functionName: "getDepositorAllowlistId",
  });
}
