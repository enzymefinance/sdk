import * as Abis from "@enzymefinance/abis";
import * as Policies from "@enzymefinance/sdk/Policies";
import { Viem } from "@enzymefinance/sdk/Utils";
import type { Address, Hex, PublicClient } from "viem";

/**
 * Get the shares action timelock.
 *
 * @param client The public client to use to read the contract.
 * @returns The shares action timelock in seconds.
 */
export function getSharesActionTimelock(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    address: args.comptrollerProxy,
    functionName: "getSharesActionTimelock",
  });
}

export function getLastSharesBoughtTimestamp(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    depositor: Address;
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "getLastSharesBoughtTimestampForAccount",
    address: args.comptrollerProxy,
    args: [args.depositor],
  });
}

export async function getExpectedSharesForDeposit(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    depositor: Address;
    amount: bigint;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "buyShares",
    address: args.comptrollerProxy,
    account: args.depositor,
    args: [args.amount, 1n],
  });

  return result;
}

export async function getExpectedSharesForNativeTokenDeposit(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    depositWrapper: Address;
    comptrollerProxy: Address;
    minSharesQuantity: bigint;
    exchange: Address;
    exchangeApproveTarget: Address;
    exchangeData: Hex;
    minInvestmentAmount: bigint;
    depositor: Address;
    amount: bigint;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: Abis.IDepositWrapper,
    address: args.depositWrapper,
    functionName: "exchangeEthAndBuyShares",
    args: [
      args.comptrollerProxy,
      args.minSharesQuantity,
      args.exchange,
      args.exchangeApproveTarget,
      args.exchangeData,
      args.minInvestmentAmount,
    ],
    value: args.amount,
    account: args.depositor,
  });

  return result;
}

export async function getExpectedSharesForSharesWrapperDeposit(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    sharesWrapper: Address;
    denominationAsset: Address;
    depositor: Address;
    amount: bigint;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: Abis.IGatedRedemptionQueueSharesWrapperLib,
    functionName: "deposit",
    address: args.sharesWrapper,
    args: [args.denominationAsset, args.amount, 1n],
    account: args.depositor,
  });

  return result;
}

export async function isAllowedDepositor(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    allowedDepositRecipientsPolicy: Address;
    comptrollerProxy: Address;
    policyManager: Address;
    depositor: Address;
  }>,
) {
  const hasAllowedDepositorPolicy = await Policies.isEnabledPolicy(client, {
    ...args,
    policy: args.allowedDepositRecipientsPolicy,
  });

  if (!hasAllowedDepositorPolicy) {
    return true;
  }

  return Viem.readContract(client, args, {
    abi: Abis.IAllowedDepositRecipientsPolicy,
    functionName: "passesRule",
    address: args.allowedDepositRecipientsPolicy,
    args: [args.comptrollerProxy, args.depositor],
  });
}