import { type Address, type Hex, PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

const lendEncoding = [
  {
    type: "address",
    name: "aToken",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  aToken: Address;
  depositAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.aToken, args.depositAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [aToken, depositAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    aToken,
    depositAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "aToken",
  },
  {
    name: "redeemAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  aToken: Address;
  redeemAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [args.aToken, args.redeemAmount]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [aToken, redeemAmount] = decodeAbiParameters(redeemEncoding, encoded);

  return { aToken, redeemAmount };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

export type Action = (typeof Action)[keyof typeof Action];
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

//--------------------------------------------------------------------------------------------
// THIRD PARTY READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const aaveIncentivesControllerAbi = [
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getRewardsBalance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "getUserUnclaimedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getRewardsBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    aaveIncentivesController: Address;
    assets: Address[];
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: aaveIncentivesControllerAbi,
    functionName: "getRewardsBalance",
    address: args.aaveIncentivesController,
    args: [args.assets, args.user],
  });
}

export async function getUserUnclaimedRewards(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    aaveIncentivesController: Address;
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: aaveIncentivesControllerAbi,
    functionName: "getUserUnclaimedRewards",
    address: args.aaveIncentivesController,
    args: [args.user],
  });
}
