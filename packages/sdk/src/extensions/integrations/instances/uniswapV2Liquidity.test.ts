import { type Address, parseAbi } from "viem";
import { test } from "vitest";
import { UNISWAP_V2_LIQUIDITY_ADAPTER, UNISWAP_V2_POOL_DAI_ETH } from "../../../../tests/constants.js";
import { ALICE, BOB, DAI, INTEGRATION_MANAGER, WETH } from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { min } from "../../../utils/math.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";

const abiUniswapV2Pair = parseAbi([
  "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function totalSupply() view returns (uint256)",
  "function token0() view returns (address)",
  "function token1() view returns (address)",
] as const);

async function getUniswapV2PoolLendRate({
  poolToken,
  tokenA,
  amountADesired,
}: { poolToken: Address; amountADesired: bigint; tokenA: Address }) {
  const [[reserveA, reserveB], tokenAAddress, poolTokensSupply] = await Promise.all([
    publicClientMainnet.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "getReserves",
    }),
    publicClientMainnet.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "token0",
    }),
    publicClientMainnet.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "totalSupply",
    }),
  ]);

  const [tokenAReserve, tokenBReserve] = tokenAAddress === tokenA ? [reserveA, reserveB] : [reserveB, reserveA];

  if (tokenAReserve === 0n || tokenBReserve === 0n) {
    throw new Error("Invalid pool");
  }

  const amountBDesired = (amountADesired * tokenBReserve) / tokenAReserve;

  const expectedPoolTokens = min(
    (amountADesired * poolTokensSupply) / tokenAReserve,
    (amountBDesired * poolTokensSupply) / tokenBReserve,
  );

  return { amountBDesired, expectedPoolTokens };
}

async function getUniswapV2PoolRedeemRate({
  poolToken,
  poolTokenAmount,
}: { poolToken: Address; poolTokenAmount: bigint }) {
  const [[reserveA, reserveB], poolTokensSupply, tokenA, tokenB] = await Promise.all([
    publicClientMainnet.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "getReserves",
    }),
    publicClientMainnet.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "totalSupply",
    }),
    publicClientMainnet.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "token0",
    }),
    publicClientMainnet.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "token1",
    }),
  ]);

  return {
    tokenAExpected: (poolTokenAmount * reserveA) / poolTokensSupply,
    tokenA,
    tokenB,
    tokenBExpected: (poolTokenAmount * reserveB) / poolTokensSupply,
  };
}

test("prepare adapter trade for Uniswap Liquidity V2 lend should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: depositAmount,
  });

  const rates = await getUniswapV2PoolLendRate({
    poolToken: UNISWAP_V2_POOL_DAI_ETH,
    tokenA: WETH,
    amountADesired: depositAmount,
  });

  const minIncomingAssetAmount = rates.expectedPoolTokens;

  const slippage = 1n;

  const minIncomingAssetAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingAssetAmount,
    slippage,
  });

  await testActions.deal({ token: DAI, to: vaultProxy, amount: rates.amountBDesired, slotOfBalancesMapping: 2 });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V2_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.UniswapV2LiquidityLend,
        outgoingAssets: [WETH, DAI],
        maxOutgoingAssetAmounts: [depositAmount, rates.amountBDesired],
        minOutgoingAssetAmounts: [
          multiplyBySlippage({
            amount: depositAmount,
            slippage,
          }),
          multiplyBySlippage({
            amount: rates.amountBDesired,
            slippage,
          }),
        ],
        minIncomingAssetAmount: minIncomingAssetAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: UNISWAP_V2_POOL_DAI_ETH,
    account: vaultProxy,
    expected: minIncomingAssetAmount,
    fuzziness: minIncomingAssetAmount - minIncomingAssetAmountWithSlippage,
  });
});

test("prepare adapter trade for Uniswap Liquidity V2 redeem should work correctly", async () => {
  const vaultOwner = ALICE;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const redeemAmount = toWei(250);

  await testActions.deal({
    token: UNISWAP_V2_POOL_DAI_ETH,
    to: vaultProxy,
    amount: redeemAmount,
    slotOfBalancesMapping: 1,
  });

  const redeemRate = await getUniswapV2PoolRedeemRate({
    poolTokenAmount: redeemAmount,
    poolToken: UNISWAP_V2_POOL_DAI_ETH,
  });

  const slippage = 1n;

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V2_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.UniswapV2LiquidityRedeem,
        outgoingAssetAmount: redeemAmount,
        incomingAssets: [redeemRate.tokenA, redeemRate.tokenB],
        minIncomingAssetAmounts: [
          multiplyBySlippage({ amount: redeemRate.tokenAExpected, slippage }),
          multiplyBySlippage({ amount: redeemRate.tokenBExpected, slippage }),
        ],
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });
});
