import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters, parseUnits } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";
import { Asset } from "../../index.js";

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
  SetEMode: 4n,
  SetUseReserveAsCollateral: 5n,
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
  {
    name: "fromUnderlying",
    type: "bool",
  },
] as const;

export type AddCollateralArgs = {
  aTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  fromUnderlying: boolean;
};

export function addCollateralEncode(args: AddCollateralArgs): Hex {
  return encodeAbiParameters(addCollateralEncoding, [args.aTokens, args.amounts, args.fromUnderlying]);
}

export function addCollateralDecode(encoded: Hex): AddCollateralArgs {
  const [aTokens, amounts, fromUnderlying] = decodeAbiParameters(addCollateralEncoding, encoded);

  return {
    aTokens,
    amounts,
    fromUnderlying,
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
  {
    name: "toUnderlying",
    type: "bool",
  },
] as const;

export type RemoveCollateralArgs = {
  aTokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  toUnderlying: boolean;
};

export function removeCollateralEncode(args: RemoveCollateralArgs): Hex {
  return encodeAbiParameters(removeCollateralEncoding, [args.aTokens, args.amounts, args.toUnderlying]);
}

export function removeCollateralDecode(encoded: Hex): RemoveCollateralArgs {
  const [aTokens, amounts, toUnderlying] = decodeAbiParameters(removeCollateralEncoding, encoded);

  return {
    aTokens,
    amounts,
    toUnderlying,
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
// SET E-MODE
//--------------------------------------------------------------------------------------------

export const setEMode = ExternalPositionManager.makeUse(Action.SetEMode, setEModeEncode);

const setEModeEncoding = [
  {
    name: "categoryId",
    type: "uint8",
  },
] as const;

export type SetEModeArgs = {
  categoryId: number;
};

export function setEModeEncode(args: SetEModeArgs): Hex {
  return encodeAbiParameters(setEModeEncoding, [args.categoryId]);
}

export function setEModeDecode(encoded: Hex): SetEModeArgs {
  const [categoryId] = decodeAbiParameters(setEModeEncoding, encoded);

  return {
    categoryId,
  };
}

//--------------------------------------------------------------------------------------------
// SET USE RESERVE AS COLLATERAL
//--------------------------------------------------------------------------------------------

export const setUseReserveAsCollateral = ExternalPositionManager.makeUse(
  Action.SetUseReserveAsCollateral,
  setUseReserveAsCollateralEncode,
);

const setUseReserveAsCollateralEncoding = [
  {
    name: "underlying",
    type: "address",
  },
  {
    name: "useAsCollateral",
    type: "bool",
  },
] as const;

export type SetUseReserveAsCollateralArgs = {
  underlying: Address;
  useAsCollateral: boolean;
};

export function setUseReserveAsCollateralEncode(args: SetUseReserveAsCollateralArgs): Hex {
  return encodeAbiParameters(setUseReserveAsCollateralEncoding, [args.underlying, args.useAsCollateral]);
}

export function setUseReserveAsCollateralDecode(encoded: Hex): SetUseReserveAsCollateralArgs {
  const [underlying, useAsCollateral] = decodeAbiParameters(setUseReserveAsCollateralEncoding, encoded);

  return {
    underlying,
    useAsCollateral,
  };
}

//--------------------------------------------------------------------------------------------
// THIRD PARTY READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const poolAddressProviderAbi = [
  {
    inputs: [],
    name: "getPool",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getPool(
  client: Client,
  args: Viem.ContractCallParameters<{
    poolAddressProvider: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: poolAddressProviderAbi,
    functionName: "getPool",
    address: args.poolAddressProvider,
  });
}

const poolAbi = [
  {
    inputs: [{ internalType: "uint8", name: "id", type: "uint8" }],
    name: "getEModeCategoryData",
    outputs: [
      {
        components: [
          { internalType: "uint16", name: "ltv", type: "uint16" },
          { internalType: "uint16", name: "liquidationThreshold", type: "uint16" },
          { internalType: "uint16", name: "liquidationBonus", type: "uint16" },
          { internalType: "address", name: "priceSource", type: "address" },
          { internalType: "string", name: "label", type: "string" },
        ],
        internalType: "struct DataTypes.EModeCategory",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getUserAccountData",
    outputs: [
      { internalType: "uint256", name: "totalCollateralBase", type: "uint256" },
      { internalType: "uint256", name: "totalDebtBase", type: "uint256" },
      { internalType: "uint256", name: "availableBorrowsBase", type: "uint256" },
      { internalType: "uint256", name: "currentLiquidationThreshold", type: "uint256" },
      { internalType: "uint256", name: "ltv", type: "uint256" },
      { internalType: "uint256", name: "healthFactor", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getEModeCategoryData(
  client: Client,
  args: Viem.ContractCallParameters<{
    pool: Address;
    categoryId: number;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: poolAbi,
    functionName: "getEModeCategoryData",
    address: args.pool,
    args: [args.categoryId],
  });
}

export async function getUserAccountData(
  client: Client,
  args: Viem.ContractCallParameters<{
    pool: Address;
    user: Address;
  }>,
) {
  const [availableBorrowsBase, currentLiquidationThreshold, healthFactor, ltv, totalCollateralBase, totalDebtBase] =
    await readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: poolAbi,
      functionName: "getUserAccountData",
      address: args.pool,
      args: [args.user],
    });

  return { availableBorrowsBase, currentLiquidationThreshold, healthFactor, ltv, totalCollateralBase, totalDebtBase };
}

const incentivesProviderAbi = [
  {
    inputs: [{ internalType: "address", name: "emissionManager", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "asset", type: "address" },
      { indexed: true, internalType: "address", name: "reward", type: "address" },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "assetIndex", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "userIndex", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "rewardsAccrued", type: "uint256" },
    ],
    name: "Accrued",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "asset", type: "address" },
      { indexed: true, internalType: "address", name: "reward", type: "address" },
      { indexed: false, internalType: "uint256", name: "oldEmission", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "newEmission", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "oldDistributionEnd", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "newDistributionEnd", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "assetIndex", type: "uint256" },
    ],
    name: "AssetConfigUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "address", name: "claimer", type: "address" },
    ],
    name: "ClaimerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "reward", type: "address" },
      { indexed: true, internalType: "address", name: "rewardOracle", type: "address" },
    ],
    name: "RewardOracleUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: true, internalType: "address", name: "reward", type: "address" },
      { indexed: true, internalType: "address", name: "to", type: "address" },
      { indexed: false, internalType: "address", name: "claimer", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "RewardsClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "reward", type: "address" },
      { indexed: true, internalType: "address", name: "transferStrategy", type: "address" },
    ],
    name: "TransferStrategyInstalled",
    type: "event",
  },
  {
    inputs: [],
    name: "EMISSION_MANAGER",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REVISION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "claimAllRewards",
    outputs: [
      { internalType: "address[]", name: "rewardsList", type: "address[]" },
      { internalType: "uint256[]", name: "claimedAmounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "to", type: "address" },
    ],
    name: "claimAllRewardsOnBehalf",
    outputs: [
      { internalType: "address[]", name: "rewardsList", type: "address[]" },
      { internalType: "uint256[]", name: "claimedAmounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address[]", name: "assets", type: "address[]" }],
    name: "claimAllRewardsToSelf",
    outputs: [
      { internalType: "address[]", name: "rewardsList", type: "address[]" },
      { internalType: "uint256[]", name: "claimedAmounts", type: "uint256[]" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "claimRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "to", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "claimRewardsOnBehalf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "claimRewardsToSelf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint88", name: "emissionPerSecond", type: "uint88" },
          { internalType: "uint256", name: "totalSupply", type: "uint256" },
          { internalType: "uint32", name: "distributionEnd", type: "uint32" },
          { internalType: "address", name: "asset", type: "address" },
          { internalType: "address", name: "reward", type: "address" },
          { internalType: "contract ITransferStrategyBase", name: "transferStrategy", type: "address" },
          { internalType: "contract IEACAggregatorProxy", name: "rewardOracle", type: "address" },
        ],
        internalType: "struct RewardsDataTypes.RewardsConfigInput[]",
        name: "config",
        type: "tuple[]",
      },
    ],
    name: "configureAssets",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getAllUserRewards",
    outputs: [
      { internalType: "address[]", name: "rewardsList", type: "address[]" },
      { internalType: "uint256[]", name: "unclaimedAmounts", type: "uint256[]" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getAssetDecimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "getAssetIndex",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getClaimer",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "getDistributionEnd",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEmissionManager",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "reward", type: "address" }],
    name: "getRewardOracle",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getRewardsByAsset",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "getRewardsData",
    outputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardsList",
    outputs: [{ internalType: "address[]", name: "", type: "address[]" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "reward", type: "address" }],
    name: "getTransferStrategy",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "getUserAccruedRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "getUserAssetIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address[]", name: "assets", type: "address[]" },
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
    ],
    name: "getUserRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "uint256", name: "totalSupply", type: "uint256" },
      { internalType: "uint256", name: "userBalance", type: "uint256" },
    ],
    name: "handleAction",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "user", type: "address" },
      { internalType: "address", name: "caller", type: "address" },
    ],
    name: "setClaimer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "reward", type: "address" },
      { internalType: "uint32", name: "newDistributionEnd", type: "uint32" },
    ],
    name: "setDistributionEnd",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address[]", name: "rewards", type: "address[]" },
      { internalType: "uint88[]", name: "newEmissionsPerSecond", type: "uint88[]" },
    ],
    name: "setEmissionPerSecond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "reward", type: "address" },
      { internalType: "contract IEACAggregatorProxy", name: "rewardOracle", type: "address" },
    ],
    name: "setRewardOracle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "reward", type: "address" },
      { internalType: "contract ITransferStrategyBase", name: "transferStrategy", type: "address" },
    ],
    name: "setTransferStrategy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export async function getAllUserRewards(
  client: Client,
  args: Viem.ContractCallParameters<{
    incentivesProvider: Address;
    assets: ReadonlyArray<Address>;
    user: Address;
  }>,
) {
  const [rewardsList, unclaimedAmounts] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: incentivesProviderAbi,
    functionName: "getAllUserRewards",
    address: args.incentivesProvider,
    args: [args.assets, args.user],
  });

  return { rewardsList, unclaimedAmounts };
}

export async function getRewardsData(
  client: Client,
  args: Viem.ContractCallParameters<{
    incentivesProvider: Address;
    asset: Address;
    user: Address;
  }>,
) {
  const [emissionPerSecond, index, lastUpdateTimestamp, distributionEnd] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: incentivesProviderAbi,
    functionName: "getRewardsData",
    address: args.incentivesProvider,
    args: [args.asset, args.user],
  });

  return { emissionPerSecond, index, lastUpdateTimestamp, distributionEnd };
}

const protocolDataProviderAbi = [
  {
    inputs: [{ internalType: "contract IPoolAddressesProvider", name: "addressesProvider", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ADDRESSES_PROVIDER",
    outputs: [{ internalType: "contract IPoolAddressesProvider", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getATokenTotalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllATokens",
    outputs: [
      {
        components: [
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct IPoolDataProvider.TokenData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllReservesTokens",
    outputs: [
      {
        components: [
          { internalType: "string", name: "symbol", type: "string" },
          { internalType: "address", name: "tokenAddress", type: "address" },
        ],
        internalType: "struct IPoolDataProvider.TokenData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getDebtCeiling",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getDebtCeilingDecimals",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getFlashLoanEnabled",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getInterestRateStrategyAddress",
    outputs: [{ internalType: "address", name: "irStrategyAddress", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getLiquidationProtocolFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getPaused",
    outputs: [{ internalType: "bool", name: "isPaused", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveCaps",
    outputs: [
      { internalType: "uint256", name: "borrowCap", type: "uint256" },
      { internalType: "uint256", name: "supplyCap", type: "uint256" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveConfigurationData",
    outputs: [
      { internalType: "uint256", name: "decimals", type: "uint256" },
      { internalType: "uint256", name: "ltv", type: "uint256" },
      { internalType: "uint256", name: "liquidationThreshold", type: "uint256" },
      { internalType: "uint256", name: "liquidationBonus", type: "uint256" },
      { internalType: "uint256", name: "reserveFactor", type: "uint256" },
      { internalType: "bool", name: "usageAsCollateralEnabled", type: "bool" },
      { internalType: "bool", name: "borrowingEnabled", type: "bool" },
      { internalType: "bool", name: "stableBorrowRateEnabled", type: "bool" },
      { internalType: "bool", name: "isActive", type: "bool" },
      { internalType: "bool", name: "isFrozen", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveData",
    outputs: [
      { internalType: "uint256", name: "unbacked", type: "uint256" },
      { internalType: "uint256", name: "accruedToTreasuryScaled", type: "uint256" },
      { internalType: "uint256", name: "totalAToken", type: "uint256" },
      { internalType: "uint256", name: "totalStableDebt", type: "uint256" },
      { internalType: "uint256", name: "totalVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "liquidityRate", type: "uint256" },
      { internalType: "uint256", name: "variableBorrowRate", type: "uint256" },
      { internalType: "uint256", name: "stableBorrowRate", type: "uint256" },
      { internalType: "uint256", name: "averageStableBorrowRate", type: "uint256" },
      { internalType: "uint256", name: "liquidityIndex", type: "uint256" },
      { internalType: "uint256", name: "variableBorrowIndex", type: "uint256" },
      { internalType: "uint40", name: "lastUpdateTimestamp", type: "uint40" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveEModeCategory",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getReserveTokensAddresses",
    outputs: [
      { internalType: "address", name: "aTokenAddress", type: "address" },
      { internalType: "address", name: "stableDebtTokenAddress", type: "address" },
      { internalType: "address", name: "variableDebtTokenAddress", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getSiloedBorrowing",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getTotalDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "asset", type: "address" }],
    name: "getUnbackedMintCap",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "asset", type: "address" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "getUserReserveData",
    outputs: [
      { internalType: "uint256", name: "currentATokenBalance", type: "uint256" },
      { internalType: "uint256", name: "currentStableDebt", type: "uint256" },
      { internalType: "uint256", name: "currentVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "principalStableDebt", type: "uint256" },
      { internalType: "uint256", name: "scaledVariableDebt", type: "uint256" },
      { internalType: "uint256", name: "stableBorrowRate", type: "uint256" },
      { internalType: "uint256", name: "liquidityRate", type: "uint256" },
      { internalType: "uint40", name: "stableRateLastUpdated", type: "uint40" },
      { internalType: "bool", name: "usageAsCollateralEnabled", type: "bool" },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getReserveCaps(
  client: Client,
  args: Viem.ContractCallParameters<{
    protocolDataProvider: Address;
    asset: Address;
  }>,
) {
  const [[supplyCap, borrowCap], decimals] = await Promise.all([
    readContract(client, {
      ...Viem.extractBlockParameters(args),
      abi: protocolDataProviderAbi,
      functionName: "getReserveCaps",
      address: args.protocolDataProvider,
      args: [args.asset],
    }),
    Asset.getDecimals(client, { asset: args.asset }),
  ]);

  return {
    supplyCap: parseUnits(supplyCap.toString(), Number(decimals)),
    borrowCap: parseUnits(borrowCap.toString(), Number(decimals)),
  };
}

export async function getReserveData(
  client: Client,
  args: Viem.ContractCallParameters<{
    protocolDataProvider: Address;
    asset: Address;
  }>,
) {
  const [
    unbacked,
    accruedToTreasuryScaled,
    totalAToken,
    totalStableDebt,
    totalVariableDebt,
    liquidityRate,
    variableBorrowRate,
    stableBorrowRate,
    averageStableBorrowRate,
    liquidityIndex,
    variableBorrowIndex,
    lastUpdateTimestamp,
  ] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: protocolDataProviderAbi,
    functionName: "getReserveData",
    address: args.protocolDataProvider,
    args: [args.asset],
  });

  return {
    unbacked,
    accruedToTreasuryScaled,
    totalAToken,
    totalStableDebt,
    totalVariableDebt,
    liquidityRate,
    variableBorrowRate,
    stableBorrowRate,
    averageStableBorrowRate,
    liquidityIndex,
    variableBorrowIndex,
    lastUpdateTimestamp,
  };
}

export async function getAvailableSupplyAmount(
  client: Client,
  args: Viem.ContractCallParameters<{
    protocolDataProvider: Address;
    asset: Address;
  }>,
) {
  const [reserveCaps, reserveData] = await Promise.all([getReserveCaps(client, args), getReserveData(client, args)]);

  return reserveCaps.supplyCap - reserveData.totalAToken;
}
