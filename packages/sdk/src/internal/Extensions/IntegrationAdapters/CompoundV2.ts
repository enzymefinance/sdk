import { Viem } from "@enzymefinance/sdk/Utils";
import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

const lendEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    name: "minCTokenAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  cToken: Address;
  depositAmount: bigint;
  minCTokenAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.cToken, args.depositAmount, args.minCTokenAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [cToken, depositAmount, minCTokenAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    cToken,
    depositAmount,
    minCTokenAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

const redeemSelector = "0xc29fa9dd"; // redeem(address,bytes,bytes)
export const redeem = IntegrationManager.makeUse(redeemSelector, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "cToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
  {
    name: "minUnderlyingAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  cToken: Address;
  redeemAmount: bigint;
  minUnderlyingAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.cToken, args.redeemAmount, args.minUnderlyingAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [cToken, redeemAmount, minUnderlyingAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { cToken, redeemAmount, minUnderlyingAmount };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL CONTRACT METHODS
//--------------------------------------------------------------------------------------------

const exchangeRateStoredAbi = {
  constant: true,
  inputs: [],
  name: "exchangeRateStored",
  outputs: [{ name: "", type: "uint256" }],
  payable: false,
  stateMutability: "view",
  type: "function",
} as const;

export function getCerc20ExchangeRateStored(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    cToken: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: [exchangeRateStoredAbi],
    functionName: "exchangeRateStored",
    address: args.cToken,
  });
}
