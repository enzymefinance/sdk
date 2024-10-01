import { IAaveV3FlashLoanAssetManager, IDispatcherOwnedBeaconFactory } from "@enzymefinance/abis";
import { type Address, type Client, type Hex, encodeAbiParameters, encodeFunctionData } from "viem";
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
    abi: IAaveV3FlashLoanAssetManager,
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

const flashLoanCallsEncoding = [
  {
    type: "tuple[]",
    name: "calls",
    components: [
      {
        name: "target",
        type: "address",
      },
      {
        name: "data",
        type: "bytes",
      },
    ],
  },
] as const;

export function encodeFlashLoanCalls(args: {
  calls: ReadonlyArray<{
    target: Address;
    data: Hex;
  }>;
}) {
  return encodeAbiParameters(flashLoanCallsEncoding, [args.calls]);
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
