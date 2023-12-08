import * as Abis from "@enzymefinance/abis";
import { type Address, Chain, ContractFunctionExecutionError, type PublicClient, Transport } from "viem";
import { Viem } from "./Utils.js";

export async function getNav<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const {
    result: [asset, value],
  } = await Viem.simulateContract(client, args, {
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcNav",
    address: args.valueCalculator,
    args: [args.vaultProxy],
  });

  return { asset, value };
}

export async function getNavInAsset<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    asset: Address;
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcNavInAsset",
    address: args.valueCalculator,
    args: [args.vaultProxy, args.asset],
  });

  return result;
}

export async function getGav<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const {
    result: [asset, value],
  } = await Viem.simulateContract(client, args, {
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcGav",
    address: args.valueCalculator,
    args: [args.vaultProxy],
  });

  return { asset, value };
}

export async function getGavInAsset<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    asset: Address;
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcGavInAsset",
    address: args.valueCalculator,
    args: [args.vaultProxy, args.asset],
  });

  return result;
}

export async function getSharePrice<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const {
    result: [asset, value],
  } = await Viem.simulateContract(client, args, {
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcNetShareValue",
    address: args.valueCalculator,
    args: [args.vaultProxy],
  });

  return { asset, value };
}

export async function getSharePriceInAsset<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    asset: Address;
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcNetShareValueInAsset",
    address: args.valueCalculator,
    args: [args.vaultProxy, args.asset],
  });

  return result;
}

export async function getCanonicalAssetValue<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    baseAsset: Address;
    amount: bigint;
    quoteAsset: Address;
  }>,
) {
  try {
    const { result } = await Viem.simulateContract(client, args, {
      abi: Abis.IValueInterpreter,
      functionName: "calcCanonicalAssetValue",
      address: args.valueInterpreter,
      args: [args.baseAsset, args.amount, args.quoteAsset],
    });

    return result;
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}

export async function calcCanonicalAssetsTotalValue<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    baseAssets: Address[];
    amounts: bigint[];
    quoteAsset: Address;
  }>,
) {
  try {
    const { result } = await Viem.simulateContract(client, args, {
      abi: Abis.IValueInterpreter,
      functionName: "calcCanonicalAssetsTotalValue",
      address: args.valueInterpreter,
      args: [args.baseAssets, args.amounts, args.quoteAsset],
    });

    return result;
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
