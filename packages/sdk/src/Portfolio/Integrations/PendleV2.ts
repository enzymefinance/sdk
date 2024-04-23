import { type Address, type Hex, type PublicClient, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract, simulateContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  BuyPrincipalToken: 0n,
  SellPrincipalToken: 1n,
  AddLiquidity: 2n,
  RemoveLiquidity: 3n,
  ClaimRewards: 4n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// BUY PRINCIPLE TOKEN
//--------------------------------------------------------------------------------------------

export const buyPrincipleToken = ExternalPositionManager.makeUse(Action.BuyPrincipalToken, buyPrincipleTokenEncode);
export const createAndBuyPrincipleToken = ExternalPositionManager.makeCreateAndUse(
  Action.BuyPrincipalToken,
  buyPrincipleTokenEncode,
);

const buyPrincipleTokenEncoding = [
  {
    name: "market",
    type: "address",
  },
  {
    name: "depositTokenAddress",
    type: "address",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    components: [
      { name: "guessMin", type: "uint256" },
      { name: "guessMax", type: "uint256" },
      { name: "guessOffchain", type: "uint256" },
      { name: "maxIteration", type: "uint256" },
      { name: "eps", type: "uint256" },
    ],
    internalType: "struct IPendleV2Router.ApproxParams",
    name: "guessPtOut",
    type: "tuple",
  },
  {
    name: "minPtOut",
    type: "uint256",
  },
] as const;

type ApproxParams = {
  guessMin: bigint;
  guessMax: bigint;
  guessOffchain: bigint;
  maxIteration: bigint;
  eps: bigint;
};

export type BuyPrincipleTokenArgs = {
  market: Address;
  depositTokenAddress: Address;
  depositAmount: bigint;
  guessPtOut: ApproxParams;
  minPtOut: bigint;
};

export function buyPrincipleTokenEncode(args: BuyPrincipleTokenArgs): Hex {
  return encodeAbiParameters(buyPrincipleTokenEncoding, [
    args.market,
    args.depositTokenAddress,
    args.depositAmount,
    args.guessPtOut,
    args.minPtOut,
  ]);
}

export function buyPrincipleTokenDecode(encoded: Hex): BuyPrincipleTokenArgs {
  const [market, depositTokenAddress, depositAmount, guessPtOut, minPtOut] = decodeAbiParameters(
    buyPrincipleTokenEncoding,
    encoded,
  );

  return {
    market,
    depositTokenAddress,
    depositAmount,
    guessPtOut,
    minPtOut,
  };
}

//--------------------------------------------------------------------------------------------
// SELL PRINCIPLE TOKEN
//--------------------------------------------------------------------------------------------

export const sellPrincipleToken = ExternalPositionManager.makeUse(Action.SellPrincipalToken, sellPrincipleTokenEncode);

const sellPrincipleTokenEncoding = [
  {
    name: "market",
    type: "address",
  },
  {
    name: "withdrawalTokenAddress",
    type: "address",
  },
  {
    name: "withdrawalAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type SellPrincipleTokenArgs = {
  market: Address;
  withdrawalTokenAddress: Address;
  withdrawalAmount: bigint;
  minIncomingAmount: bigint;
};

export function sellPrincipleTokenEncode(args: SellPrincipleTokenArgs): Hex {
  return encodeAbiParameters(sellPrincipleTokenEncoding, [
    args.market,
    args.withdrawalTokenAddress,
    args.withdrawalAmount,
    args.minIncomingAmount,
  ]);
}

export function sellPrincipleTokenDecode(encoded: Hex): SellPrincipleTokenArgs {
  const [market, withdrawalTokenAddress, withdrawalAmount, minIncomingAmount] = decodeAbiParameters(
    sellPrincipleTokenEncoding,
    encoded,
  );

  return {
    market,
    withdrawalTokenAddress,
    withdrawalAmount,
    minIncomingAmount,
  };
}

//--------------------------------------------------------------------------------------------
// ADD LIQUIDITY
//--------------------------------------------------------------------------------------------

export const addLiquidity = ExternalPositionManager.makeUse(Action.AddLiquidity, addLiquidityEncode);
export const createAndAddLiquidity = ExternalPositionManager.makeCreateAndUse(Action.AddLiquidity, addLiquidityEncode);

const addLiquidityEncoding = [
  {
    name: "market",
    type: "address",
  },
  {
    name: "depositTokenAddress",
    type: "address",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    components: [
      { name: "guessMin", type: "uint256" },
      { name: "guessMax", type: "uint256" },
      { name: "guessOffchain", type: "uint256" },
      { name: "maxIteration", type: "uint256" },
      { name: "eps", type: "uint256" },
    ],
    internalType: "struct IPendleV2Router.ApproxParams",
    name: "guessPtReceived",
    type: "tuple",
  },
  {
    name: "minLpOut",
    type: "uint256",
  },
] as const;

export type AddLiquidityArgs = {
  market: Address;
  depositTokenAddress: Address;
  depositAmount: bigint;
  guessPtReceived: ApproxParams;
  minLpOut: bigint;
};

export function addLiquidityEncode(args: AddLiquidityArgs): Hex {
  return encodeAbiParameters(addLiquidityEncoding, [
    args.market,
    args.depositTokenAddress,
    args.depositAmount,
    args.guessPtReceived,
    args.minLpOut,
  ]);
}

export function addLiquidityDecode(encoded: Hex): AddLiquidityArgs {
  const [market, depositTokenAddress, depositAmount, guessPtReceived, minLpOut] = decodeAbiParameters(
    addLiquidityEncoding,
    encoded,
  );

  return {
    market,
    depositTokenAddress,
    depositAmount,
    guessPtReceived,
    minLpOut,
  };
}

//--------------------------------------------------------------------------------------------
// REMOVE LIQUIDITY
//--------------------------------------------------------------------------------------------

export const removeLiquidity = ExternalPositionManager.makeUse(Action.RemoveLiquidity, addLiquidityEncode);

const removeLiquidityEncoding = [
  {
    name: "market",
    type: "address",
  },
  {
    name: "withdrawalTokenAddress",
    type: "address",
  },
  {
    name: "withdrawalAmount",
    type: "uint256",
  },
  {
    name: "minSyOut",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type RemoveLiquidityArgs = {
  market: Address;
  withdrawalTokenAddress: Address;
  withdrawalAmount: bigint;
  minSyOut: bigint;
  minIncomingAmount: bigint;
};

export function removeLiquidityEncode(args: RemoveLiquidityArgs): Hex {
  return encodeAbiParameters(removeLiquidityEncoding, [
    args.market,
    args.withdrawalTokenAddress,
    args.withdrawalAmount,
    args.minSyOut,
    args.minIncomingAmount,
  ]);
}

export function removeLiquidityDecode(encoded: Hex): RemoveLiquidityArgs {
  const [market, withdrawalTokenAddress, withdrawalAmount, minSyOut, minIncomingAmount] = decodeAbiParameters(
    removeLiquidityEncoding,
    encoded,
  );

  return {
    market,
    withdrawalTokenAddress,
    withdrawalAmount,
    minSyOut,
    minIncomingAmount,
  };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

export const claimRewards = ExternalPositionManager.makeUse(Action.ClaimRewards, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    name: "marketAddresses",
    type: "address[]",
  },
] as const;

export type ClaimRewardsArgs = {
  marketAddresses: ReadonlyArray<Address>;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.marketAddresses]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [marketAddresses] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return {
    marketAddresses,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function readTokensForMarket(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pendleMarket: Address;
  }>,
) {
  const [sy, pt, yt] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function readTokens() external view returns (address,address,address)"]),
    functionName: "readTokens",
    address: args.pendleMarket,
  });

  return { sy, pt, yt };
}

export function getRewardTokensForMarket(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pendleMarket: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getRewardTokens() external view returns (address[] memory rewardsTokens_)"]),
    functionName: "getRewardTokens",
    address: args.pendleMarket,
  });
}

export async function simulateRedeemRewardsForMarket(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pendleMarket: Address;
    user: Address;
  }>,
) {
  const { result } = await simulateContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function redeemRewards(address _user) external returns (uint256[] memory rewardAmounts_)"]),
    functionName: "redeemRewards",
    address: args.pendleMarket,
    args: [args.user],
  });

  return result;
}

export async function getRewardsForMarket(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pendleMarket: Address;
    user: Address;
  }>,
) {
  const [rewardTokens, rewardAmounts] = await Promise.all([
    getRewardTokensForMarket(client, args),
    simulateRedeemRewardsForMarket(client, args),
  ]);

  return rewardTokens.map((token, index) => ({ token, amount: rewardAmounts[index] }));
}

export async function getOracleState(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    pendlePtLpOracle: Address;
    pendleMarket: Address;
    duration: number;
  }>,
) {
  const [increaseCardinalityRequired, cardinalityRequired, oldestObservationSatisfied] = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function getOracleState(address market, uint32 duration) external view returns (bool increaseCardinalityRequired, uint16 cardinalityRequired, bool oldestObservationSatisfied)",
    ]),
    functionName: "getOracleState",
    address: args.pendlePtLpOracle,
    args: [args.pendleMarket, args.duration],
  });

  return { increaseCardinalityRequired, cardinalityRequired, oldestObservationSatisfied };
}

export function getSyTokensIn(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    syToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getTokensIn() external view returns (address[] memory tokensIn)"]),
    functionName: "getTokensIn",
    address: args.syToken,
  });
}

export function getSyTokensOut(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    syToken: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getTokensOut() external view returns (address[] memory tokensOut)"]),
    functionName: "getTokensOut",
    address: args.syToken,
  });
}
