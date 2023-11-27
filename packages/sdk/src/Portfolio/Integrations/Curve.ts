import {
  type Address,
  ContractFunctionExecutionError,
  type Hex,
  PublicClient,
  decodeAbiParameters,
  encodeAbiParameters,
  isAddressEqual,
  parseAbi,
  parseEther,
  parseUnits,
} from "viem";
import { Assertion, Constants, Rates, Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

export const takeOrder = IntegrationManager.makeUse(IntegrationManager.Selector.TakeOrder, takeOrderEncode);

const takeOrderEncoding = [
  {
    name: "pool",
    type: "address",
  },
  {
    name: "outgoingAsset",
    type: "address",
  },
  {
    name: "outgoingAssetAmount",
    type: "uint256",
  },
  {
    name: "incomingAsset",
    type: "address",
  },
  {
    name: "minIncomingAssetAmount",
    type: "uint256",
  },
] as const;

export type TakeOrderArgs = {
  pool: Address;
  outgoingAsset: Address;
  outgoingAssetAmount: bigint;
  incomingAsset: Address;
  minIncomingAssetAmount: bigint;
};

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  return encodeAbiParameters(takeOrderEncoding, [
    args.pool,
    args.outgoingAsset,
    args.outgoingAssetAmount,
    args.incomingAsset,
    args.minIncomingAssetAmount,
  ]);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [pool, outgoingAsset, outgoingAssetAmount, incomingAsset, minIncomingAssetAmount] = decodeAbiParameters(
    takeOrderEncoding,
    encoded,
  );

  return {
    pool,
    outgoingAsset,
    outgoingAssetAmount,
    incomingAsset,
    minIncomingAssetAmount,
  };
}

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

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

export const lendAndStake = IntegrationManager.makeUse(IntegrationManager.Selector.LendAndStake, lendAndStakeEncode);

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

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

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

  // TODO: decode incomingAssetsData

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

export const claimRewards = IntegrationManager.makeUse(IntegrationManager.Selector.ClaimRewards, claimRewardsEncode);

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

export const stake = IntegrationManager.makeUse(IntegrationManager.Selector.Stake, stakeEncode);

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

export const unstake = IntegrationManager.makeUse(IntegrationManager.Selector.Unstake, unstakeEncode);

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

export const unstakeAndRedeem = IntegrationManager.makeUse(
  IntegrationManager.Selector.UnstakeAndRedeem,
  unstakeAndRedeemEncode,
);

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
// EXTERNAL READ FUNCTIONS - CURVE REGISTRY
//--------------------------------------------------------------------------------------------

const CURVE_REGISTRY = "0x0000000022d53366457f9d5e68ec105046fc4383" as const;

const curveRegistryAbi = {
  name: "get_address",
  outputs: [{ type: "address", name: "" }],
  inputs: [{ type: "uint256", name: "_id" }],
  stateMutability: "view",
  type: "function",
} as const;

const curveSwapsAbi = {
  name: "get_best_rate",
  outputs: [
    { type: "address", name: "bestPool" },
    { type: "uint256", name: "amountReceived" },
  ],
  inputs: [
    { type: "address", name: "_from" },
    { type: "address", name: "_to" },
    { type: "uint256", name: "_amount" },
  ],
  stateMutability: "view",
  type: "function",
} as const;

const erc20Abi = {
  name: "name",
  outputs: [{ type: "string", name: "" }],
  inputs: [],
  stateMutability: "view",
  type: "function",
} as const;

const swapId = 2n; // id won't change, for swaps it will be always the same id in the registry

export async function getBestPrice(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    incoming: Address;
    outgoing: Address;
    quantity: bigint;
    weth: Address;
  }>,
) {
  const curveSwaps = await Viem.readContract(client, args, {
    abi: [curveRegistryAbi],
    functionName: "get_address",
    address: CURVE_REGISTRY,
    args: [swapId],
  });

  const curveOutgoing = isAddressEqual(args.outgoing, args.weth) ? Constants.ETH_ADDRESS : args.outgoing;
  const curveIncoming = isAddressEqual(args.incoming, args.weth) ? Constants.ETH_ADDRESS : args.incoming;

  const [bestPool, amountReceived] = await client.readContract({
    abi: [curveSwapsAbi],
    address: curveSwaps,
    functionName: "get_best_rate",
    args: [curveOutgoing, curveIncoming, args.quantity],
  });

  const amount = amountReceived;
  const price = amount / args.quantity;

  let poolName;
  try {
    // not all pools support this method, this is why we need to catch the error
    poolName = await client.readContract({
      abi: [erc20Abi],
      address: bestPool,
      functionName: "name",
    });
  } catch (error) {
    if (!(error instanceof ContractFunctionExecutionError)) {
      throw error;
    }
  }

  return {
    amount,
    poolName,
    pool: bestPool,
    price,
  };
}

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

export async function isSingleAssetRedemptionAllowed(
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

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - CURVE POOL
//--------------------------------------------------------------------------------------------

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

  // Some curve pools don't allow to withdraw single token.
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

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - GAUGE
//--------------------------------------------------------------------------------------------

export async function getClaimableTokens(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    curveGauge: Address;
    user: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: parseAbi(["function claimable_tokens(address addr) nonpayable returns (uint256)"]),
    functionName: "claimable_tokens",
    address: args.curveGauge,
    args: [args.user],
  });

  return result;
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS - MINTER
//--------------------------------------------------------------------------------------------

export async function isAllowedToMintFor(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    curveMinter: Address;
    vault: Address;
    adapter: Address;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: parseAbi(["function allowed_to_mint_for(address args0, address arg1) payable returns (bool)"]),
    functionName: "allowed_to_mint_for",
    address: args.curveMinter,
    args: [args.adapter, args.vault],
  });

  return result;
}
