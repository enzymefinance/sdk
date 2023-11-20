import { type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  RequestWithdrawals: 0n,
  ClaimWithdrawals: 1n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// REQUEST WITHDRAWALS
//--------------------------------------------------------------------------------------------

export const requestWithdrawals = ExternalPositionManager.makeUse(Action.RequestWithdrawals, requestWithdrawalsEncode);
export const createAndRequestWithdrawals = ExternalPositionManager.makeCreateAndUse(
  Action.RequestWithdrawals,
  requestWithdrawalsEncode,
);

const requestWithdrawalsEncoding = [
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type RequestWithdrawalsArgs = {
  amounts: ReadonlyArray<bigint>;
};

export function requestWithdrawalsEncode(args: RequestWithdrawalsArgs): Hex {
  return encodeAbiParameters(requestWithdrawalsEncoding, [args.amounts]);
}

export function requestWithdrawalsDecode(encoded: Hex): RequestWithdrawalsArgs {
  const [amounts] = decodeAbiParameters(requestWithdrawalsEncoding, encoded);

  return { amounts };
}

//--------------------------------------------------------------------------------------------
// CLAIM WITHDRAWALS
//--------------------------------------------------------------------------------------------

export const claimWithdrawals = ExternalPositionManager.makeUse(Action.ClaimWithdrawals, claimWithdrawalsEncode);

const claimWithdrawalsEncoding = [
  {
    name: "requestIds",
    type: "uint256[]",
  },
  {
    name: "hints",
    type: "uint256[]",
  },
] as const;

export type ClaimWithdrawalsArgs = {
  requestIds: ReadonlyArray<bigint>;
  hints: ReadonlyArray<bigint>;
};

export function claimWithdrawalsEncode(args: ClaimWithdrawalsArgs): Hex {
  return encodeAbiParameters(claimWithdrawalsEncoding, [args.requestIds, args.hints]);
}

export function claimWithdrawalsDecode(encoded: Hex): ClaimWithdrawalsArgs {
  const [requestIds, hints] = decodeAbiParameters(claimWithdrawalsEncoding, encoded);

  return { requestIds, hints };
}
