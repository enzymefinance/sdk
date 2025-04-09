import * as Abis from "@enzymefinance/abis";
import type { Address, Client } from "viem";
import { readContract, simulateContract } from "viem/actions";
import { Viem } from "../Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export type SetAutoProtocolFeeSharesBuybackParams = {
  comptrollerProxy: Address;
  enabled: boolean;
};

export function setAutoProtocolFeeSharesBuyback(args: SetAutoProtocolFeeSharesBuybackParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "setAutoProtocolFeeSharesBuyback",
    address: args.comptrollerProxy,
    args: [args.enabled],
  });
}

export type BuyBackProtocolFeeSharesParams = {
  comptrollerProxy: Address;
  sharesAmount: bigint;
};

export function buyBackProtocolFeeShares(args: BuyBackProtocolFeeSharesParams) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "buyBackProtocolFeeShares",
    address: args.comptrollerProxy,
    args: [args.sharesAmount],
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function getProtocolFeeRate(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    protocolFeeTracker: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IProtocolFeeTracker,
    functionName: "getFeeBpsForVault",
    address: args.protocolFeeTracker,
    args: [args.vaultProxy],
  });
}

export function getDefaultProtocolFeeRate(
  client: Client,
  args: Viem.ContractCallParameters<{
    protocolFeeTracker: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IProtocolFeeTracker,
    functionName: "getFeeBpsDefault",
    address: args.protocolFeeTracker,
  });
}

export async function getAccruedProtocolFee(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    protocolFeeTracker: Address;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IProtocolFeeTracker,
    functionName: "payFee",
    address: args.protocolFeeTracker,
    account: args.vaultProxy,
  });

  return result;
}

export function doesAutoProtocolFeeSharesBuyback(
  client: Client,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IComptrollerLib,
    functionName: "doesAutoProtocolFeeSharesBuyback",
    address: args.comptrollerProxy,
  });
}

export async function getMlnValueAndBurnAmountForSharesBuyback(
  client: Client,
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
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: Abis.IVaultLib,
      functionName: "totalSupply",
      address: args.vaultProxy,
    }),
    simulateContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: Abis.IComptrollerLib,
      functionName: "calcGav",
      address: args.comptrollerProxy,
    }),
  ]);

  const denominationValue = (gav * args.buybackSharesAmount) / sharesSupply;

  const { result: mlnValueOfBuyback } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IValueInterpreter,
    functionName: "calcCanonicalAssetValue",
    address: args.valueInterpreter,
    args: [args.denominationAsset, denominationValue, args.mln],
  });

  // 50% discount
  const mlnAmountToBurn = mlnValueOfBuyback / 2n;

  return { mlnAmountToBurn, mlnValue: mlnValueOfBuyback };
}
