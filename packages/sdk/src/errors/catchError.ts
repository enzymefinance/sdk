import { ContractFunctionExecutionError, ContractFunctionRevertedError } from "viem";
import { getErrorCode } from "./getErrorCode.js";
import { errorDictionary, type ErrorCode } from "./errorCodes.js";

export class EnzymeError extends Error {
  public override name = "EnzymeError";

  constructor(public override readonly cause: Error, public readonly code: ErrorCode) {
    const error = errorDictionary[code];
    super(`${error.label}: ${error.description}`);
  }
}

export function catchError<TError extends Error>(error: TError): TError | EnzymeError {
  if (error instanceof ContractFunctionExecutionError) {
    if (error.cause instanceof ContractFunctionRevertedError) {
      const code = getErrorCode(error.cause);

      if (code !== undefined) {
        return new EnzymeError(error, code);
      }
    }
  }

  return error;
}
