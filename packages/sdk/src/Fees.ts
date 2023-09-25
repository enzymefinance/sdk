import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import type { Address, PublicClient } from "viem";

export * as Fees from "@enzymefinance/sdk/internal/Extensions/Fees";

export {
  payoutOutstandingFees,
  type PayoutOutstandingFeesParams,
  settleContinuousFees,
  type SettleContinuousFeesParams,
} from "@enzymefinance/sdk/internal/FeeManager";

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
