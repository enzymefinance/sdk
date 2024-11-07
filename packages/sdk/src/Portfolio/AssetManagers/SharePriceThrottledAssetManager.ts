import { ISharePriceThrottledAssetManagerFactory, ISharePriceThrottledAssetManagerLib } from "@enzymefinance/abis";
import type { Address, Client, Hex } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// FACTORY
//--------------------------------------------------------------------------------------------

export function deployProxy(args: {
  sharePriceThrottledAssetManagerFactory: Address;
  owner: Address;
  vaultProxyAddress: Address;
  lossTolerance: bigint;
  lossTolerancePeriodDuration: number;
  shutdowner: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: ISharePriceThrottledAssetManagerFactory,
    functionName: "deployProxy",
    address: args.sharePriceThrottledAssetManagerFactory,
    args: [args.owner, args.vaultProxyAddress, args.lossTolerance, args.lossTolerancePeriodDuration, args.shutdowner],
  });
}

//--------------------------------------------------------------------------------------------
// LIB
//--------------------------------------------------------------------------------------------

export function executeCalls(args: {
  sharePriceThrottledAssetManager: Address;
  calls: ReadonlyArray<{
    target: Address;
    data: Hex;
  }>;
}) {
  return new Viem.PopulatedTransaction({
    abi: ISharePriceThrottledAssetManagerLib,
    functionName: "executeCalls",
    address: args.sharePriceThrottledAssetManager,
    args: [args.calls],
  });
}

export function shutdown(args: {
  sharePriceThrottledAssetManager: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: ISharePriceThrottledAssetManagerLib,
    functionName: "shutdown",
    address: args.sharePriceThrottledAssetManager,
  });
}

export function getLossTolerance(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharePriceThrottledAssetManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ISharePriceThrottledAssetManagerLib,
    functionName: "getLossTolerance",
    address: args.sharePriceThrottledAssetManager,
  });
}

export function getLossTolerancePeriodDuration(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharePriceThrottledAssetManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ISharePriceThrottledAssetManagerLib,
    functionName: "getLossTolerancePeriodDuration",
    address: args.sharePriceThrottledAssetManager,
  });
}

export function getShutdowner(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharePriceThrottledAssetManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ISharePriceThrottledAssetManagerLib,
    functionName: "getShutdowner",
    address: args.sharePriceThrottledAssetManager,
  });
}

export function getThrottle(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharePriceThrottledAssetManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ISharePriceThrottledAssetManagerLib,
    functionName: "getThrottle",
    address: args.sharePriceThrottledAssetManager,
  });
}

export function getVaultProxyAddress(
  client: Client,
  args: Viem.ContractCallParameters<{
    sharePriceThrottledAssetManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: ISharePriceThrottledAssetManagerLib,
    functionName: "getVaultProxyAddress",
    address: args.sharePriceThrottledAssetManager,
  });
}
