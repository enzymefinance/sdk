import { UNISWAP_V2_LIQUIDITY_ADAPTER, UNISWAP_V2_POOL_DAI_ETH } from "../../../../tests/constants.js";
import { ALICE, BOB, DAI, INTEGRATION_MANAGER, WETH } from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { min } from "../../../utils/math.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { type Address, parseAbi } from "viem";
import { expect, test } from "vitest";

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
    publicClient.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "getReserves",
    }),
    publicClient.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "token0",
    }),
    publicClient.readContract({
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
    publicClient.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "getReserves",
    }),
    publicClient.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "totalSupply",
    }),
    publicClient.readContract({
      abi: abiUniswapV2Pair,
      address: poolToken,
      functionName: "token0",
    }),
    publicClient.readContract({
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

test("prepareUseIntegration for Uniswap Liquidity V2 lend should be equal to encoded data with encodeCallArgsForUniswapV2LiquidityV2Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V2_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.UniswapV2LiquidityLend,
        outgoingAssets: [WETH, DAI],
        maxOutgoingAssetAmounts: [toWei(100), toWei(150)],
        minOutgoingAssetAmounts: [toWei(50), toWei(100)],
        minIncomingAssetAmount: toWei(100),
      },
    }),
  ).toMatchInlineSnapshot(
    `
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_extension",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_actionId",
              "type": "uint256",
            },
            {
              "internalType": "bytes",
              "name": "_callArgs",
              "type": "bytes",
            },
          ],
          "name": "callOnExtension",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
        0n,
        "0x000000000000000000000000f78130afeda6d9df3394b34d36239aec7fae48d9099f751500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f0000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000000000000000000000000000000000000000000000000002b5e3af16b18800000000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
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

test("prepareUseIntegration for Uniswap Liquidity V2 redeem should be equal to encoded data with encodeCallArgsForUniswapV2LiquidityV2Redeem", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V2_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.UniswapV2LiquidityRedeem,
        outgoingAssetAmount: toWei(100),
        incomingAssets: [WETH, DAI],
        minIncomingAssetAmounts: [toWei(100), toWei(150)],
      },
    }),
  ).toMatchInlineSnapshot(
    `
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_extension",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_actionId",
              "type": "uint256",
            },
            {
              "internalType": "bytes",
              "name": "_callArgs",
              "type": "bytes",
            },
          ],
          "name": "callOnExtension",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
        0n,
        "0x000000000000000000000000f78130afeda6d9df3394b34d36239aec7fae48d9c29fa9dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f0000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
