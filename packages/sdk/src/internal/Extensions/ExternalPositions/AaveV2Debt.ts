import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import * as ExternalPositionManager from "../../ExternalPositionManager.js";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  AddCollateral: 0n,
  RemoveCollateral: 1n,
  Borrow: 2n,
  RepayBorrow: 3n,
  ClaimRewards: 4n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// ADD COLLATERAL
//--------------------------------------------------------------------------------------------

export const addCollateral = ExternalPositionManager.makeUse(Action.AddCollateral, addCollateralEncode);
export const createAndAddCollateral = ExternalPositionManager.makeCreateAndUse(
  Action.AddCollateral,
  addCollateralEncode,
);

const addCollateralEncoding = [
  {
    name: "aTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type AddCollateralArgs = {
  aTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(addCollateralEncoding, [args.aTokens, args.amounts]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [aTokens, amounts] = decodeAbiParameters(addCollateralEncoding, encoded);

  return {
    aTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE COLLATERAL
//--------------------------------------------------------------------------------------------

export const removeCollateral = ExternalPositionManager.makeUse(Action.RemoveCollateral, removeCollateralEncode);

const removeCollateralEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type RemoveCollateralArgs = {
  aTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(removeCollateralEncoding, [args.aTokens, args.amounts]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [aTokens, amounts] = decodeAbiParameters(removeCollateralEncoding, encoded);

  return {
    aTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// BORROW
//--------------------------------------------------------------------------------------------

export const borrow = ExternalPositionManager.makeUse(Action.Borrow, borrowEncode);
export const createAndBorrow = ExternalPositionManager.makeCreateAndUse(Action.Borrow, borrowEncode);

const borrowEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type BorrowArgs = {
  underlyingTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function borrowEncode(args: BorrowArgs): Hex {
  return encodeAbiParameters(borrowEncoding, [args.underlyingTokens, args.amounts]);
}

export function borrowDecode(encoded: Hex): BorrowArgs {
  const [underlyingTokens, amounts] = decodeAbiParameters(borrowEncoding, encoded);

  return {
    underlyingTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// REPAY BORROW
//--------------------------------------------------------------------------------------------

export const repayBorrow = ExternalPositionManager.makeUse(Action.RepayBorrow, repayBorrowEncode);

const repayBorrowEncoding = [
  {
    name: "underlyingTokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
] as const;

export type RepayBorrowArgs = {
  underlyingTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
};

export function repayBorrowEncode(args: RepayBorrowArgs): Hex {
  return encodeAbiParameters(repayBorrowEncoding, [args.underlyingTokens, args.amounts]);
}

export function repayBorrowDecode(encoded: Hex): RepayBorrowArgs {
  const [underlyingTokens, amounts] = decodeAbiParameters(repayBorrowEncoding, encoded);

  return {
    underlyingTokens,
    amounts,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

export const claimRewards = ExternalPositionManager.makeUse(Action.ClaimRewards, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    name: "assets",
    type: "address[]",
  },
] as const;

export type ClaimRewardsArgs = {
  rewardTokens: ReadonlyArray<Address>;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.rewardTokens]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [rewardTokens] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return {
    rewardTokens,
  };
}
