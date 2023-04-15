import { ContractFunctionExecutionError, ContractFunctionRevertedError } from "viem";

export const POLICY_VIOLATION_MIN_MAX_INVESTMENT = Symbol("ENZF51000"); // Rule evaluated to false: MIN_MAX_INVESTMENT
export const BUY_SHARES_MIN_SHARES_QUANTITY_CANNOT_BE_ZERO = Symbol("ENZF61343"); // __buyShares: _minSharesQuantity must be >0
export const BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION = Symbol("ENZF61344"); // __buyShares: Pending migration or reconfiguration
export const BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT = Symbol("ENZF61345"); // __buyShares: Shares received < _minSharesQuantity

export type EnzymeErrorCode =
  | typeof POLICY_VIOLATION_MIN_MAX_INVESTMENT
  | typeof BUY_SHARES_MIN_SHARES_QUANTITY_CANNOT_BE_ZERO
  | typeof BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION
  | typeof BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT;

export class EnzymeError extends Error {
  constructor(public override readonly cause: ContractFunctionExecutionError, public readonly code: EnzymeErrorCode) {
    super(cause.message);
  }
}

export function catchEnzymeError<TError extends Error>(error: TError): TError | EnzymeError {
  if (error instanceof ContractFunctionExecutionError) {
    if (error.cause instanceof ContractFunctionRevertedError) {
      const code = getEnzymeErrorCode(error.cause);

      if (code !== undefined) {
        return new EnzymeError(error, code);
      }
    }
  }

  return error;
}

export function getEnzymeErrorCode(error: ContractFunctionRevertedError): EnzymeErrorCode | undefined {
  if (error.reason === undefined) {
    return undefined;
  }

  const [prefix, suffix] = error.reason.split(":", 2).map((value) => value.trim()) as [string, string | undefined];

  // TODO: This case would be for errors that do not follow the "prefix: reason" format.
  if (suffix === undefined) {
    return undefined;
  }

  switch (prefix) {
    case "Rule evaluated to false": {
      switch (suffix) {
        case "MIN_MAX_INVESTMENT":
          return POLICY_VIOLATION_MIN_MAX_INVESTMENT;
      }

      return undefined;
    }

    case "__buyShares": {
      switch (suffix) {
        case "_minSharesQuantity must be >0":
          return BUY_SHARES_MIN_SHARES_QUANTITY_CANNOT_BE_ZERO;
        case "Pending migration or reconfiguration":
          return BUY_SHARES_PENDING_MIGRATION_OR_RECONFIGURATION;
        case "Shares received < _minSharesQuantity":
          return BUY_SHARES_SHARES_RECEIVED_INSUFFICIENT;
      }

      return undefined;
    }
  }

  return undefined;
}
