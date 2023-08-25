import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type LiquityDebtPositionAction = typeof LiquityDebtPositionAction[keyof typeof LiquityDebtPositionAction];
export const LiquityDebtPositionAction = {
  OpenTrove: 0n,
  AddCollateral: 1n,
  RemoveCollateral: 2n,
  Borrow: 3n,
  RepayBorrow: 4n,
  CloseTrove: 5n,
} as const;

export const liquityDebtPositionOpenTroveArgsEncoding = [
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

export const liquityDebtPositionAddCollateralArgsEncoding = [
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

export const liquityDebtPositionRemoveCollateralArgsEncoding = [
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

export const liquityDebtPositionBorrowArgsEncoding = [
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

export const liquityDebtPositionRepayBorrowArgsEncoding = [
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

export type LiquityDebtPositionOpenTroveArgs = {
  collateralAmount: bigint;
  lusdAmount: bigint;
  maxFeePercentage: bigint;
  lowerHint: Address;
  upperHint: Address;
  externalPositionProxy: Address;
};

export type LiquityDebtPositionAddCollateralArgs = {
  collateralAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
  externalPositionProxy: Address;
};

export type LiquityDebtPositionRemoveCollateralArgs = {
  collateralAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
  externalPositionProxy: Address;
};

export type LiquityDebtPositionBorrowArgs = {
  lusdAmount: bigint;
  maxFeePercentage: bigint;
  lowerHint: Address;
  upperHint: Address;
  externalPositionProxy: Address;
};

export type LiquityDebtPositionRepayBorrowArgs = {
  lusdAmount: bigint;
  lowerHint: Address;
  upperHint: Address;
  externalPositionProxy: Address;
};

export function encodeLiquityDebtPositionOpenTroveArgs({
  externalPositionProxy,
  maxFeePercentage,
  collateralAmount,
  lusdAmount,
  lowerHint,
  upperHint,
}: LiquityDebtPositionOpenTroveArgs): Hex {
  const actionArgs = encodeAbiParameters(liquityDebtPositionOpenTroveArgsEncoding, [
    maxFeePercentage,
    collateralAmount,
    lusdAmount,
    upperHint,
    lowerHint,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: LiquityDebtPositionAction.OpenTrove,
    actionArgs,
  });
}

export function decodeLiquityDebtPositionOpenTroveArgs(callArgs: Hex): LiquityDebtPositionOpenTroveArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [maxFeePercentage, collateralAmount, lusdAmount, upperHint, lowerHint] = decodeAbiParameters(
    liquityDebtPositionOpenTroveArgsEncoding,
    actionArgs,
  );

  return {
    maxFeePercentage,
    collateralAmount,
    lusdAmount,
    upperHint,
    lowerHint,
    externalPositionProxy,
  };
}

export function encodeLiquityDebtPositionAddCollateralArgs({
  externalPositionProxy,
  collateralAmount,
  upperHint,
  lowerHint,
}: LiquityDebtPositionAddCollateralArgs): Hex {
  const actionArgs = encodeAbiParameters(liquityDebtPositionAddCollateralArgsEncoding, [
    collateralAmount,
    upperHint,
    lowerHint,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: LiquityDebtPositionAction.AddCollateral,
    actionArgs,
  });
}

export function decodeLiquityDebtPositionAddCollateralArgs(callArgs: Hex): LiquityDebtPositionAddCollateralArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [collateralAmount, upperHint, lowerHint] = decodeAbiParameters(
    liquityDebtPositionAddCollateralArgsEncoding,
    actionArgs,
  );

  return {
    collateralAmount,
    upperHint,
    lowerHint,
    externalPositionProxy,
  };
}

export function encodeLiquityDebtPositionRemoveCollateralArgs({
  externalPositionProxy,
  collateralAmount,
  upperHint,
  lowerHint,
}: LiquityDebtPositionRemoveCollateralArgs): Hex {
  const actionArgs = encodeAbiParameters(liquityDebtPositionRemoveCollateralArgsEncoding, [
    collateralAmount,
    upperHint,
    lowerHint,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: LiquityDebtPositionAction.RemoveCollateral,
    actionArgs,
  });
}

export function decodeLiquityDebtPositionRemoveCollateralArgs(callArgs: Hex): LiquityDebtPositionRemoveCollateralArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [collateralAmount, upperHint, lowerHint] = decodeAbiParameters(
    liquityDebtPositionRemoveCollateralArgsEncoding,
    actionArgs,
  );

  return {
    collateralAmount,
    upperHint,
    lowerHint,
    externalPositionProxy,
  };
}

export function encodeLiquityDebtPositionBorrowArgs({
  externalPositionProxy,
  maxFeePercentage,
  lusdAmount,
  upperHint,
  lowerHint,
}: LiquityDebtPositionBorrowArgs): Hex {
  const actionArgs = encodeAbiParameters(liquityDebtPositionBorrowArgsEncoding, [
    maxFeePercentage,
    lusdAmount,
    upperHint,
    lowerHint,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: LiquityDebtPositionAction.Borrow,
    actionArgs,
  });
}

export function decodeLiquityDebtPositionBorrowArgs(callArgs: Hex): LiquityDebtPositionBorrowArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [maxFeePercentage, lusdAmount, upperHint, lowerHint] = decodeAbiParameters(
    liquityDebtPositionBorrowArgsEncoding,
    actionArgs,
  );

  return {
    maxFeePercentage,
    lusdAmount,
    upperHint,
    lowerHint,
    externalPositionProxy,
  };
}

export function encodeLiquityDebtPositionRepayBorrowArgs({
  externalPositionProxy,
  lusdAmount,
  upperHint,
  lowerHint,
}: LiquityDebtPositionRepayBorrowArgs): Hex {
  const actionArgs = encodeAbiParameters(liquityDebtPositionRepayBorrowArgsEncoding, [
    lusdAmount,
    upperHint,
    lowerHint,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: LiquityDebtPositionAction.RepayBorrow,
    actionArgs,
  });
}

export function decodeLiquityDebtPositionRepayBorrowArgs(callArgs: Hex): LiquityDebtPositionRepayBorrowArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [lusdAmount, upperHint, lowerHint] = decodeAbiParameters(
    liquityDebtPositionRepayBorrowArgsEncoding,
    actionArgs,
  );

  return {
    lusdAmount,
    upperHint,
    lowerHint,
    externalPositionProxy,
  };
}
