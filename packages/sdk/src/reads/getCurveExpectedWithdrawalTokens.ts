import { invariant } from "../utils/assertions.js";
import { multiplyByRate } from "../utils/rates.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import {
  type Address,
  ContractFunctionExecutionError,
  type PublicClient,
  parseAbi,
  parseEther,
  parseUnits,
} from "viem";

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

export async function getCurveExpectedWithdrawalTokens(
  client: PublicClient,
  args: ReadContractParameters<{
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
    expectedSingleToken = await client.readContract({
      ...readContractParameters(args),
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
    await client.readContract({
      ...readContractParameters(args),
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
      return client.readContract({
        ...readContractParameters(args),
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

    invariant(assetDecimals !== undefined, "Asset decimals should be defined");
    const decimalsDelta = 18 - assetDecimals;

    return balance * parseUnits("1", decimalsDelta);
  });

  const lpTokenSupply = await client.readContract({
    ...readContractParameters(args),
    abi: lpTokenAbi,
    functionName: "totalSupply",
    address: args.lpToken,
  });
  const withdrawalProportion = (args.lpTokenAmount * parseEther("1")) / lpTokenSupply;

  const expectedTokens = balances.map((balance, index) => {
    const normalizedExpectedToken = multiplyByRate({ rate: balance, value: withdrawalProportion });

    const assetDecimals = args.underlyingAssetsDecimals[index];

    invariant(assetDecimals !== undefined, "Asset decimals should be defined");
    // Denormalize the expected token to the token's native decimal scale
    const decimalsDelta = 18 - assetDecimals;

    const denormalizedExpectedToken = normalizedExpectedToken / parseUnits("1", decimalsDelta);

    return denormalizedExpectedToken;
  });

  return { expectedTokens, singleTokenAllowed };
}
