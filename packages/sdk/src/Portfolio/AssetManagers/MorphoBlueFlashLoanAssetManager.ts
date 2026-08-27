import { IDispatcherOwnedBeaconFactory, IMorphoBlueFlashLoanAssetManager } from "@enzymefinance/abis";
import { type Address, type Client, type Hex, encodeFunctionData } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// FACTORY
//--------------------------------------------------------------------------------------------

export function encodeDeployProxyConstructData(args: {
  owner: Address;
  borrowedAssetsRecipient: Address;
}) {
  return encodeFunctionData({
    abi: IMorphoBlueFlashLoanAssetManager,
    functionName: "init",
    args: [args.owner, args.borrowedAssetsRecipient],
  });
}

export function deployProxy(args: {
  dispatcherOwnedBeaconFactory: Address;
  constructData: Hex;
}) {
  return new Viem.PopulatedTransaction({
    abi: IDispatcherOwnedBeaconFactory,
    functionName: "deployProxy",
    address: args.dispatcherOwnedBeaconFactory,
    args: [args.constructData],
  });
}

//--------------------------------------------------------------------------------------------
// LIB
//--------------------------------------------------------------------------------------------

export function flashLoan(args: {
  aaveV3FlashLoanAssetManager: Address;
  asset: Address;
  amount: bigint;
  calls: ReadonlyArray<{ target: Address; data: Hex }>;
}) {
  return new Viem.PopulatedTransaction({
    abi: IMorphoBlueFlashLoanAssetManager,
    functionName: "flashLoan",
    address: args.aaveV3FlashLoanAssetManager,
    args: [args.asset, args.amount, args.calls],
  });
}

export function getBorrowedAssetsRecipient(
  client: Client,
  args: Viem.ContractCallParameters<{
    aaveV3FlashLoanAssetManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IMorphoBlueFlashLoanAssetManager,
    functionName: "getBorrowedAssetsRecipient",
    address: args.aaveV3FlashLoanAssetManager,
  });
}

export function getOwner(
  client: Client,
  args: Viem.ContractCallParameters<{
    aaveV3FlashLoanAssetManager: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: IMorphoBlueFlashLoanAssetManager,
    functionName: "getOwner",
    address: args.aaveV3FlashLoanAssetManager,
  });
}
