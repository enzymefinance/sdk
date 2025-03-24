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
  ClaimRewards: 6n,
  Sweep: 7n,
  ClaimMerklRewards: 8n,
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
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

export const claimRewards = ExternalPositionManager.makeUse(Action.ClaimRewards, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    name: "assets",
    type: "address[]",
  },
  {
    name: "amount",
    type: "uint256",
  },
  {
    name: "rewardToken",
    type: "address",
  },
] as const;

export type ClaimRewardsArgs = {
  assets: ReadonlyArray<Address>;
  amount: bigint;
  rewardToken: Address;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.assets, args.amount, args.rewardToken]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [assets, amount, rewardToken] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return {
    assets,
    amount,
    rewardToken,
  };
}

//--------------------------------------------------------------------------------------------
// SWEEP
//--------------------------------------------------------------------------------------------

export const sweep = ExternalPositionManager.makeUse(Action.Sweep, sweepEncode);

const sweepEncoding = [
  {
    name: "assets",
    type: "address[]",
  },
] as const;

export type SweepArgs = {
  assets: ReadonlyArray<Address>;
};

export function sweepEncode(args: SweepArgs): Hex {
  return encodeAbiParameters(sweepEncoding, [args.assets]);
}

export function sweepDecode(encoded: Hex): SweepArgs {
  const [assets] = decodeAbiParameters(sweepEncoding, encoded);

  return {
    assets,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM MERKL REWARDS
//--------------------------------------------------------------------------------------------

export const claimMerklRewards = ExternalPositionManager.makeUse(Action.ClaimMerklRewards, claimMerklRewardsEncode);

const claimMerklRewardsEncoding = [
  {
    name: "tokens",
    type: "address[]",
  },
  {
    name: "amounts",
    type: "uint256[]",
  },
  {
    name: "proofs",
    type: "bytes32[][]",
  },
] as const;

export type ClaimMerklRewardsArgs = {
  tokens: ReadonlyArray<Address>;
  amounts: ReadonlyArray<bigint>;
  proofs: ReadonlyArray<ReadonlyArray<Hex>>;
};

export function claimMerklRewardsEncode(args: ClaimMerklRewardsArgs): Hex {
  return encodeAbiParameters(claimMerklRewardsEncoding, [args.tokens, args.amounts, args.proofs]);
}

export function claimMerklRewardsDecode(encoded: Hex): ClaimMerklRewardsArgs {
  const [tokens, amounts, proofs] = decodeAbiParameters(claimMerklRewardsEncoding, encoded);

  return {
    tokens,
    amounts,
    proofs,
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

const rewardsControllerAbi = [
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
] as const;

export async function getAllUserRewards(
  client: Client,
  args: Viem.ContractCallParameters<{
    rewardsController: Address;
    assets: ReadonlyArray<Address>;
    user: Address;
  }>,
) {
  const [rewardsList, unclaimedAmounts] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: rewardsControllerAbi,
    functionName: "getAllUserRewards",
    address: args.rewardsController,
    args: [args.assets, args.user],
  });

  return { rewardsList, unclaimedAmounts };
}

export function getRewardsByAsset(
  client: Client,
  args: Viem.ContractCallParameters<{
    rewardsController: Address;
    asset: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: rewardsControllerAbi,
    functionName: "getRewardsByAsset",
    address: args.rewardsController,
    args: [args.asset],
  });
}

export async function getRewardsData(
  client: Client,
  args: Viem.ContractCallParameters<{
    rewardsController: Address;
    asset: Address;
    reward: Address;
  }>,
) {
  const [index, emissionPerSecond, lastUpdateTimestamp, distributionEnd] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: rewardsControllerAbi,
    functionName: "getRewardsData",
    address: args.rewardsController,
    args: [args.asset, args.reward],
  });

  return { emissionPerSecond, index, lastUpdateTimestamp, distributionEnd };
}

const protocolDataProviderAbi = [
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
    decimals: number;
  }>,
) {
  const [reserveCaps, reserveData] = await Promise.all([getReserveCaps(client, args), getReserveData(client, args)]);

  return reserveCaps.supplyCap - reserveData.totalAToken;
}

export async function getAvailableVariableDebtAmount(
  client: Client,
  args: Viem.ContractCallParameters<{
    protocolDataProvider: Address;
    asset: Address;
    decimals: number;
  }>,
) {
  const [reserveCaps, reserveData] = await Promise.all([getReserveCaps(client, args), getReserveData(client, args)]);

  return reserveCaps.borrowCap - reserveData.totalVariableDebt;
}

const uiIncentiveDataProviderAbi = [
  {
    inputs: [{ internalType: "contract IPoolAddressesProvider", name: "provider", type: "address" }],
    name: "getReservesIncentivesData",
    outputs: [
      {
        components: [
          { internalType: "address", name: "underlyingAsset", type: "address" },
          {
            components: [
              { internalType: "address", name: "tokenAddress", type: "address" },
              { internalType: "address", name: "incentiveControllerAddress", type: "address" },
              {
                components: [
                  { internalType: "string", name: "rewardTokenSymbol", type: "string" },
                  { internalType: "address", name: "rewardTokenAddress", type: "address" },
                  { internalType: "address", name: "rewardOracleAddress", type: "address" },
                  { internalType: "uint256", name: "emissionPerSecond", type: "uint256" },
                  { internalType: "uint256", name: "incentivesLastUpdateTimestamp", type: "uint256" },
                  { internalType: "uint256", name: "tokenIncentivesIndex", type: "uint256" },
                  { internalType: "uint256", name: "emissionEndTimestamp", type: "uint256" },
                  { internalType: "int256", name: "rewardPriceFeed", type: "int256" },
                  { internalType: "uint8", name: "rewardTokenDecimals", type: "uint8" },
                  { internalType: "uint8", name: "precision", type: "uint8" },
                  { internalType: "uint8", name: "priceFeedDecimals", type: "uint8" },
                ],
                internalType: "struct IUiIncentiveDataProviderV3.RewardInfo[]",
                name: "rewardsTokenInformation",
                type: "tuple[]",
              },
            ],
            internalType: "struct IUiIncentiveDataProviderV3.IncentiveData",
            name: "aIncentiveData",
            type: "tuple",
          },
          {
            components: [
              { internalType: "address", name: "tokenAddress", type: "address" },
              { internalType: "address", name: "incentiveControllerAddress", type: "address" },
              {
                components: [
                  { internalType: "string", name: "rewardTokenSymbol", type: "string" },
                  { internalType: "address", name: "rewardTokenAddress", type: "address" },
                  { internalType: "address", name: "rewardOracleAddress", type: "address" },
                  { internalType: "uint256", name: "emissionPerSecond", type: "uint256" },
                  { internalType: "uint256", name: "incentivesLastUpdateTimestamp", type: "uint256" },
                  { internalType: "uint256", name: "tokenIncentivesIndex", type: "uint256" },
                  { internalType: "uint256", name: "emissionEndTimestamp", type: "uint256" },
                  { internalType: "int256", name: "rewardPriceFeed", type: "int256" },
                  { internalType: "uint8", name: "rewardTokenDecimals", type: "uint8" },
                  { internalType: "uint8", name: "precision", type: "uint8" },
                  { internalType: "uint8", name: "priceFeedDecimals", type: "uint8" },
                ],
                internalType: "struct IUiIncentiveDataProviderV3.RewardInfo[]",
                name: "rewardsTokenInformation",
                type: "tuple[]",
              },
            ],
            internalType: "struct IUiIncentiveDataProviderV3.IncentiveData",
            name: "vIncentiveData",
            type: "tuple",
          },
        ],
        internalType: "struct IUiIncentiveDataProviderV3.AggregatedReserveIncentiveData[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function getReservesIncentivesData(
  client: Client,
  args: Viem.ContractCallParameters<{
    uiIncentiveDataProvider: Address;
    poolAddressProvider: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: uiIncentiveDataProviderAbi,
    functionName: "getReservesIncentivesData",
    address: args.uiIncentiveDataProvider,
    args: [args.poolAddressProvider],
  });
}
