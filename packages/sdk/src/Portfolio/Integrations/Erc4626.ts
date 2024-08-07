import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

const lendEncoding = [
  {
    name: "erc4626Vault",
    type: "address",
  },
  {
    name: "underlyingAssetAmount",
    type: "uint256",
  },
  {
    name: "minIncomingSharesAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  erc4626Vault: Address;
  underlyingAssetAmount: bigint;
  minIncomingSharesAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [
    args.erc4626Vault,
    args.underlyingAssetAmount,
    args.minIncomingSharesAmount,
  ]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [erc4626Vault, underlyingAssetAmount, minIncomingSharesAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    erc4626Vault,
    underlyingAssetAmount,
    minIncomingSharesAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    name: "erc4626Vault",
    type: "address",
  },
  {
    name: "sharesAmount",
    type: "uint256",
  },
  {
    name: "minIncomingUnderlyingAssetAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  erc4626Vault: Address;
  sharesAmount: bigint;
  minIncomingUnderlyingAssetAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [
    args.erc4626Vault,
    args.sharesAmount,
    args.minIncomingUnderlyingAssetAmount,
  ]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [erc4626Vault, sharesAmount, minIncomingUnderlyingAssetAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { erc4626Vault, sharesAmount, minIncomingUnderlyingAssetAmount };
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export function convertToAssets(
  client: Client,
  args: Viem.ContractCallParameters<{
    erc4626Vault: Address;
    sharesAmount: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function convertToAssets(uint256 sharesAmount) view returns (uint256 assetAmount)"]),
    functionName: "convertToAssets",
    address: args.erc4626Vault,
    args: [args.sharesAmount],
  });
}

export function convertToShares(
  client: Client,
  args: Viem.ContractCallParameters<{
    erc4626Vault: Address;
    assetAmount: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function convertToShares(uint256 assetAmount) view returns (uint256 sharesAmount)"]),
    functionName: "convertToShares",
    address: args.erc4626Vault,
    args: [args.assetAmount],
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - MAKER
//--------------------------------------------------------------------------------------------

export function getMakerDsr(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function dsr() view returns (uint256 dsr_)"]),
    functionName: "dsr",
    address: args.asset,
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - MORPHO
//--------------------------------------------------------------------------------------------

export function getMorphoPoolToken(
  client: Client,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function poolToken() view returns (address poolToken_)"]),
    functionName: "poolToken",
    address: args.asset,
  });
}
