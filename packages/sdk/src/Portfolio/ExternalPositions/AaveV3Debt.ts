import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  AddCollateral: 0n,
  RemoveCollateral: 1n,
  Borrow: 2n,
  RepayBorrow: 3n,
  SetEMode: 4n,
  SetUseReserveAsCollateral: 5n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// ADD COLLATERAL
//--------------------------------------------------------------------------------------------

export const addCollateral = ExternalPositionManager.makeUse(Action.AddCollateral, addCollateralEncode);
export const createAndAddCollateral = ExternalPositionManager.makeCreateAndUse(
  Action.AddCollateral,
  addCollateralEncode,
);

const addCollateralEncoding = [
  {
    name: "aTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
  {
    name: "fromUnderlying",
    type: "bool",
  },
] as const;

export type AddCollateralArgs = {
  aTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  fromUnderlying: boolean;
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(addCollateralEncoding, [args.aTokens, args.amounts, args.fromUnderlying]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [aTokens, amounts, fromUnderlying] = decodeAbiParameters(addCollateralEncoding, encoded);

  return {
    aTokens,
    amounts,
    fromUnderlying,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE COLLATERAL
//--------------------------------------------------------------------------------------------

export const removeCollateral = ExternalPositionManager.makeUse(Action.RemoveCollateral, removeCollateralEncode);

const removeCollateralEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
  {
    name: "toUnderlying",
    type: "bool",
  },
] as const;

export type RemoveCollateralArgs = {
  aTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  toUnderlying: boolean;
};

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(removeCollateralEncoding, [args.aTokens, args.amounts, args.toUnderlying]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [aTokens, amounts, toUnderlying] = decodeAbiParameters(removeCollateralEncoding, encoded);

  return {
    aTokens,
    amounts,
    toUnderlying,
  };
}

//--------------------------------------------------------------------------------------------
// BORROW
//--------------------------------------------------------------------------------------------

export const borrow = ExternalPositionManager.makeUse(Action.Borrow, borrowEncode);
export const createAndBorrow = ExternalPositionManager.makeCreateAndUse(Action.Borrow, borrowEncode);

const borrowEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type BorrowArgs = {
  underlyingTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function borrowEncode(args: BorrowArgs): Hex {
  return encodeAbiParameters(borrowEncoding, [args.underlyingTokens, args.amounts]);
}

export function borrowDecode(encoded: Hex): BorrowArgs {
  const [underlyingTokens, amounts] = decodeAbiParameters(borrowEncoding, encoded);

  return {
    underlyingTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// REPAY BORROW
//--------------------------------------------------------------------------------------------

export const repayBorrow = ExternalPositionManager.makeUse(Action.RepayBorrow, repayBorrowEncode);

const repayBorrowEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type RepayBorrowArgs = {
  underlyingTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function repayBorrowEncode(args: RepayBorrowArgs): Hex {
  return encodeAbiParameters(repayBorrowEncoding, [args.underlyingTokens, args.amounts]);
}

export function repayBorrowDecode(encoded: Hex): RepayBorrowArgs {
  const [underlyingTokens, amounts] = decodeAbiParameters(repayBorrowEncoding, encoded);

  return {
    underlyingTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// SET E-MODE
//--------------------------------------------------------------------------------------------

export const setEMode = ExternalPositionManager.makeUse(Action.SetEMode, setEModeEncode);

const setEModeEncoding = [
  {
    name: "categoryId",
    type: "uint8",
  },
] as const;

export type SetEModeArgs = {
  categoryId: number;
};

export function setEModeEncode(args: SetEModeArgs): Hex {
  return encodeAbiParameters(setEModeEncoding, [args.categoryId]);
}

export function setEModeDecode(encoded: Hex): SetEModeArgs {
  const [categoryId] = decodeAbiParameters(setEModeEncoding, encoded);

  return {
    categoryId,
  };
}

//--------------------------------------------------------------------------------------------
// SET USE RESERVE AS COLLATERAL
//--------------------------------------------------------------------------------------------

export const setUseReserveAsCollateral = ExternalPositionManager.makeUse(
  Action.SetUseReserveAsCollateral,
  setUseReserveAsCollateralEncode,
);

const setUseReserveAsCollateralEncoding = [
  {
    name: "underlying",
    type: "address",
  },
  {
    name: "useAsCollateral",
    type: "bool",
  },
] as const;

export type SetUseReserveAsCollateralArgs = {
  underlying: Address;
  useAsCollateral: boolean;
};

export function setUseReserveAsCollateralEncode(args: SetUseReserveAsCollateralArgs): Hex {
  return encodeAbiParameters(setUseReserveAsCollateralEncoding, [args.underlying, args.useAsCollateral]);
}

export function setUseReserveAsCollateralDecode(encoded: Hex): SetUseReserveAsCollateralArgs {
  const [underlying, useAsCollateral] = decodeAbiParameters(setUseReserveAsCollateralEncoding, encoded);

  return {
    underlying,
    useAsCollateral,
  };
}
