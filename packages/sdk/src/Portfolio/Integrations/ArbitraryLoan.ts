import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters, hexToString, stringToHex } from "viem";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  ConfigureLoan: 0n,
  UpdateBorrowableAmount: 1n,
  CallOnAccountingModule: 2n,
  Reconcile: 3n,
  CloseLoan: 4n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// CONFIGURE LOAN
//--------------------------------------------------------------------------------------------

export const configureLoan = ExternalPositionManager.makeUse(Action.ConfigureLoan, configureLoanEncode);
export const createAndConfigureLoan = ExternalPositionManager.makeCreateAndUse(
  Action.ConfigureLoan,
  configureLoanEncode,
);

const configureLoanEncoding = [
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

export type ConfigureLoanArgs = {
  borrower: Address;
  asset: Address;
  amount: bigint;
  accountingModule: Address;
  accountingModuleConfigData: Hex;
  description: string;
};

export function configureLoanEncode(args: ConfigureLoanArgs): Hex {
  return encodeAbiParameters(configureLoanEncoding, [
    args.borrower,
    args.asset,
    args.amount,
    args.accountingModule,
    args.accountingModuleConfigData,
    stringToHex(args.description),
  ]);
}

export function configureLoanDecode(encoded: Hex): ConfigureLoanArgs {
  const [borrower, asset, amount, accountingModule, accountingModuleConfigData, description] = decodeAbiParameters(
    configureLoanEncoding,
    encoded,
  );

  return {
    borrower,
    asset,
    amount,
    accountingModule,
    accountingModuleConfigData,
    description: hexToString(description, { size: 32 }),
  };
}

//--------------------------------------------------------------------------------------------
// UPDATE BORROWABLE AMOUNT
//--------------------------------------------------------------------------------------------

export const updateBorrowableAmount = ExternalPositionManager.makeUse(
  Action.UpdateBorrowableAmount,
  updateBorrowableAmountEncode,
);

const updateBorrowableAmountEncoding = [
  {
    name: "amountDelta",
    type: "uint256",
  },
] as const;

export type UpdateBorrowableAmountArgs = {
  amountDelta: bigint;
};

export function updateBorrowableAmountEncode(args: UpdateBorrowableAmountArgs): Hex {
  return encodeAbiParameters(updateBorrowableAmountEncoding, [args.amountDelta]);
}

export function updateBorrowableAmountDecode(encoded: Hex): UpdateBorrowableAmountArgs {
  const [amountDelta] = decodeAbiParameters(updateBorrowableAmountEncoding, encoded);

  return {
    amountDelta,
  };
}

//--------------------------------------------------------------------------------------------
// CALL ON ACCOUNTING MODULE
//--------------------------------------------------------------------------------------------

// TODO: Can we do something about the arg encoding here?
export const callOnAccountingModule = ExternalPositionManager.makeUse(
  Action.CallOnAccountingModule,
  (args: Hex) => args,
);

//--------------------------------------------------------------------------------------------
// RECONCILE
//--------------------------------------------------------------------------------------------

export const reconcile = ExternalPositionManager.makeUse(Action.Reconcile, reconcileEncode);

const reconcileEncoding = [
  {
    name: "extraAssetsToSweep",
    type: "address[]",
  },
] as const;

export type ReconcileArgs = {
  extraAssetsToSweep: ReadonlyArray<Address>;
};

export function reconcileEncode(args: ReconcileArgs): Hex {
  return encodeAbiParameters(reconcileEncoding, [args.extraAssetsToSweep]);
}

export function reconcileDecode(encoded: Hex): ReconcileArgs {
  const [extraAssetsToSweep] = decodeAbiParameters(reconcileEncoding, encoded);

  return {
    extraAssetsToSweep,
  };
}

//--------------------------------------------------------------------------------------------
// CLOSE LOAN
//--------------------------------------------------------------------------------------------

export const closeLoan = ExternalPositionManager.makeUse(Action.CloseLoan, closeLoanEncode);

const closeLoanEncoding = [
  {
    name: "extraAssetsToSweep",
    type: "address[]",
  },
] as const;

export type CloseLoanArgs = {
  extraAssetsToSweep: ReadonlyArray<Address>;
};

export function closeLoanEncode(args: CloseLoanArgs): Hex {
  return encodeAbiParameters(closeLoanEncoding, [args.extraAssetsToSweep]);
}

export function closeLoanDecode(encoded: Hex): CloseLoanArgs {
  const [extraAssetsToSweep] = decodeAbiParameters(closeLoanEncoding, encoded);

  return {
    extraAssetsToSweep,
  };
}
