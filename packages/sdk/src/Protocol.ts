import { IDerivativePriceFeed, IValueInterpreter } from "@enzymefinance/abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "./Utils.js";

export function isSupportedAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IValueInterpreter,
    functionName: "isSupportedAsset",
    address: args.valueInterpreter,
    args: [args.asset],
  });
}

export function isSupportedAssetForDerivativePriceFeed(
  client: Client,
  args: Viem.ContractCallParameters<{
    derivativePriceFeed: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IDerivativePriceFeed,
    functionName: "isSupportedAsset",
    address: args.derivativePriceFeed,
    args: [args.asset],
  });
}

export function isSupportedPrimitiveAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IValueInterpreter,
    functionName: "isSupportedPrimitiveAsset",
    address: args.valueInterpreter,
    args: [args.asset],
  });
}

export function isSupportedDerivativeAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IValueInterpreter,
    functionName: "isSupportedDerivativeAsset",
    address: args.valueInterpreter,
    args: [args.asset],
  });
}

export function getAggregatorForPrimitive(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IValueInterpreter,
    functionName: "getAggregatorForPrimitive",
    address: args.valueInterpreter,
    args: [args.asset],
  });
}

export function getRateAssetForPrimitive(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IValueInterpreter,
    functionName: "getRateAssetForPrimitive",
    address: args.valueInterpreter,
    args: [args.asset],
  });
}

export function getPriceFeedForDerivative(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IValueInterpreter,
    functionName: "getPriceFeedForDerivative",
    address: args.valueInterpreter,
    args: [args.asset],
  });
}
