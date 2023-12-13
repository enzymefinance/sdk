import { type Address, type Hex, PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

const lendEncoding = [
  {
    type: "address",
    name: "yVault",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    name: "minIncomingSharesAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  yVault: Address;
  depositAmount: bigint;
  minIncomingSharesAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.yVault, args.depositAmount, args.minIncomingSharesAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [yVault, depositAmount, minIncomingSharesAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    yVault,
    depositAmount,
    minIncomingSharesAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "yVault",
  },
  {
    name: "maxOutgoingSharesAmount",
    type: "uint256",
  },
  {
    name: "minIncomingUnderlyingAmount",
    type: "uint256",
  },
  {
    name: "slippageToleranceBps",
    type: "uint256",
  },
] as const;

export const Redeem: unique symbol = Symbol.for("@enzyme/integrations/YearnVaultV2/Redeem");

export type RedeemArgs = {
  yVault: Address;
  maxOutgoingSharesAmount: bigint;
  minIncomingUnderlyingAmount: bigint;
  slippageToleranceBps: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [
    args.yVault,
    args.maxOutgoingSharesAmount,
    args.minIncomingUnderlyingAmount,
    args.slippageToleranceBps,
  ]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [yVault, maxOutgoingSharesAmount, minIncomingUnderlyingAmount, slippageToleranceBps] = decodeAbiParameters(
    redeemEncoding,
    encoded,
  );

  return { yVault, maxOutgoingSharesAmount, minIncomingUnderlyingAmount, slippageToleranceBps };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function pricePerShare(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    yearnVault: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function pricePerShare() view returns (uint256 price_)"]),
    functionName: "pricePerShare",
    address: args.yearnVault,
  });
}
