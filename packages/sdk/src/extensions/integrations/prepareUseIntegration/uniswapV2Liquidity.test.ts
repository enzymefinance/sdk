import { UNISWAP_V2_LIQUIDITY_ADAPTER, UNISWAP_V2_POOL_LINK_ETH } from "../../../../tests/constants.js";
import {
  AAVE_V2_ADAPTER,
  AAVE_V2_A_WETH,
  ALICE,
  BOB,
  INTEGRATION_MANAGER,
  LINK,
  WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { type Address, parseAbi } from "viem";
import { expect, test } from "vitest";

const abiUniswapV2Pair = parseAbi([
  "function getReserves() view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)",
  "function totalSupply() view returns (uint256)",
  "function token0() view returns (address)",
] as const);

async function getUniswapV2PoolLendRate({
  poolToken,
  tokenA,
  amountADesired,
}: { poolToken: Address; amountADesired: bigint; tokenA: Address }) {
  const [[reserve0, reserve1], token0Address, poolTokensSupply] = await Promise.all([
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

  const [tokenAReserve, tokenBReserve] = token0Address === tokenA ? [reserve0, reserve1] : [reserve1, reserve0];

  if (tokenAReserve === 0n || tokenBReserve === 0n) {
    throw new Error("Invalid pool");
  }

  return (amountADesired * poolTokensSupply) / tokenAReserve;

  // const amountBDesired = (amountADesired * tokenBReserve) / tokenAReserve;

  // const expectedPoolTokens = min(
  //   (amountADesired * poolTokensSupply) / tokenAReserve,
  //   (amountBDesired * poolTokensSupply) / tokenBReserve,
  // );

  // return { amountBDesired, expectedPoolTokens };
}

test.only("prepare adapter trade for Uniswap Liquidity V2 lend should work correctly", async () => {
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

  const minIncomingAssetAmount = await getUniswapV2PoolLendRate({
    poolToken: UNISWAP_V2_POOL_LINK_ETH,
    tokenA: WETH,
    amountADesired: depositAmount,
  });

  const slippage = 1n;

  const minIncomingAssetAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingAssetAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: UNISWAP_V2_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.UniswapV2LiquidityLend,
        outgoingAssets: [LINK, WETH],
        maxOutgoingAssetAmounts: [0n, depositAmount],
        minOutgoingAssetAmounts: [0n, 0n],
        minIncomingAssetAmount: minIncomingAssetAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: AAVE_V2_A_WETH,
    account: vaultProxy,
    expected: minIncomingAssetAmount,
    fuzziness: minIncomingAssetAmount - minIncomingAssetAmountWithSlippage,
  });
});

test("prepareUseIntegration for Uniswap Liquidity V2 lend should be equal to encoded data with encodeCallArgsForAaveV2Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: AAVE_V2_ADAPTER,
      callArgs: {
        type: Integration.UniswapV2LiquidityLend,
        outgoingAssets: [WETH, LINK],
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
        "0x000000000000000000000000ece6b376af7c9273cebaf6528565c47ea2cb8a4c099f75150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000006b175474e89094c44da98b954eedeac495271d0f00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000821ab0d4414980000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

// test("prepare adapter trade for Uniswap Liquidity V2 redeem should work correctly", async () => {
//   const vaultOwner = ALICE;
//   const sharesBuyer = BOB;

//   const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
//     vaultOwner,
//     denominationAsset: WETH,
//   });

//   const investmentAmount = toWei(250);

//   await testActions.buyShares({
//     comptrollerProxy,
//     sharesBuyer,
//     investmentAmount: investmentAmount,
//   });

//   await sendTestTransaction({
//     ...prepareUseIntegration({
//       integrationManager: INTEGRATION_MANAGER,
//       integrationAdapter: AAVE_V2_ADAPTER,
//       callArgs: {
//         type: Integration.AaveV2Lend,
//         aToken: AAVE_V2_A_WETH,
//         depositAmount: investmentAmount,
//       },
//     }),
//     account: vaultOwner,
//     address: comptrollerProxy,
//   });

//   await testActions.assertBalanceOf({
//     token: AAVE_V2_A_WETH,
//     account: vaultProxy,
//     expected: investmentAmount,
//     fuzziness: 100n,
//   });

//   await sendTestTransaction({
//     ...prepareUseIntegration({
//       integrationManager: INTEGRATION_MANAGER,
//       integrationAdapter: AAVE_V2_ADAPTER,
//       callArgs: {
//         type: Integration.AaveV2Redeem,
//         aToken: AAVE_V2_A_WETH,
//         redeemAmount: investmentAmount,
//       },
//     }),
//     account: vaultOwner,
//     address: comptrollerProxy,
//   });

//   await testActions.assertBalanceOf({
//     token: WETH,
//     account: vaultProxy,
//     expected: investmentAmount,
//     fuzziness: 100n,
//   });
// });

// test("prepareUseIntegration for Uniswap Liquidity V2 redeem should be equal to encoded data with encodeCallArgsForAaveV2Redeem", () => {
//   expect(
//     prepareUseIntegration({
//       integrationManager: INTEGRATION_MANAGER,
//       integrationAdapter: AAVE_V2_ADAPTER,
//       callArgs: {
//         type: Integration.AaveV2Redeem,
//         aToken: AAVE_V2_A_WETH,
//         redeemAmount: toWei(100),
//       },
//     }),
//   ).toMatchInlineSnapshot(
//     `
//     {
//       "abi": [
//         {
//           "inputs": [
//             {
//               "internalType": "address",
//               "name": "_extension",
//               "type": "address",
//             },
//             {
//               "internalType": "uint256",
//               "name": "_actionId",
//               "type": "uint256",
//             },
//             {
//               "internalType": "bytes",
//               "name": "_callArgs",
//               "type": "bytes",
//             },
//           ],
//           "name": "callOnExtension",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function",
//         },
//       ],
//       "args": [
//         "0x31329024f1a3E4a4B3336E0b1DfA74CC3FEc633e",
//         0n,
//         "0x000000000000000000000000ece6b376af7c9273cebaf6528565c47ea2cb8a4cc29fa9dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
//       ],
//       "functionName": "callOnExtension",
//     }
//   `,
//   );
// });
