import * as ExternalPositionManager from "@enzymefinance/sdk/internal/ExternalPositionManager";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  OpenTrove: 0n,
  AddCollateral: 1n,
  RemoveCollateral: 2n,
  Borrow: 3n,
  RepayBorrow: 4n,
  CloseTrove: 5n,
} as const;

export const create = ExternalPositionManager.createOnly;

// --------------------------------------------------------------------------------------------
// OPEN TROVE
// --------------------------------------------------------------------------------------------

export const openTrove = ExternalPositionManager.makeUse(Action.OpenTrove, openTroveEncode);
export const createAndOpenTrove = ExternalPositionManager.makeCreateAndUse(Action.OpenTrove, openTroveEncode);

const openTroveEncoding = [
  {
    name: "maxFeePercentage",
    type: "uint256",
  },
  {
    name: "collateralAmount",
    type: "uint256",
  },
  {
    name: "lusdAmount",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type OpenTroveArgs = {
  collateralAmount: bigint;
  lusdAmount: bigint;
  maxFeePercentage: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function openTroveEncode(args: OpenTroveArgs): Hex {
  return encodeAbiParameters(openTroveEncoding, [
    args.maxFeePercentage,
    args.collateralAmount,
    args.lusdAmount,
    args.upperHint,
    args.lowerHint,
  ]);
}

export function openTroveDecode(encoded: Hex): OpenTroveArgs {
  const [maxFeePercentage, collateralAmount, lusdAmount, upperHint, lowerHint] = decodeAbiParameters(
    openTroveEncoding,
    encoded,
  );

  return {
    maxFeePercentage,
    collateralAmount,
    lusdAmount,
    upperHint,
    lowerHint,
  };
}

// --------------------------------------------------------------------------------------------
// ADD COLLATERAL
// --------------------------------------------------------------------------------------------

export const addCollateral = ExternalPositionManager.makeUse(Action.AddCollateral, addCollateralEncode);
export const createAndAddCollateral = ExternalPositionManager.makeCreateAndUse(
  Action.AddCollateral,
  addCollateralEncode,
);

const addCollateralEncoding = [
  {
    name: "collateralAmount",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type AddCollateralArgs = {
  collateralAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(addCollateralEncoding, [args.collateralAmount, args.upperHint, args.lowerHint]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [collateralAmount, upperHint, lowerHint] = decodeAbiParameters(addCollateralEncoding, encoded);

  return {
    collateralAmount,
    upperHint,
    lowerHint,
  };
}

// --------------------------------------------------------------------------------------------
// REMOVE COLLATERAL
// --------------------------------------------------------------------------------------------

export const removeCollateral = ExternalPositionManager.makeUse(Action.RemoveCollateral, removeCollateralEncode);

const removeCollateralEncoding = [
  {
    name: "collateralAmount",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type RemoveCollateralArgs = {
  collateralAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(removeCollateralEncoding, [args.collateralAmount, args.upperHint, args.lowerHint]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [collateralAmount, upperHint, lowerHint] = decodeAbiParameters(removeCollateralEncoding, encoded);

  return {
    collateralAmount,
    upperHint,
    lowerHint,
  };
}

// --------------------------------------------------------------------------------------------
// BORROW
// --------------------------------------------------------------------------------------------

export const borrow = ExternalPositionManager.makeUse(Action.Borrow, borrowEncode);
export const createAndBorrow = ExternalPositionManager.makeCreateAndUse(Action.Borrow, borrowEncode);

const borrowEncoding = [
  {
    name: "lusdAmount",
    type: "uint256",
  },
  {
    name: "maxFeePercentage",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type BorrowArgs = {
  lusdAmount: bigint;
  maxFeePercentage: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function borrowEncode(args: BorrowArgs): Hex {
  return encodeAbiParameters(borrowEncoding, [args.maxFeePercentage, args.lusdAmount, args.upperHint, args.lowerHint]);
}

export function borrowDecode(encoded: Hex): BorrowArgs {
  const [maxFeePercentage, lusdAmount, upperHint, lowerHint] = decodeAbiParameters(borrowEncoding, encoded);

  return {
    maxFeePercentage,
    lusdAmount,
    upperHint,
    lowerHint,
  };
}

// --------------------------------------------------------------------------------------------
// REPAY BORROW
// --------------------------------------------------------------------------------------------

export const repayBorrow = ExternalPositionManager.makeUse(Action.RepayBorrow, repayBorrowEncode);

const repayBorrowEncoding = [
  {
    name: "lusdAmount",
    type: "uint256",
  },
  {
    name: "upperHint",
    type: "address",
  },
  {
    name: "lowerHint",
    type: "address",
  },
] as const;

export type RepayBorrowArgs = {
  lusdAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
};

export function repayBorrowEncode(args: RepayBorrowArgs): Hex {
  return encodeAbiParameters(repayBorrowEncoding, [args.lusdAmount, args.upperHint, args.lowerHint]);
}

export function repayBorrowDecode(encoded: Hex): RepayBorrowArgs {
  const [lusdAmount, upperHint, lowerHint] = decodeAbiParameters(repayBorrowEncoding, encoded);

  return {
    lusdAmount,
    upperHint,
    lowerHint,
  };
}
