import * as ExternalPositionManager from "@enzymefinance/sdk/internal/ExternalPositionManager";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  Delegate: 0n,
  Undelegate: 1n,
  Withdraw: 2n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// DELEGATE
//--------------------------------------------------------------------------------------------

export const delegate = ExternalPositionManager.makeUse(Action.Delegate, delegateEncode);
export const createAndDelegate = ExternalPositionManager.makeCreateAndUse(Action.Delegate, delegateEncode);

const delegateEncoding = [
  {
    name: "indexer",
    type: "address",
  },
  {
    name: "tokens",
    type: "uint256",
  },
] as const;

export type DelegateArgs = {
  indexer: Address;
  tokens: bigint;
};

export function delegateEncode(args: DelegateArgs): Hex {
  return encodeAbiParameters(delegateEncoding, [args.indexer, args.tokens]);
}

export function delegateDecode(encoded: Hex): DelegateArgs {
  const [indexer, tokens] = decodeAbiParameters(delegateEncoding, encoded);

  return {
    indexer,
    tokens,
  };
}

//--------------------------------------------------------------------------------------------
// UNDELEGATE
//--------------------------------------------------------------------------------------------

export const undelegate = ExternalPositionManager.makeUse(Action.Undelegate, undelegateEncode);

const undelegateEncoding = [
  {
    name: "indexer",
    type: "address",
  },
  {
    name: "shares",
    type: "uint256",
  },
] as const;

export type UndelegateArgs = {
  indexer: Address;
  shares: bigint;
};

export function undelegateEncode(args: UndelegateArgs): Hex {
  return encodeAbiParameters(undelegateEncoding, [args.indexer, args.shares]);
}

export function undelegateDecode(encoded: Hex): UndelegateArgs {
  const [indexer, shares] = decodeAbiParameters(undelegateEncoding, encoded);

  return {
    indexer,
    shares,
  };
}

//--------------------------------------------------------------------------------------------
// WITHDRAW
//--------------------------------------------------------------------------------------------

export const withdraw = ExternalPositionManager.makeUse(Action.Withdraw, withdrawEncode);

const withdrawEncoding = [
  {
    name: "indexer",
    type: "address",
  },
  {
    name: "nextIndexer",
    type: "address",
  },
] as const;

export type WithdrawArgs = {
  indexer: Address;
  nextIndexer: Address;
};

export function withdrawEncode(args: WithdrawArgs): Hex {
  return encodeAbiParameters(withdrawEncoding, [args.indexer, args.nextIndexer]);
}

export function withdrawDecode(encoded: Hex): WithdrawArgs {
  const [indexer, nextIndexer] = decodeAbiParameters(withdrawEncoding, encoded);

  return {
    indexer,
    nextIndexer,
  };
}
