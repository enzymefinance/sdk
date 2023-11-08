import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "./Utils.js";

export async function getNav(
  client: PublicClient,
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

export async function getNavInAsset(
  client: PublicClient,
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

export async function getGav(
  client: PublicClient,
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

export async function getGavInAsset(
  client: PublicClient,
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

export async function getSharePrice(
  client: PublicClient,
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

export async function getSharePriceInAsset(
  client: PublicClient,
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
