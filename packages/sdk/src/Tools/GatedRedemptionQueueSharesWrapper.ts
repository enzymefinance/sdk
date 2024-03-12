import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export type DepositMode = (typeof DepositMode)[keyof typeof DepositMode];
export const DepositMode = {
  Direct: 0,
  Request: 1,
} as const;

export type RedemptionWindowConfig = {
  firstWindowStart: bigint;
  duration: number;
  frequency: number;
  relativeSharesCap: bigint;
};

export function deploy(args: {
  sharesWrapperFactory: Address;
  vaultProxy: Address;
  managers: ReadonlyArray<Address>;
  redemptionAsset: Address;
  useDepositApproval: boolean;
  useRedemptionApproval: boolean;
  useTransferApproval: boolean;
  depositMode: DepositMode;
  windowConfig: RedemptionWindowConfig;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperFactory,
    functionName: "deploy",
    address: args.sharesWrapperFactory,
    args: [
      args.vaultProxy,
      args.managers,
      args.redemptionAsset,
      args.useDepositApproval,
      args.useRedemptionApproval,
      args.useTransferApproval,
      args.depositMode,
      args.windowConfig,
    ],
  });
}

export function setUseDepositApprovals(args: {
  sharesWrapper: Address;
  useApproval: boolean;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setUseDepositApprovals",
    address: args.sharesWrapper,
    args: [args.useApproval],
  });
}

export function setUseRedemptionApprovals(args: {
  sharesWrapper: Address;
  useApproval: boolean;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setUseRedemptionApprovals",
    address: args.sharesWrapper,
    args: [args.useApproval],
  });
}

export function setUseTransferApprovals(args: {
  sharesWrapper: Address;
  useApproval: boolean;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setUseTransferApprovals",
    address: args.sharesWrapper,
    args: [args.useApproval],
  });
}

export function kickDepositor(args: {
  sharesWrapper: Address;
  depositor: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "kick",
    address: args.sharesWrapper,
    args: [args.depositor],
  });
}

export function forceTransfer(args: {
  sharesWrapper: Address;
  sender: Address;
  recipient: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "forceTransfer",
    address: args.sharesWrapper,
    args: [args.sender, args.recipient],
  });
}

export function setDepositApprovals(args: {
  sharesWrapper: Address;
  depositors: ReadonlyArray<Address>;
  assets: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setDepositApprovals",
    address: args.sharesWrapper,
    args: [args.depositors, args.assets, args.amounts],
  });
}

export function setRedemptionApprovals(args: {
  sharesWrapper: Address;
  depositors: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setRedemptionApprovals",
    address: args.sharesWrapper,
    args: [args.depositors, args.amounts],
  });
}

export function setTransferApprovals(args: {
  sharesWrapper: Address;
  senders: ReadonlyArray<Address>;
  recipients: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setTransferApprovals",
    address: args.sharesWrapper,
    args: [args.senders, args.recipients, args.amounts],
  });
}

export function depositFromQueue(args: {
  sharesWrapper: Address;
  asset: Address;
  depositors: ReadonlyArray<Address>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "depositFromQueue",
    address: args.sharesWrapper,
    args: [args.asset, args.depositors],
  });
}

export function depositAllFromQueue(args: {
  sharesWrapper: Address;
  asset: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "depositAllFromQueue",
    address: args.sharesWrapper,
    args: [args.asset],
  });
}

export function addManagers(args: {
  sharesWrapper: Address;
  managers: ReadonlyArray<Address>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "addManagers",
    address: args.sharesWrapper,
    args: [args.managers],
  });
}

export function removeManagers(args: {
  sharesWrapper: Address;
  managers: ReadonlyArray<Address>;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "removeManagers",
    address: args.sharesWrapper,
    args: [args.managers],
  });
}

export function redeemFromQueue(args: {
  sharesWrapper: Address;
  startIndex: bigint;
  lastIndex: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "redeemFromQueue",
    address: args.sharesWrapper,
    args: [args.startIndex, args.lastIndex],
  });
}

export function setDepositMode(args: {
  sharesWrapper: Address;
  depositMode: DepositMode;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setDepositMode",
    address: args.sharesWrapper,
    args: [args.depositMode],
  });
}

export function setRedemptionWindowConfig(args: {
  sharesWrapper: Address;
  windowConfig: RedemptionWindowConfig;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setRedemptionWindowConfig",
    address: args.sharesWrapper,
    args: [args.windowConfig],
  });
}

export function setRedemptionAsset(args: {
  sharesWrapper: Address;
  asset: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setRedemptionAsset",
    address: args.sharesWrapper,
    args: [args.asset],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getDepositQueueUser(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    depositAsset: Address;
    user: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getDepositQueueUserRequest",
    address: args.sharesWrapper,
    args: [args.depositAsset, args.user],
  });
}

export function getRedemptionQueueUsers(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sharesWrapperId: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getRedemptionQueueUsers",
    address: args.sharesWrapperId,
  });
}

export async function getRedemptionQueueUsersLength(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sharesWrapperId: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "getRedemptionQueueUsersLength",
    address: args.sharesWrapperId,
  });
}
