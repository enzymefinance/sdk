import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type AaveV2DebtAction = typeof AaveV2DebtAction[keyof typeof AaveV2DebtAction];
export const AaveV2DebtAction = {
  AddCollateral: 0n,
  RemoveCollateral: 1n,
  Borrow: 2n,
  RepayBorrow: 3n,
} as const;

const aaveV2DebtAddCollateralArgsEncoding = [
  {
    name: "aTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type AaveV2DebtAddCollateralArgs = {
  externalPositionProxy: Address;
  aTokens: Address[];
  amounts: bigint[];
};

export function encodeAaveV2DebtAddCollateralArgs({
  externalPositionProxy,
  aTokens,
  amounts,
}: AaveV2DebtAddCollateralArgs): Hex {
  const actionArgs = encodeAbiParameters(aaveV2DebtAddCollateralArgsEncoding, [aTokens, amounts]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: AaveV2DebtAction.AddCollateral,
    actionArgs,
  });
}

export function decodeAaveV2DebtAddCollateralArgs(callArgs: Hex): AaveV2DebtAddCollateralArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [aTokens, amounts] = decodeAbiParameters(aaveV2DebtAddCollateralArgsEncoding, actionArgs);

  return {
    aTokens: [...aTokens],
    amounts: [...amounts],
    externalPositionProxy,
  };
}

const aaveV2DebtRemoveCollateralArgsEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type AaveV2DebtRemoveCollateralArgs = {
  externalPositionProxy: Address;
  aTokens: Address[];
  amounts: bigint[];
};

export function encodeAaveV2DebtRemoveCollateralArgs({
  externalPositionProxy,
  aTokens,
  amounts,
}: AaveV2DebtRemoveCollateralArgs): Hex {
  const actionArgs = encodeAbiParameters(aaveV2DebtRemoveCollateralArgsEncoding, [aTokens, amounts]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: AaveV2DebtAction.RemoveCollateral,
    actionArgs,
  });
}

export function decodeAaveV2DebtRemoveCollateralArgs(callArgs: Hex): AaveV2DebtRemoveCollateralArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [aTokens, amounts] = decodeAbiParameters(aaveV2DebtRemoveCollateralArgsEncoding, actionArgs);

  return {
    aTokens: [...aTokens],
    amounts: [...amounts],
    externalPositionProxy,
  };
}

const aaveV2DebtBorrowArgsEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type AaveV2DebtBorrowArgs = {
  externalPositionProxy: Address;
  underlyingTokens: Address[];
  amounts: bigint[];
};

export function encodeAaveV2DebtBorrowArgs({
  externalPositionProxy,
  underlyingTokens,
  amounts,
}: AaveV2DebtBorrowArgs): Hex {
  const actionArgs = encodeAbiParameters(aaveV2DebtBorrowArgsEncoding, [underlyingTokens, amounts]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: AaveV2DebtAction.Borrow,
    actionArgs,
  });
}

export function decodeAaveV2DebtBorrowArgs(callArgs: Hex): AaveV2DebtBorrowArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [underlyingTokens, amounts] = decodeAbiParameters(aaveV2DebtBorrowArgsEncoding, actionArgs);

  return {
    underlyingTokens: [...underlyingTokens],
    amounts: [...amounts],
    externalPositionProxy,
  };
}

const aaveV2DebtRepayBorrowArgsEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type AaveV2DebtRepayBorrowArgs = {
  externalPositionProxy: Address;
  underlyingTokens: Address[];
  amounts: bigint[];
};

export function encodeAaveV2DebtRepayBorrowArgs({
  externalPositionProxy,
  underlyingTokens,
  amounts,
}: AaveV2DebtRepayBorrowArgs): Hex {
  const actionArgs = encodeAbiParameters(aaveV2DebtRepayBorrowArgsEncoding, [underlyingTokens, amounts]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: AaveV2DebtAction.RepayBorrow,
    actionArgs,
  });
}

export function decodeAaveV2DebtRepayBorrowArgs(callArgs: Hex): AaveV2DebtRepayBorrowArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [underlyingTokens, amounts] = decodeAbiParameters(aaveV2DebtRepayBorrowArgsEncoding, actionArgs);

  return {
    underlyingTokens: [...underlyingTokens],
    amounts: [...amounts],
    externalPositionProxy,
  };
}
