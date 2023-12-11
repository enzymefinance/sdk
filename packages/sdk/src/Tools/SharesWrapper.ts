import * as Abis from "@enzymefinance/abis";
import type { Address } from "viem";
import { Viem } from "../Utils.js";

export function setUseDepositApprovals(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    useApproval: boolean;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setUseDepositApprovals",
    address: args.sharesWrapper,
    args: [args.useApproval],
  });
}

export function setUseRedemptionApprovals(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    useApproval: boolean;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setUseRedemptionApprovals",
    address: args.sharesWrapper,
    args: [args.useApproval],
  });
}

export function setUseTransferApprovals(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    useApproval: boolean;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setUseTransferApprovals",
    address: args.sharesWrapper,
    args: [args.useApproval],
  });
}

export function kickDepositor(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    depositor: Address;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "kick",
    address: args.sharesWrapper,
    args: [args.depositor],
  });
}

export function forceTransfer(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    sender: Address;
    recipient: Address;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "forceTransfer",
    address: args.sharesWrapper,
    args: [args.sender, args.recipient],
  });
}

export function setDepositApprovals(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    depositors: Address[];
    assets: Address[];
    amounts: bigint[];
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setDepositApprovals",
    address: args.sharesWrapper,
    args: [args.depositors, args.assets, args.amounts],
  });
}

export function setRedemptionApprovals(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    depositors: Address[];
    amounts: bigint[];
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setRedemptionApprovals",
    address: args.sharesWrapper,
    args: [args.depositors, args.amounts],
  });
}

export function setTransferApprovals(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    senders: Address[];
    recipients: Address[];
    amounts: bigint[];
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "setTransferApprovals",
    address: args.sharesWrapper,
    args: [args.senders, args.recipients, args.amounts],
  });
}

export function depositFromQueue(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    asset: Address;
    depositors: Address[];
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "depositFromQueue",
    address: args.sharesWrapper,
    args: [args.asset, args.depositors],
  });
}

export function depositAllFromQueue(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    asset: Address;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "depositAllFromQueue",
    address: args.sharesWrapper,
    args: [args.asset],
  });
}

export function addManagers(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    managers: Address[];
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "addManagers",
    address: args.sharesWrapper,
    args: [args.managers],
  });
}

export function removeManagers(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    managers: Address[];
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "removeManagers",
    address: args.sharesWrapper,
    args: [args.managers],
  });
}

export function redeemFromQueue(
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    startIndex: bigint;
    lastIndex: bigint;
  }>,
) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "redeemFromQueue",
    address: args.sharesWrapper,
    args: [args.startIndex, args.lastIndex],
  });
}
