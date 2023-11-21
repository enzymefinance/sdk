import * as Abis from "@enzymefinance/abis";
import { Address, PublicClient } from "viem";
import { Viem } from "../Utils.js";

export {
  Action,
  encodeSettings,
  decodeSettings,
  type SettingsArgs,
  payoutOutstandingFees,
  type PayoutOutstandingFeesParams,
  settleContinuousFees,
  type SettleContinuousFeesParams,
} from "../_internal/FeeManager.js";

export function getRecipient(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
    fee: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IFee,
    functionName: "getRecipientForFund",
    args: [args.comptrollerProxy],
    address: args.fee,
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