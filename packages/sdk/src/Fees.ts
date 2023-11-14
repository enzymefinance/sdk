import * as Abis from "@enzymefinance/abis";
import { type Address, type PublicClient, isAddressEqual } from "viem";
import { Viem } from "./Utils.js";
import { getInfo } from "./internal/Extensions/Fees/Performance.js";

export * as Fees from "./internal/Extensions/Fees.js";
export * as FeeManager from "./internal/FeeManager.js";

export {
  payoutOutstandingFees,
  type PayoutOutstandingFeesParams,
  settleContinuousFees,
  type SettleContinuousFeesParams,
} from "./internal/FeeManager.js";

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

export function getProtocolFeeRate(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    protocolFeeTracker: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IProtocolFeeTracker,
    functionName: "getFeeBpsForVault",
    address: args.protocolFeeTracker,
    args: [args.vaultProxy],
  });
}

export async function getAccruedProtocolFee(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    protocolFeeTracker: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: Abis.IProtocolFeeTracker,
    functionName: "payFee",
    address: args.protocolFeeTracker,
    account: args.vaultProxy,
  });

  return result;
}

export function doesAutoProtocolFeeSharesBuyback(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "doesAutoProtocolFeeSharesBuyback",
    address: args.comptrollerProxy,
  });
}

export async function getMlnValueAndBurnAmountForSharesBuyback(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    denominationAsset: Address;
    buybackSharesAmount: bigint;
    mln: Address;
    valueInterpreter: Address;
    vaultProxy: Address;
    comptrollerProxy: Address;
  }>,
) {
  const [sharesSupply, { result: gav }] = await Promise.all([
    Viem.readContract(client, args, {
      abi: Abis.IVaultLib,
      functionName: "totalSupply",
      address: args.vaultProxy,
    }),
    Viem.simulateContract(client, args, {
      abi: Abis.IComptrollerLib,
      functionName: "calcGav",
      address: args.comptrollerProxy,
    }),
  ]);

  const denominationValue = (gav * args.buybackSharesAmount) / sharesSupply;

  const { result: mlnValueOfBuyback } = await Viem.simulateContract(client, args, {
    abi: Abis.IValueInterpreter,
    functionName: "calcCanonicalAssetValue",
    address: args.valueInterpreter,
    args: [args.denominationAsset, denominationValue, args.mln],
  });

  // 50% discount
  const mlnAmountToBurn = mlnValueOfBuyback / 2n;

  return { mlnAmountToBurn, mlnValue: mlnValueOfBuyback };
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
