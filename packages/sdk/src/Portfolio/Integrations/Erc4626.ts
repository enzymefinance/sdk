import { type Address, type Hex, PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

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

const redeemSelector = "0xc29fa9dd"; // redeem(address,bytes,bytes)
export const redeem = IntegrationManager.makeUse(redeemSelector, redeemEncode);

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
// EXTERNAL READ FUNCTIONS - MAKER
//--------------------------------------------------------------------------------------------

export async function getMakerDsr(
  client: PublicClient,
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

export async function getMorphoPoolToken(
  client: PublicClient,
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
