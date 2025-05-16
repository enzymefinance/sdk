import { IDerivativePriceFeed, IValueInterpreter } from "@enzymefinance/abis";
import { type Address, type Client, parseAbi } from "viem";
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

export function getEthUsdAggregator(
  client: Client,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IValueInterpreter,
    functionName: "getEthUsdAggregator",
    address: args.valueInterpreter,
  });
}

export async function getLatestRoundData(
  client: Client,
  args: Viem.ContractCallParameters<{
    aggregator: Address;
  }>,
) {
  const [roundId, answer, startedAt, updatedAt, answeredInRound] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function latestRoundData() external view returns (uint80 roundId_, int256 answer_, uint256 startedAt_, uint256 updatedAt_, uint80 answeredInRound_)",
    ]),
    functionName: "latestRoundData",
    address: args.aggregator,
  });

  return {
    roundId,
    answer,
    startedAt,
    updatedAt,
    answeredInRound,
  };
}
