import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type CompoundV2DebtAction = typeof CompoundV2DebtAction[keyof typeof CompoundV2DebtAction];
export const CompoundV2DebtAction = {
  AddCollateral: 0n,
  RemoveCollateral: 1n,
  Borrow: 2n,
  RepayBorrow: 3n,
  ClaimComp: 4n,
} as const;

const compoundV2DebtArgsEncoding = [
  {
    name: "tokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
  {
    name: "data",
    type: "bytes",
  },
] as const;

export type CompoundV2DebtAddCollateralArgs = {
  externalPositionProxy: Address;
  cTokens: Address[];
  amounts: bigint[];
};

export function encodeCompoundV2DebtAddCollateralArgs({
  externalPositionProxy,
  cTokens,
  amounts,
}: CompoundV2DebtAddCollateralArgs): Hex {
  const actionArgs = encodeAbiParameters(compoundV2DebtArgsEncoding, [cTokens, amounts, "0x"]);

  const encoded = encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: CompoundV2DebtAction.AddCollateral,
    actionArgs,
  });

  return encoded;
}

export function decodeCompoundV2DebtAddCollateralArgs(callArgs: Hex): CompoundV2DebtAddCollateralArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [cTokens, amounts] = decodeAbiParameters(compoundV2DebtArgsEncoding, actionArgs);

  return {
    cTokens: [...cTokens],
    amounts: [...amounts],
    externalPositionProxy,
  };
}

export type CompoundV2DebtRemoveCollateralArgs = {
  externalPositionProxy: Address;
  cTokens: Address[];
  amounts: bigint[];
};

export function encodeCompoundV2DebtRemoveCollateralArgs({
  externalPositionProxy,
  cTokens,
  amounts,
}: CompoundV2DebtRemoveCollateralArgs): Hex {
  const actionArgs = encodeAbiParameters(compoundV2DebtArgsEncoding, [cTokens, amounts, "0x"]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: CompoundV2DebtAction.RemoveCollateral,
    actionArgs,
  });
}

export function decodeCompoundV2DebtRemoveCollateralArgs(callArgs: Hex): CompoundV2DebtRemoveCollateralArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [cTokens, amounts] = decodeAbiParameters(compoundV2DebtArgsEncoding, actionArgs);

  return {
    cTokens: [...cTokens],
    amounts: [...amounts],
    externalPositionProxy,
  };
}

export type CompoundV2DebtBorrowArgs = {
  externalPositionProxy: Address;
  underlyingTokens: Address[];
  amounts: bigint[];
  cTokens: Address[];
};

const cTokensDataEncoding = [{ name: "cTokens", type: "address[]" }] as const;

export function encodeCompoundV2DebtBorrowArgs({
  externalPositionProxy,
  underlyingTokens,
  amounts,
  cTokens,
}: CompoundV2DebtBorrowArgs): Hex {
  const data = encodeAbiParameters(cTokensDataEncoding, [cTokens]);
  const actionArgs = encodeAbiParameters(compoundV2DebtArgsEncoding, [underlyingTokens, amounts, data]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: CompoundV2DebtAction.Borrow,
    actionArgs,
  });
}

export function decodeCompoundV2DebtBorrowArgs(callArgs: Hex): CompoundV2DebtBorrowArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [underlyingTokens, amounts, data] = decodeAbiParameters(compoundV2DebtArgsEncoding, actionArgs);
  const [cTokens] = decodeAbiParameters(cTokensDataEncoding, data);

  return {
    underlyingTokens: [...underlyingTokens],
    amounts: [...amounts],
    cTokens: [...cTokens],
    externalPositionProxy,
  };
}

export type CompoundV2DebtRepayBorrowArgs = {
  externalPositionProxy: Address;
  underlyingTokens: Address[];
  cTokens: Address[];
  amounts: bigint[];
};

export function encodeCompoundV2DebtRepayBorrowArgs({
  externalPositionProxy,
  underlyingTokens,
  cTokens,
  amounts,
}: CompoundV2DebtRepayBorrowArgs): Hex {
  const data = encodeAbiParameters(cTokensDataEncoding, [cTokens]);

  const actionArgs = encodeAbiParameters(compoundV2DebtArgsEncoding, [underlyingTokens, amounts, data]);

  const enc = encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: CompoundV2DebtAction.RepayBorrow,
    actionArgs,
  });

  return enc;
}

export function decodeCompoundV2DebtRepayBorrowArgs(callArgs: Hex): CompoundV2DebtRepayBorrowArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [underlyingTokens, amounts, data] = decodeAbiParameters(compoundV2DebtArgsEncoding, actionArgs);
  const [cTokens] = decodeAbiParameters(cTokensDataEncoding, data);

  return {
    underlyingTokens: [...underlyingTokens],
    cTokens: [...cTokens],
    amounts: [...amounts],
    externalPositionProxy,
  };
}

export type CompoundV2DebtClaimCompArgs = {
  externalPositionProxy: Address;
};

export function encodeCompoundV2DebtClaimCompArgs({ externalPositionProxy }: CompoundV2DebtClaimCompArgs): Hex {
  const actionArgs = encodeAbiParameters(compoundV2DebtArgsEncoding, [[], [], "0x"]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: CompoundV2DebtAction.ClaimComp,
    actionArgs,
  });
}

export function decodeCompoundV2DebtClaimCompArgs(callArgs: Hex): CompoundV2DebtClaimCompArgs {
  const { externalPositionProxy } = decodeCallOnExternalPositionArgs(callArgs);

  return {
    externalPositionProxy,
  };
}
