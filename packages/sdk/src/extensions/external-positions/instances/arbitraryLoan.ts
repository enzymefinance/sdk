import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type ArbitraryLoanAction = typeof ArbitraryLoanAction[keyof typeof ArbitraryLoanAction];
export const ArbitraryLoanAction = {
  ConfigureLoan: 0n,
  UpdateBorrowableAmount: 1n,
  CallOnAccountingModule: 2n,
  Reconcile: 3n,
  CloseLoan: 4n,
} as const;

const arbitraryLoanConfigureLoanArgsEncoding = [
  {
    name: "borrower",
    type: "address",
  },
  {
    name: "asset",
    type: "address",
  },
  {
    name: "amount",
    type: "uint256",
  },
  {
    name: "accountingModule",
    type: "address",
  },
  {
    name: "accountingModuleConfigData",
    type: "bytes",
  },
  {
    name: "description",
    type: "bytes32",
  },
] as const;

export type ArbitraryLoanConfigureLoanArgs = {
  externalPositionProxy: Address;
  borrower: Address;
  asset: Address;
  amount: bigint;
  accountingModule: Address;
  accountingModuleConfigData: Hex;
  description: Hex;
};

export function encodeArbitraryLoanConfigureLoanArgs({
  externalPositionProxy,
  borrower,
  asset,
  amount,
  accountingModule,
  accountingModuleConfigData,
  description,
}: ArbitraryLoanConfigureLoanArgs): Hex {
  const actionArgs = encodeAbiParameters(arbitraryLoanConfigureLoanArgsEncoding, [
    borrower,
    asset,
    amount,
    accountingModule,
    accountingModuleConfigData,
    description,
  ]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ArbitraryLoanAction.ConfigureLoan,
    actionArgs,
  });
}

export function decodeArbitraryLoanConfigureLoanArgs(callArgs: Hex): ArbitraryLoanConfigureLoanArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);

  const [borrower, asset, amount, accountingModule, accountingModuleConfigData, description] = decodeAbiParameters(
    arbitraryLoanConfigureLoanArgsEncoding,
    actionArgs,
  );

  return {
    borrower,
    asset,
    amount,
    accountingModule,
    accountingModuleConfigData,
    description,
    externalPositionProxy,
  };
}

const arbitraryLoanUpdateBorrowableAmountArgsEncoding = [
  {
    name: "amountDelta",
    type: "uint256",
  },
] as const;

export type ArbitraryLoanUpdateBorrowableAmountArgs = {
  externalPositionProxy: Address;
  amountDelta: bigint;
};

export function encodeArbitraryLoanUpdateBorrowableAmountArgs({
  externalPositionProxy,
  amountDelta,
}: ArbitraryLoanUpdateBorrowableAmountArgs): Hex {
  const actionArgs = encodeAbiParameters(arbitraryLoanUpdateBorrowableAmountArgsEncoding, [amountDelta]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ArbitraryLoanAction.UpdateBorrowableAmount,
    actionArgs,
  });
}

export function decodeArbitraryLoanUpdateBorrowableAmountArgs(callArgs: Hex): ArbitraryLoanUpdateBorrowableAmountArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [amountDelta] = decodeAbiParameters(arbitraryLoanUpdateBorrowableAmountArgsEncoding, actionArgs);

  return {
    amountDelta,
    externalPositionProxy,
  };
}

export type ArbitraryLoanCallOnAccountingModuleArgs = {
  externalPositionProxy: Address;
  actionArgs: Hex;
};

export function encodeArbitraryLoanCallOnAccountingModuleArgs({
  externalPositionProxy,
  actionArgs,
}: ArbitraryLoanCallOnAccountingModuleArgs): Hex {
  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ArbitraryLoanAction.CallOnAccountingModule,
    actionArgs,
  });
}

export function decodeArbitraryLoanCallOnAccountingModuleArgs(callArgs: Hex): ArbitraryLoanCallOnAccountingModuleArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);

  return {
    actionArgs,
    externalPositionProxy,
  };
}

const arbitraryLoanReconcileArgsEncoding = [
  {
    name: "extraAssetsToSweep",
    type: "address[]",
  },
] as const;

export type ArbitraryLoanReconcileArgs = {
  externalPositionProxy: Address;
  extraAssetsToSweep: Address[];
};

export function encodeArbitraryLoanReconcileArgs({
  externalPositionProxy,
  extraAssetsToSweep,
}: ArbitraryLoanReconcileArgs): Hex {
  const actionArgs = encodeAbiParameters(arbitraryLoanReconcileArgsEncoding, [extraAssetsToSweep]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ArbitraryLoanAction.Reconcile,
    actionArgs,
  });
}

export function decodeArbitraryLoanReconcileArgs(callArgs: Hex): ArbitraryLoanReconcileArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [extraAssetsToSweep] = decodeAbiParameters(arbitraryLoanReconcileArgsEncoding, actionArgs);

  return {
    extraAssetsToSweep: [...extraAssetsToSweep],
    externalPositionProxy,
  };
}

const arbitraryLoanCloseLoanArgsEncoding = [
  {
    name: "extraAssetsToSweep",
    type: "address[]",
  },
] as const;

export type ArbitraryLoanCloseLoanArgs = {
  externalPositionProxy: Address;
  extraAssetsToSweep: Address[];
};

export function encodeArbitraryLoanCloseLoanArgs({
  externalPositionProxy,
  extraAssetsToSweep,
}: ArbitraryLoanCloseLoanArgs): Hex {
  const actionArgs = encodeAbiParameters(arbitraryLoanCloseLoanArgsEncoding, [extraAssetsToSweep]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: ArbitraryLoanAction.CloseLoan,
    actionArgs,
  });
}

export function decodeArbitraryLoanCloseLoanArgs(callArgs: Hex): ArbitraryLoanCloseLoanArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [extraAssetsToSweep] = decodeAbiParameters(arbitraryLoanCloseLoanArgsEncoding, actionArgs);

  return {
    extraAssetsToSweep: [...extraAssetsToSweep],
    externalPositionProxy,
  };
}
