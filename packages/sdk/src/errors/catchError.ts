import { ContractFunctionExecutionError, ContractFunctionRevertedError } from "viem";
import { getErrorCode } from "./getErrorCode.js";
import { errorDictionary, type ErrorCode } from "./errorCodes.js";

export class EnzymeError extends Error {
  public override readonly name = "EnzymeError";

  public readonly code: ErrorCode;
  public readonly label: string;
  public readonly description: string;

  public static create(code: ErrorCode, cause: Error): EnzymeError {
    const error = new this(code);
    error.cause = cause;
    return error;
  }

  constructor(code: ErrorCode) {
    const error = errorDictionary[code];
    super(`${error.label}: ${error.description}`);

    this.code = code;
    this.label = error.label;
    this.description = error.description;

    // TODO: Inherit the error formatting from the underlying viem error.
  }
}

export function catchError<TError extends Error>(error: TError): TError | EnzymeError {
  if (error instanceof ContractFunctionExecutionError) {
    if (error.cause instanceof ContractFunctionRevertedError) {
      const code = getErrorCode(error.cause);

      if (code !== undefined) {
        return EnzymeError.create(code, error);
      }
    }
  }

  return error;
}
