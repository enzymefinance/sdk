import {
  type Address,
  Chain,
  type Hex,
  PublicClient,
  Transport,
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbi,
} from "viem";
import { Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

const lendEncoding = [
  {
    name: "tokenAddress",
    type: "address",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  tokenAddress: Address;
  outgoingAssetAmount: bigint;
  minIncomingAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.tokenAddress, args.outgoingAssetAmount, args.minIncomingAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [tokenAddress, outgoingAssetAmount, minIncomingAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    tokenAddress,
    outgoingAssetAmount,
    minIncomingAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    name: "tokenAddress",
    type: "address",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  tokenAddress: Address;
  outgoingAssetAmount: bigint;
  minIncomingAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.tokenAddress, args.outgoingAssetAmount, args.minIncomingAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [tokenAddress, outgoingAssetAmount, minIncomingAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { tokenAddress, outgoingAssetAmount, minIncomingAmount };
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function convertToAssets<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    asset: Address;
    sharesAmount: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function convertToAssets(uint256 sharesAmount) view returns (uint256 assetAmount)"]),
    functionName: "convertToAssets",
    address: args.asset,
    args: [args.sharesAmount],
  });
}

export async function convertToShares<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    asset: Address;
    assetAmount: bigint;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function convertToShares(uint256 assetAmount) view returns (uint256 sharesAmount)"]),
    functionName: "convertToShares",
    address: args.asset,
    args: [args.assetAmount],
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - MAKER
//--------------------------------------------------------------------------------------------

export async function getMakerDsr<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function dsr() view returns (uint256 dsr_)"]),
    functionName: "dsr",
    address: args.asset,
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - MORPHO
//--------------------------------------------------------------------------------------------

export async function getMorphoPoolToken<TChain extends Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function poolToken() view returns (address poolToken_)"]),
    functionName: "poolToken",
    address: args.asset,
  });
}
