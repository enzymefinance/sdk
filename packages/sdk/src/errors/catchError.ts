import { ContractFunctionExecutionError, ContractFunctionRevertedError } from "viem";
import { getErrorCode } from "./getErrorCode.js";
import { errorDictionary, type ErrorCode } from "./errorCodes.js";

export class EnzymeError extends Error {
  public override readonly name = "EnzymeError";
  public readonly label: string;
  public readonly description: string;

  constructor(public readonly code: ErrorCode) {
    const error = errorDictionary[code];
    super(`${error.label}: ${error.description}`);

    this.label = error.label;
    this.description = error.description;
  }
}

export function catchError<TError extends Error>(error: TError): TError | EnzymeError {
  if (error instanceof ContractFunctionExecutionError) {
    if (error.cause instanceof ContractFunctionRevertedError) {
      const code = getErrorCode(error.cause);

      if (code !== undefined) {
        const err = new EnzymeError(code);
        error.cause = error;

        return err;
      }
    }
  }

  return error;
}
