import * as Abis from "@enzymefinance/abis";
import { Address, PublicClient, isAddressEqual } from "viem";
import { getInfo } from "./Configuration/Fees/Performance.js";
import { Viem } from "./Utils.js";

export * as Fee from "./Configuration/Fee.js";
export * as Fees from "./Configuration/Fees.js";

export * as Policy from "./Configuration/Policy.js";
export * as Policies from "./Configuration/Policies.js";

export async function getEnabledFees(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    feeManager: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IFeeManager,
    functionName: "getEnabledFeesForFund",
    args: [args.comptrollerProxy],
    address: args.feeManager,
  });
}

export async function getAccruedContinuousFees(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    feeManager: Address;
    unpermissionedActionsWrapper: Address;
    managementFee: Address;
    performanceFee: Address;
    comptrollerProxy: Address;
    vaultProxy: Address;
  }>,
) {
  const continuousFees = await Viem.readContract(client, args, {
    abi: Abis.IUnpermissionedActionsWrapper,
    functionName: "getContinuousFeesForFund",
    address: args.unpermissionedActionsWrapper,
    args: [args.comptrollerProxy],
  });

  const hasManagementFee = continuousFees.some((fee) => isAddressEqual(fee, args.managementFee));
  const hasPerformanceFee = continuousFees.some((fee) => isAddressEqual(fee, args.performanceFee));

  let managementFeeSharesDue: bigint | undefined;

  if (hasManagementFee) {
    const {
      result: [_, __, sharesDue],
    } = await Viem.simulateContract(client, args, {
      abi: Abis.IManagementFee,
      functionName: "settle",
      address: args.managementFee,
      args: [args.comptrollerProxy, args.vaultProxy, 0, "0x", 0n],
      account: args.feeManager,
    });

    managementFeeSharesDue = sharesDue;
  }

  let performanceFeeSharesDue: bigint | undefined;
  let highWaterMark: bigint | undefined;

  if (hasPerformanceFee) {
    const { result: gav } = await Viem.simulateContract(client, args, {
      abi: Abis.IComptrollerLib,
      functionName: "calcGav",
      address: args.comptrollerProxy,
    });

    const {
      result: [_, __, sharesDue],
    } = await Viem.simulateContract(client, args, {
      abi: Abis.IPerformanceFee,
      functionName: "settle",
      address: args.managementFee,
      args: [args.comptrollerProxy, args.vaultProxy, 0, "0x", gav],
      account: args.feeManager,
    });

    performanceFeeSharesDue = sharesDue;

    const performanceFeeInfo = await getInfo(client, {
      performanceFee: args.performanceFee,
      comptrollerProxy: args.comptrollerProxy,
    });

    highWaterMark = performanceFeeInfo.highWaterMark;
  }

  return {
    continuousFees,
    highWaterMark,
    managementFeeSharesDue,
    performanceFeeSharesDue,
  };
}

export async function getEnabledPolicies(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    policyManager: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IPolicyManager,
    functionName: "getEnabledPoliciesForFund",
    address: args.policyManager,
    args: [args.comptrollerProxy],
  });
}
