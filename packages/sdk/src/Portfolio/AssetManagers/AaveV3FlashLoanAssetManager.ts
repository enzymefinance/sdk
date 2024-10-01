import { IAaveV3FlashLoanAssetManager, IDispatcherOwnedBeaconFactory } from "@enzymefinance/abis";
import { type Address, type Client, type Hex, encodeAbiParameters, encodeFunctionData, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";

//--------------------------------------------------------------------------------------------
// FACTORY
//--------------------------------------------------------------------------------------------

export function encodeDeployProxyContructData(args: {
  owner: Address;
  borrowedAssetsRecipient: Address;
}) {
  return encodeFunctionData({
    abi: parseAbi(["function init(address owner, address borrowedAssetsRecipient)"]),
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

const flashLoanSingleCallEncoding = [
  {
    type: "address",
    name: "target",
  },
  {
    type: "bytes",
    name: "data",
  },
] as const;

const flashLoanCallsEncoding = [
  {
    type: "bytes[]",
    name: "calls",
  },
] as const;

export function encodeFlashLoanCalls(args: {
  calls: ReadonlyArray<{
    target: Address;
    data: Hex;
  }>;
}) {
  const calls = args.calls.map((call) => encodeAbiParameters(flashLoanSingleCallEncoding, [call.target, call.data]));

  return encodeAbiParameters(flashLoanCallsEncoding, [calls]);
}

export function flashLoan(args: {
  aaveV3FlashLoanAssetManager: Address;
  assets: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  encodedCalls: Hex;
}) {
  return new Viem.PopulatedTransaction({
    abi: IAaveV3FlashLoanAssetManager,
    functionName: "flashLoan",
    address: args.aaveV3FlashLoanAssetManager,
    args: [args.assets, args.amounts, args.encodedCalls],
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
    abi: IAaveV3FlashLoanAssetManager,
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
    abi: IAaveV3FlashLoanAssetManager,
    functionName: "getOwner",
    address: args.aaveV3FlashLoanAssetManager,
  });
}
