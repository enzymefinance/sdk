import * as Abis from "@enzymefinance/abis";
import { type Address, type Client, ContractFunctionExecutionError } from "viem";
import { simulateContract } from "viem/actions";
import { Viem } from "./Utils.js";

export async function getNav(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const {
    result: [asset, value],
  } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcNav",
    address: args.valueCalculator,
    args: [args.vaultProxy],
  });

  return { asset, value };
}

export async function getNavInAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcNavInAsset",
    address: args.valueCalculator,
    args: [args.vaultProxy, args.asset],
  });

  return result;
}

export async function getGav(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const {
    result: [asset, value],
  } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcGav",
    address: args.valueCalculator,
    args: [args.vaultProxy],
  });

  return { asset, value };
}

export async function getGavInAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcGavInAsset",
    address: args.valueCalculator,
    args: [args.vaultProxy, args.asset],
  });

  return result;
}

export async function getSharePrice(
  client: Client,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const {
    result: [asset, value],
  } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcNetShareValue",
    address: args.valueCalculator,
    args: [args.vaultProxy],
  });

  return { asset, value };
}

export async function getSharePriceInAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
    vaultProxy: Address;
    valueCalculator: Address;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IFundValueCalculatorRouter,
    functionName: "calcNetShareValueInAsset",
    address: args.valueCalculator,
    args: [args.vaultProxy, args.asset],
  });

  return result;
}

export async function getCanonicalAssetValue(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    baseAsset: Address;
    amount: bigint;
    quoteAsset: Address;
  }>,
) {
  try {
    const { result } = await simulateContract(client, {
      ...Viem.extractBlockParameters(args),
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

export async function calcCanonicalAssetsTotalValue(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    baseAssets: ReadonlyArray<Address>;
    amounts: ReadonlyArray<bigint>;
    quoteAsset: Address;
  }>,
) {
  try {
    const { result } = await simulateContract(client, {
      ...Viem.extractBlockParameters(args),
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
