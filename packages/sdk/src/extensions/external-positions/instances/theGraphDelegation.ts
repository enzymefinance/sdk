import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type TheGraphDelegationAction = typeof TheGraphDelegationAction[keyof typeof TheGraphDelegationAction];
export const TheGraphDelegationAction = {
  Delegate: 0n,
  Undelegate: 1n,
  Withdraw: 2n,
} as const;

export const theGraphDelegationDelegateArgsEncoding = [
  {
    name: "indexer",
    type: "address",
  },
  {
    name: "tokens",
    type: "uint256",
  },
] as const;

export type TheGraphDelegationDelegateArgs = {
  indexer: Address;
  tokens: bigint;
  externalPositionProxy: Address;
};

export function encodeTheGraphDelegationDelegateArgs({
  externalPositionProxy,
  indexer,
  tokens,
}: TheGraphDelegationDelegateArgs): Hex {
  const actionArgs = encodeAbiParameters(theGraphDelegationDelegateArgsEncoding, [indexer, tokens]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: TheGraphDelegationAction.Delegate,
    actionArgs,
  });
}

export function decodeTheGraphDelegationDelegateArgs(callArgs: Hex): TheGraphDelegationDelegateArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [indexer, tokens] = decodeAbiParameters(theGraphDelegationDelegateArgsEncoding, actionArgs);

  return {
    indexer,
    tokens,
    externalPositionProxy,
  };
}

export const theGraphDelegationUndelegateArgsEncoding = [
  {
    name: "indexer",
    type: "address",
  },
  {
    name: "shares",
    type: "uint256",
  },
] as const;

export type TheGraphDelegationUndelegateArgs = {
  indexer: Address;
  shares: bigint;
  externalPositionProxy: Address;
};

export function encodeTheGraphDelegationUndelegateArgs({
  externalPositionProxy,
  indexer,
  shares,
}: TheGraphDelegationUndelegateArgs): Hex {
  const actionArgs = encodeAbiParameters(theGraphDelegationUndelegateArgsEncoding, [indexer, shares]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: TheGraphDelegationAction.Undelegate,
    actionArgs,
  });
}

export function decodeTheGraphDelegationUndelegateArgs(callArgs: Hex): TheGraphDelegationUndelegateArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [indexer, shares] = decodeAbiParameters(theGraphDelegationUndelegateArgsEncoding, actionArgs);

  return {
    indexer,
    shares,
    externalPositionProxy,
  };
}

export const theGraphDelegationWithdrawArgsEncoding = [
  {
    name: "indexer",
    type: "address",
  },
  {
    name: "nextIndexer",
    type: "address",
  },
] as const;

export type TheGraphDelegationWithdrawArgs = {
  indexer: Address;
  nextIndexer: Address;
  externalPositionProxy: Address;
};

export function encodeTheGraphDelegationWithdrawArgs({
  externalPositionProxy,
  indexer,
  nextIndexer,
}: TheGraphDelegationWithdrawArgs): Hex {
  const actionArgs = encodeAbiParameters(theGraphDelegationWithdrawArgsEncoding, [indexer, nextIndexer]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: TheGraphDelegationAction.Withdraw,
    actionArgs,
  });
}

export function decodeTheGraphDelegationWithdrawArgs(callArgs: Hex): TheGraphDelegationWithdrawArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [indexer, nextIndexer] = decodeAbiParameters(theGraphDelegationWithdrawArgsEncoding, actionArgs);

  return {
    indexer,
    nextIndexer,
    externalPositionProxy,
  };
}
