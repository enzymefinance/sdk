import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getUnderlyingAssetAddressUpperCase(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ asset: Address }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function UNDERLYING_ASSET_ADDRESS() view returns (address underlying_)"]),
    functionName: "UNDERLYING_ASSET_ADDRESS",
    address: args.asset,
  });
}

export function getUnderlyingAssetAddressLowerCase(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ asset: Address }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function underlyingAssetAddress() view returns (address underlying_)"]),
    functionName: "underlyingAssetAddress",
    address: args.asset,
  });
}
