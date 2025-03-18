import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract, simulateContract } from "viem/actions";
import { Assertion, Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITION - ACTIONS
//--------------------------------------------------------------------------------------------

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  BuyPrincipalToken: 0n,
  SellPrincipalToken: 1n,
  AddLiquidity: 2n,
  RemoveLiquidity: 3n,
  ClaimRewards: 4n,
  Migrate: 5n,
} as const;

export const create = ExternalPositionManager.createOnly;

//--------------------------------------------------------------------------------------------
// EXTERNAL POSITION - BUY PRINCIPLE TOKEN
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
// EXTERNAL POSITION - SELL PRINCIPLE TOKEN
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
// EXTERNAL POSITION - ADD LIQUIDITY
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
// EXTERNAL POSITION - REMOVE LIQUIDITY
//--------------------------------------------------------------------------------------------

export const removeLiquidity = ExternalPositionManager.makeUse(Action.RemoveLiquidity, removeLiquidityEncode);

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
// EXTERNAL POSITION - CLAIM REWARDS
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
// EXTERNAL POSITION - MIGRATE
//--------------------------------------------------------------------------------------------

export const migrate = ExternalPositionManager.makeUse(Action.Migrate);

//--------------------------------------------------------------------------------------------
// ADAPTER - ACTIONS
//--------------------------------------------------------------------------------------------

export type AdapterAction = (typeof AdapterAction)[keyof typeof AdapterAction];
export const AdapterAction = {
  BuyPrincipalToken: 0n,
  SellPrincipalToken: 1n,
  AddLiquidity: 2n,
  RemoveLiquidityToUnderlying: 3n,
  RemoveLiquidityToPtAndUnderlying: 4n,
} as const;

const adapterActionEncoding = [
  {
    name: "actionId",
    type: "uint256",
  },
  {
    name: "encodedActionArgs",
    type: "bytes",
  },
] as const;

export type AdapterActionArgs = {
  actionId: AdapterAction;
  encodedActionArgs: Hex;
};

export const encodeAdapterAction = IntegrationManager.createEncodeAdapterAction<AdapterAction>();

export const decodeAdapterAction = IntegrationManager.createDecodeAdapterAction<AdapterAction, typeof AdapterAction>(
  AdapterAction,
);

//--------------------------------------------------------------------------------------------
// ADAPTER - BUY PRINCIPLE TOKEN
//--------------------------------------------------------------------------------------------

export type BuyPrincipleTokenWithAdapterArgs = BuyPrincipleTokenArgs & {
  actionId: typeof AdapterAction.BuyPrincipalToken;
};

export const buyPrincipleTokenWithAdapter = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  buyPrincipleTokenWithAdapterEncode,
);

export function buyPrincipleTokenWithAdapterEncode(args: BuyPrincipleTokenWithAdapterArgs): Hex {
  const { actionId, ...actionArgs } = args;

  const encodedActionArgs = buyPrincipleTokenEncode(actionArgs);

  return encodeAbiParameters(adapterActionEncoding, [actionId, encodedActionArgs]);
}

export function buyPrincipleTokenWithAdapterDecode(encoded: Hex): BuyPrincipleTokenWithAdapterArgs {
  const { actionId, encodedActionArgs } = decodeAdapterAction(encoded);

  const decodedActionArgs = buyPrincipleTokenDecode(encodedActionArgs);

  Assertion.invariant(actionId === AdapterAction.BuyPrincipalToken, "Invalid actionId");

  return {
    actionId,
    ...decodedActionArgs,
  };
}

//--------------------------------------------------------------------------------------------
// ADAPTER - SELL PRINCIPLE TOKEN
//--------------------------------------------------------------------------------------------

export type SellPrincipleTokenWithAdapterArgs = SellPrincipleTokenArgs & {
  actionId: typeof AdapterAction.SellPrincipalToken;
};

export const sellPrincipleTokenWithAdapter = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  sellPrincipleTokenWithAdapterEncode,
);

export function sellPrincipleTokenWithAdapterEncode(args: SellPrincipleTokenWithAdapterArgs): Hex {
  const { actionId, ...actionArgs } = args;

  const encodedActionArgs = sellPrincipleTokenEncode(actionArgs);

  return encodeAbiParameters(adapterActionEncoding, [actionId, encodedActionArgs]);
}

export function sellPrincipleTokenWithAdapterDecode(encoded: Hex): SellPrincipleTokenWithAdapterArgs {
  const { actionId, encodedActionArgs } = decodeAdapterAction(encoded);

  const decodedActionArgs = sellPrincipleTokenDecode(encodedActionArgs);

  Assertion.invariant(actionId === AdapterAction.SellPrincipalToken, "Invalid actionId");

  return {
    actionId,
    ...decodedActionArgs,
  };
}

//--------------------------------------------------------------------------------------------
// ADAPTER - ADD LIQUIDITY
//--------------------------------------------------------------------------------------------

export type AddLiquidityWithAdapterArgs = AddLiquidityArgs & { actionId: typeof AdapterAction.AddLiquidity };

export const addLiquidityWithAdapter = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  addLiquidityWithAdapterEncode,
);

export function addLiquidityWithAdapterEncode(args: AddLiquidityWithAdapterArgs): Hex {
  const { actionId, ...actionArgs } = args;

  const encodedActionArgs = addLiquidityEncode(actionArgs);

  return encodeAbiParameters(adapterActionEncoding, [actionId, encodedActionArgs]);
}

export function addLiquidityWithAdapterDecode(encoded: Hex): AddLiquidityWithAdapterArgs {
  const { actionId, encodedActionArgs } = decodeAdapterAction(encoded);

  const decodedActionArgs = addLiquidityDecode(encodedActionArgs);

  Assertion.invariant(actionId === AdapterAction.AddLiquidity, "Invalid actionId");

  return {
    actionId,
    ...decodedActionArgs,
  };
}

//--------------------------------------------------------------------------------------------
// ADAPTER - REMOVE LIQUIDITY TO UNDERLYING
//--------------------------------------------------------------------------------------------

export type RemoveLiquidityToUnderlyingWithAdapterArgs = RemoveLiquidityArgs & {
  actionId: typeof AdapterAction.RemoveLiquidityToUnderlying;
};

export const removeLiquidityToUnderlyingWithAdapter = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  removeLiquidityToUnderlyingWithAdapterEncode,
);

export function removeLiquidityToUnderlyingWithAdapterEncode(args: RemoveLiquidityToUnderlyingWithAdapterArgs): Hex {
  const { actionId, ...actionArgs } = args;

  const encodedActionArgs = removeLiquidityEncode(actionArgs);

  return encodeAbiParameters(adapterActionEncoding, [actionId, encodedActionArgs]);
}

export function removeLiquidityToUnderlyingWithAdapterDecode(encoded: Hex): RemoveLiquidityToUnderlyingWithAdapterArgs {
  const { actionId, encodedActionArgs } = decodeAdapterAction(encoded);

  const decodedActionArgs = removeLiquidityDecode(encodedActionArgs);

  Assertion.invariant(actionId === AdapterAction.RemoveLiquidityToUnderlying, "Invalid actionId");

  return {
    actionId,
    ...decodedActionArgs,
  };
}

//--------------------------------------------------------------------------------------------
// ADAPTER - REMOVE LIQUIDITY TO PT AND UNDERLYING
//--------------------------------------------------------------------------------------------

const removeLiquidityToPtAndUnderlyingEncoding = [
  {
    name: "market",
    type: "address",
  },
  {
    name: "lpAmount",
    type: "uint256",
  },
  {
    name: "withdrawalTokenAddress",
    type: "address",
  },
  {
    name: "minWithdrawalTokenAmount",
    type: "uint256",
  },
  {
    name: "minPtAmount",
    type: "uint256",
  },
] as const;

export type RemoveLiquidityToPtAndUnderlyingArgs = {
  market: Address;
  lpAmount: bigint;
  withdrawalTokenAddress: Address;
  minWithdrawalTokenAmount: bigint;
  minPtAmount: bigint;
};

export function removeLiquidityToPtAndUnderlyingEncode(args: RemoveLiquidityToPtAndUnderlyingArgs): Hex {
  return encodeAbiParameters(removeLiquidityToPtAndUnderlyingEncoding, [
    args.market,
    args.lpAmount,
    args.withdrawalTokenAddress,
    args.minWithdrawalTokenAmount,
    args.minPtAmount,
  ]);
}

export function removeLiquidityToPtAndUnderlyingDecode(encoded: Hex): RemoveLiquidityToPtAndUnderlyingArgs {
  const [market, lpAmount, withdrawalTokenAddress, minWithdrawalTokenAmount, minPtAmount] = decodeAbiParameters(
    removeLiquidityToPtAndUnderlyingEncoding,
    encoded,
  );

  return {
    market,
    lpAmount,
    withdrawalTokenAddress,
    minWithdrawalTokenAmount,
    minPtAmount,
  };
}

export type RemoveLiquidityToPtAndUnderlyingWithAdapterArgs = RemoveLiquidityToPtAndUnderlyingArgs & {
  actionId: typeof AdapterAction.RemoveLiquidityToPtAndUnderlying;
};

export const removeLiquidityToPtAndUnderlyingWithAdapter = IntegrationManager.makeUse(
  IntegrationManager.Selector.Action,
  removeLiquidityToPtAndUnderlyingWithAdapterEncode,
);

export function removeLiquidityToPtAndUnderlyingWithAdapterEncode(
  args: RemoveLiquidityToPtAndUnderlyingWithAdapterArgs,
): Hex {
  const { actionId, ...actionArgs } = args;

  const encodedActionArgs = removeLiquidityToPtAndUnderlyingEncode(actionArgs);

  return encodeAbiParameters(adapterActionEncoding, [actionId, encodedActionArgs]);
}

export function removeLiquidityToPtAndUnderlyingWithAdapterDecode(
  encoded: Hex,
): RemoveLiquidityToPtAndUnderlyingWithAdapterArgs {
  const { actionId, encodedActionArgs } = decodeAdapterAction(encoded);

  const decodedActionArgs = removeLiquidityToPtAndUnderlyingDecode(encodedActionArgs);

  Assertion.invariant(actionId === AdapterAction.RemoveLiquidityToPtAndUnderlying, "Invalid actionId");

  return {
    actionId,
    ...decodedActionArgs,
  };
}

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function redeemRewards(args: { user: Address; market: Address }) {
  return new Viem.PopulatedTransaction({
    abi: parseAbi(["function redeemRewards(address user)"]),
    functionName: "redeemRewards",
    args: [args.user],
    address: args.market,
  });
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function readTokensForMarket(
  client: Client,
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
  client: Client,
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
  client: Client,
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
  client: Client,
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
  client: Client,
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

export async function isDurationValid(
  client: Client,
  args: Viem.ContractCallParameters<{
    pendlePtLpOracle: Address;
    pendleMarket: Address;
    duration: number;
  }>,
) {
  const oracleState = await getOracleState(client, args);

  return oracleState.increaseCardinalityRequired === false && oracleState.oldestObservationSatisfied === true;
}

export function getLpToAssetRate(
  client: Client,
  args: Viem.ContractCallParameters<{
    pendlePtLpOracle: Address;
    pendleMarket: Address;
    duration: number;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getLpToAssetRate(address market, uint32 duration) external view returns (uint256)"]),
    functionName: "getLpToAssetRate",
    address: args.pendlePtLpOracle,
    args: [args.pendleMarket, args.duration],
  });
}

export function getPtToAssetRate(
  client: Client,
  args: Viem.ContractCallParameters<{
    pendlePtLpOracle: Address;
    pendleMarket: Address;
    duration: number;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getPtToAssetRate(address market, uint32 duration) external view returns (uint256)"]),
    functionName: "getPtToAssetRate",
    address: args.pendlePtLpOracle,
    args: [args.pendleMarket, args.duration],
  });
}

export function getSyTokensIn(
  client: Client,
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
  client: Client,
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
