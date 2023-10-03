import * as Abis from "@enzymefinance/abis";
import { Viem } from "@enzymefinance/sdk/Utils";
import * as ExternalPositionManager from "@enzymefinance/sdk/internal/ExternalPositionManager";
import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  AddCollateral: 0n,
  RemoveCollateral: 1n,
  Borrow: 2n,
  RepayBorrow: 3n,
  ClaimComp: 4n,
} as const;

const commonEncoding = [
  {
    name: "tokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
  {
    name: "data",
    type: "bytes",
  },
] as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// ADD COLLATERAL
//--------------------------------------------------------------------------------------------

export const addCollateral = ExternalPositionManager.makeUse(Action.AddCollateral, addCollateralEncode);
export const createAndAddCollateral = ExternalPositionManager.makeCreateAndUse(
  Action.AddCollateral,
  addCollateralEncode,
);

export type AddCollateralArgs = {
  cTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(commonEncoding, [args.cTokens, args.amounts, "0x"]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [cTokens, amounts] = decodeAbiParameters(commonEncoding, encoded);

  return {
    cTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE COLLATERAL
//--------------------------------------------------------------------------------------------

export const removeCollateral = ExternalPositionManager.makeUse(Action.RemoveCollateral, removeCollateralEncode);

export type RemoveCollateralArgs = AddCollateralArgs;

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(commonEncoding, [args.cTokens, args.amounts, "0x"]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [cTokens, amounts] = decodeAbiParameters(commonEncoding, encoded);

  return {
    cTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// BORROW
//--------------------------------------------------------------------------------------------

export const borrow = ExternalPositionManager.makeUse(Action.Borrow, borrowEncode);
export const createAndBorrow = ExternalPositionManager.makeCreateAndUse(Action.Borrow, borrowEncode);

export type BorrowArgs = {
  cTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  underlyingTokens: ReadonlyArray<Address>;
};

const dataEncoding = [{ name: "cTokens", type: "address[]" }] as const;

export function borrowEncode(args: BorrowArgs): Hex {
  const data = encodeAbiParameters(dataEncoding, [args.cTokens]);
  return encodeAbiParameters(commonEncoding, [args.underlyingTokens, args.amounts, data]);
}

export function borrowDecode(encoded: Hex): BorrowArgs {
  const [underlyingTokens, amounts, data] = decodeAbiParameters(commonEncoding, encoded);
  const [cTokens] = decodeAbiParameters(dataEncoding, data);

  return {
    underlyingTokens,
    amounts,
    cTokens,
  };
}

//--------------------------------------------------------------------------------------------
// REPAY BORROW
//--------------------------------------------------------------------------------------------

export const repayBorrow = ExternalPositionManager.makeUse(Action.RepayBorrow, repayBorrowEncode);

export type RepayBorrowArgs = BorrowArgs;

export function repayBorrowEncode(args: RepayBorrowArgs): Hex {
  const data = encodeAbiParameters(dataEncoding, [args.cTokens]);
  return encodeAbiParameters(commonEncoding, [args.underlyingTokens, args.amounts, data]);
}

export function repayBorrowDecode(encoded: Hex): RepayBorrowArgs {
  const [underlyingTokens, amounts, data] = decodeAbiParameters(commonEncoding, encoded);
  const [cTokens] = decodeAbiParameters(dataEncoding, data);

  return {
    underlyingTokens,
    cTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM COMP
//--------------------------------------------------------------------------------------------

export const claimComp = ExternalPositionManager.makeUse(Action.ClaimComp);

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export function getCTokenFromBorrowedAsset(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    externalPositionProxy: Address;
    borrowedAsset: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.ICompoundDebtPositionLib,
    functionName: "getCTokenFromBorrowedAsset",
    address: args.externalPositionProxy,
    args: [args.borrowedAsset],
  });
}
