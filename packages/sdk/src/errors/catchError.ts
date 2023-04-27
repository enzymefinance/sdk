import { ContractFunctionExecutionError, ContractFunctionRevertedError } from "viem";
import { getErrorCode } from "./getErrorCode.js";
import { errorDictionary, type ErrorCode } from "./errorCodes.js";

export class EnzymeError extends Error {
  public override readonly name = "EnzymeError";

  /**
   * The machine-readable revert code.
   */
  public readonly code: ErrorCode;

  /**
   * The human-readable revert label.
   */
  public readonly label: string;

  /**
   * The human-readable revert description.
   */
  public readonly description: string;

  /**
   * Creates a new error instance from the given code and cause.
   *
   * @param code The protocol specific error code.
   * @param cause The error cause.
   * @returns The error instance.
   */
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

/**
 * Catches the given error and returns a protocol specific revert error if possible.
 *
 * @remarks
 *
 * This function can be used to create a friendlier error message for end users and to more easily
 * identify the cause of the error. It also provides a way to programmatically identify the error
 * more easily through the `code` property. This way, developers can catch the error and handle it
 * in a more granular way without having to parse the error message themselves.
 *
 * @param error The error to catch.
 * @returns The protocol specific error instance or the original error if no match was found.
 */
export function catchError<TError extends Error | unknown>(error: TError): TError | EnzymeError {
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
