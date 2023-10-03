import { Assertion, Rates, Viem } from "@enzymefinance/sdk/Utils";
import * as IntegrationManager from "@enzymefinance/sdk/internal/IntegrationManager";
import {
  type Address,
  ContractFunctionExecutionError,
  type Hex,
  type PublicClient,
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbi,
  parseEther,
  parseUnits,
} from "viem";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

const lendSelector = "0x099f7515"; // lend(address,bytes,bytes)
export const lend = IntegrationManager.makeUse(lendSelector, lendEncode);

const lendEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "orderedOutgoingAssetAmounts",
    type: "uint256[]",
  },
  {
    name: "minIncomingLpTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
] as const;

export type LendArgs = {
  pool: Address;
  orderedOutgoingAssetAmounts: ReadonlyArray<bigint>;
  minIncomingLpTokenAmount: bigint;
  useUnderlyings: boolean;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [
    args.pool,
    args.orderedOutgoingAssetAmounts,
    args.minIncomingLpTokenAmount,
    args.useUnderlyings,
  ]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [pool, orderedOutgoingAssetAmounts, minIncomingLpTokenAmount, useUnderlyings] = decodeAbiParameters(
    lendEncoding,
    encoded,
  );

  return {
    pool,
    orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
    minIncomingLpTokenAmount,
    useUnderlyings,
  };
}

//--------------------------------------------------------------------------------------------
// LEND AND STAKE
//--------------------------------------------------------------------------------------------

const lendAndStakeSelector = "0x29fa046e"; // lendAndStake(address,bytes,bytes)
export const lendAndStake = IntegrationManager.makeUse(lendAndStakeSelector, lendAndStakeEncode);

const lendAndStakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "orderedOutgoingAssetAmounts",
    type: "uint256[]",
  },
  {
    name: "incomingStakingToken",
    type: "address",
  },
  {
    name: "minIncomingStakingTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
] as const;

export type LendAndStakeArgs = {
  pool: Address;
  orderedOutgoingAssetAmounts: ReadonlyArray<bigint>;
  incomingStakingToken: Address;
  minIncomingStakingTokenAmount: bigint;
  useUnderlyings: boolean;
};

export function lendAndStakeEncode(args: LendAndStakeArgs): Hex {
  return encodeAbiParameters(lendAndStakeEncoding, [
    args.pool,
    args.orderedOutgoingAssetAmounts,
    args.incomingStakingToken,
    args.minIncomingStakingTokenAmount,
    args.useUnderlyings,
  ]);
}

export function lendAndStakeDecode(encoded: Hex): LendAndStakeArgs {
  const [pool, orderedOutgoingAssetAmounts, incomingStakingToken, minIncomingStakingTokenAmount, useUnderlyings] =
    decodeAbiParameters(lendAndStakeEncoding, encoded);

  return {
    pool,
    orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
    incomingStakingToken,
    minIncomingStakingTokenAmount,
    useUnderlyings,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

const redeemSelector = "0xc29fa9dd"; // redeem(address,bytes,bytes)
export const redeem = IntegrationManager.makeUse(redeemSelector, redeemEncode);

const redeemEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingLpTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
  {
    name: "redeemType",
    type: "uint8",
  },
  {
    name: "incomingAssetsData",
    type: "bytes",
  },
] as const;

export type RedeemType = typeof RedeemType[keyof typeof RedeemType];
export const RedeemType = {
  Standard: 0,
  OneCoin: 1,
} as const;

export type RedeemArgs = {
  pool: Address;
  outgoingLpTokenAmount: bigint;
  useUnderlyings: boolean;
  redeemType: RedeemType;
  incomingAssetsData: Hex;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [
    args.pool,
    args.outgoingLpTokenAmount,
    args.useUnderlyings,
    args.redeemType,
    args.incomingAssetsData,
  ]);
}

export function isValidRedeemType(value: number): value is RedeemType {
  return !Object.values(RedeemType).includes(value as RedeemType);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [pool, outgoingLpTokenAmount, useUnderlyings, redeemType, incomingAssetsData] = decodeAbiParameters(
    redeemEncoding,
    encoded,
  );

  if (!isValidRedeemType(redeemType)) {
    Assertion.invariant(false, "Invalid redeem type");
  }

  return {
    pool,
    outgoingLpTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

const claimRewardsSelector = "0xb9dfbacc"; // claimRewards(address,bytes,bytes)
export const claimRewards = IntegrationManager.makeUse(claimRewardsSelector, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    name: "stakingToken",
    type: "address",
  },
] as const;

export type ClaimRewardsArgs = {
  stakingToken: Address;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.stakingToken]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [stakingToken] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return { stakingToken };
}

//--------------------------------------------------------------------------------------------
// STAKE
//--------------------------------------------------------------------------------------------

const stakeSelector = "0xfa7dd04d"; // stake(address,bytes,bytes)
export const stake = IntegrationManager.makeUse(stakeSelector, stakeEncode);

const stakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "incomingStakingToken",
    type: "address",
  },
  {
    name: "amount",
    type: "uint256",
  },
] as const;

export type StakeArgs = {
  pool: Address;
  incomingStakingToken: Address;
  amount: bigint;
};

export function stakeEncode(args: StakeArgs): Hex {
  return encodeAbiParameters(stakeEncoding, [args.pool, args.incomingStakingToken, args.amount]);
}

export function stakeDecode(encoded: Hex): StakeArgs {
  const [pool, incomingStakingToken, amount] = decodeAbiParameters(stakeEncoding, encoded);

  return { pool, incomingStakingToken, amount };
}

//--------------------------------------------------------------------------------------------
// UNSTAKE
//--------------------------------------------------------------------------------------------

const unstakeSelector = "0x68e30677"; // unstake(address,bytes,bytes)
export const unstake = IntegrationManager.makeUse(unstakeSelector, unstakeEncode);

const unstakeEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingStakingToken",
    type: "address",
  },
  {
    name: "amount",
    type: "uint256",
  },
] as const;

export type UnstakeArgs = {
  pool: Address;
  outgoingStakingToken: Address;
  amount: bigint;
};

export function unstakeEncode(args: UnstakeArgs): Hex {
  return encodeAbiParameters(unstakeEncoding, [args.pool, args.outgoingStakingToken, args.amount]);
}

export function unstakeDecode(encoded: Hex): UnstakeArgs {
  const [pool, outgoingStakingToken, amount] = decodeAbiParameters(unstakeEncoding, encoded);

  return { pool, outgoingStakingToken, amount };
}

//--------------------------------------------------------------------------------------------
// UNSTAKE AND REDEEM
//--------------------------------------------------------------------------------------------

const unstakeAndRedeemSelector = "0x8334eb99"; // unstakeAndRedeem(address,bytes,bytes)
export const unstakeAndRedeem = IntegrationManager.makeUse(unstakeAndRedeemSelector, unstakeAndRedeemEncode);

const unstakeAndRedeemEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingStakingToken",
    type: "address",
  },
  {
    name: "outgoingStakingTokenAmount",
    type: "uint256",
  },
  {
    name: "useUnderlyings",
    type: "bool",
  },
  {
    name: "redeemType",
    type: "uint8",
  },
  {
    name: "incomingAssetsData",
    type: "bytes",
  },
] as const;

export type UnstakeAndRedeemArgs = {
  pool: Address;
  outgoingStakingToken: Address;
  outgoingStakingTokenAmount: bigint;
  useUnderlyings: boolean;
  redeemType: RedeemType;
  incomingAssetsData: Hex;
};

export function unstakeAndRedeemEncode(args: UnstakeAndRedeemArgs): Hex {
  return encodeAbiParameters(unstakeAndRedeemEncoding, [
    args.pool,
    args.outgoingStakingToken,
    args.outgoingStakingTokenAmount,
    args.useUnderlyings,
    args.redeemType,
    args.incomingAssetsData,
  ]);
}

export function unstakeAndRedeemDecode(encoded: Hex): UnstakeAndRedeemArgs {
  const [pool, outgoingStakingToken, outgoingStakingTokenAmount, useUnderlyings, redeemType, incomingAssetsData] =
    decodeAbiParameters(unstakeAndRedeemEncoding, encoded);

  if (!isValidRedeemType(redeemType)) {
    Assertion.invariant(false, "Invalid redeem type");
  }

  return {
    pool,
    outgoingStakingToken,
    outgoingStakingTokenAmount,
    useUnderlyings,
    redeemType,
    incomingAssetsData,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL CONTRACT METHODS
//--------------------------------------------------------------------------------------------

const calcWithdrawOneCoinAbi = {
  name: "calc_withdraw_one_coin",
  outputs: [{ type: "uint256", name: "" }],
  inputs: [
    { type: "uint256", name: "_token_amount" },
    { type: "int128", name: "i" },
  ],
  constant: true,
  payable: false,
  type: "function",
  stateMutability: "view",
} as const;

export async function doesCurvePoolAllowSingleAssetRedemption(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pool: Address;
  }>,
) {
  const tokenAmount = 1n;
  const tokenIndex = 0n;

  try {
    await Viem.readContract(client, args, {
      abi: [calcWithdrawOneCoinAbi],
      functionName: "calc_withdraw_one_coin",
      address: args.pool,
      args: [tokenAmount, tokenIndex],
    });

    return true;
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      return false;
    }
    throw error;
  }
}

//--------------------------------------------------------------------------------------------
// EXTERNAL CONTRACT METHODS
//--------------------------------------------------------------------------------------------

export async function getExpectedGaugeTokens(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    curvePool: Address;
    tokenAmounts: bigint[];
    isDeposit: boolean;
  }>,
) {
  const abi = parseAbi([
    `function calc_token_amount(uint256[${args.tokenAmounts.length}] _amounts, bool _is_deposit) returns (uint256)`,
  ] as const);

  const { result } = await Viem.simulateContract(client, args, {
    abi,
    functionName: "calc_token_amount",
    address: args.curvePool,
    args: [args.tokenAmounts, args.isDeposit],
  });

  return result;
}

const curvePoolAbi = [
  {
    stateMutability: "view",
    type: "function",
    name: "calc_withdraw_one_coin",
    inputs: [
      { name: "_token_amount", type: "uint256" },
      { name: "i", type: "int128" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

const lpTokenAbi = [
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
] as const;

const balancesUint256Signature = "function balances(uint256 i) view returns(uint256)" as const;

export async function getExpectedWithdrawalTokens(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    curvePool: Address;
    singleTokenIndex: bigint;
    underlyingAssetsDecimals: number[];
    lpToken: Address;
    lpTokenAmount: bigint;
    equalProportion: boolean;
  }>,
) {
  let singleTokenAllowed = true;
  let expectedSingleToken;

  // Some curve pools doesn't allow to withdraw single token.
  // We try to determine here which ones allows that.
  try {
    expectedSingleToken = await Viem.readContract(client, args, {
      abi: curvePoolAbi,
      functionName: "calc_withdraw_one_coin",
      address: args.curvePool,
      args: [args.lpTokenAmount, args.singleTokenIndex],
    });
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      singleTokenAllowed = false;
    } else {
      throw error;
    }
  }

  let isBalancesUint256 = true;
  // Curve pools has different balances interface, some of them expect input as uint256, and some int128.
  // We try to determine here which one is the particular curve pool.
  try {
    await Viem.readContract(client, args, {
      abi: parseAbi([balancesUint256Signature]),
      functionName: "balances",
      address: args.curvePool,
      args: [0n], // try to read first token balance
    });
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      isBalancesUint256 = false;
    } else {
      throw error;
    }
  }

  const numberOfCoins = args.underlyingAssetsDecimals.length;

  // Withdraw in a single asset
  if (!args.equalProportion && expectedSingleToken !== undefined) {
    const expectedTokens = Array<bigint>(numberOfCoins).fill(0n);

    expectedTokens[Number(args.singleTokenIndex)] = expectedSingleToken;

    return { expectedTokens, singleTokenAllowed };
  }

  // Withdrawing in all assets (in "equal amounts")
  const denormalizedBalances = await Promise.all(
    Array.from({ length: numberOfCoins }, (_, index) => {
      return Viem.readContract(client, args, {
        abi: parseAbi([
          isBalancesUint256 ? balancesUint256Signature : "function balances(int128 i) view returns(uint256)",
        ]),
        functionName: "balances",
        address: args.curvePool,
        args: [BigInt(index)],
      });
    }),
  );

  const balances = denormalizedBalances.map((balance, index) => {
    const assetDecimals = args.underlyingAssetsDecimals[index];

    Assertion.invariant(assetDecimals !== undefined, "Asset decimals should be defined");
    const decimalsDelta = 18 - assetDecimals;

    return balance * parseUnits("1", decimalsDelta);
  });

  const lpTokenSupply = await Viem.readContract(client, args, {
    abi: lpTokenAbi,
    functionName: "totalSupply",
    address: args.lpToken,
  });
  const withdrawalProportion = (args.lpTokenAmount * parseEther("1")) / lpTokenSupply;

  const expectedTokens = balances.map((balance, index) => {
    const normalizedExpectedToken = Rates.multiplyByRate({ rate: balance, value: withdrawalProportion });

    const assetDecimals = args.underlyingAssetsDecimals[index];

    Assertion.invariant(assetDecimals !== undefined, "Asset decimals should be defined");
    // Denormalize the expected token to the token's native decimal scale
    const decimalsDelta = 18 - assetDecimals;

    const denormalizedExpectedToken = normalizedExpectedToken / parseUnits("1", decimalsDelta);

    return denormalizedExpectedToken;
  });

  return { expectedTokens, singleTokenAllowed };
}
