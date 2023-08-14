import { type Address, encodeAbiParameters, parseAbi, parseEther } from "viem";
import { expect, test } from "vitest";
import {
  ALICE,
  BOB,
  CURVE_FRAX_USDC_GAUGE,
  CURVE_FRAX_USDC_LP,
  CURVE_FRAX_USDC_POOL,
  CURVE_LIQUIDITY_ADAPTER,
  FRAX,
  INTEGRATION_MANAGER,
  USDC,
  WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { RedeemType } from "../instances/curveLiquidity.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";

const abiPool = parseAbi([
  "function calc_token_amount(uint256[2] _amounts, bool _is_deposit) view returns (uint256)",
  "function calc_withdraw_one_coin(uint256 _amount, int128 _index) view returns (uint256)",
] as const);

test("prepare adapter trade for Curve Liquidity lend should work correctly", async () => {
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

  const lendAmountUsdc = toWei(100, 6);
  const lendAmountFrax = toWei(100);

  await testActions.deal({
    token: USDC,
    to: vaultProxy,
    amount: lendAmountUsdc,
    slotOfBalancesMapping: 9,
  });
  await testActions.deal({
    token: FRAX,
    to: vaultProxy,
    amount: lendAmountFrax,
    slotOfBalancesMapping: 0,
  });

  const orderedOutgoingAssetAmounts = [lendAmountFrax, lendAmountUsdc] as const;

  const minIncomingLpTokenAmount = await publicClient.readContract({
    abi: abiPool,
    address: CURVE_FRAX_USDC_POOL,
    functionName: "calc_token_amount",
    args: [orderedOutgoingAssetAmounts, true],
  });

  const slippage = 1n;

  const minIncomingLpTokenAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingLpTokenAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityLend,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
        minIncomingLpTokenAmount: minIncomingLpTokenAmountWithSlippage,
        useUnderlyings: false,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CURVE_FRAX_USDC_LP,
    account: vaultProxy,
    expected: minIncomingLpTokenAmount,
    fuzziness: minIncomingLpTokenAmount - minIncomingLpTokenAmountWithSlippage,
  });
});

test("prepare adapter trade for Curve Liquidity lend and stake should work correctly", async () => {
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

  const lendAmountUsdc = toWei(100, 6);
  const lendAmountFrax = toWei(100);

  await testActions.deal({
    token: USDC,
    to: vaultProxy,
    amount: lendAmountUsdc,
    slotOfBalancesMapping: 9,
  });
  await testActions.deal({
    token: FRAX,
    to: vaultProxy,
    amount: lendAmountFrax,
    slotOfBalancesMapping: 0,
  });

  const orderedOutgoingAssetAmounts = [lendAmountFrax, lendAmountUsdc] as const;

  const minIncomingStakingTokenAmount = await publicClient.readContract({
    abi: abiPool,
    address: CURVE_FRAX_USDC_POOL,
    functionName: "calc_token_amount",
    args: [orderedOutgoingAssetAmounts, true],
  });

  const slippage = 1n;

  const minIncomingStakingTokenAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingStakingTokenAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityLendAndStake,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
        minIncomingStakingTokenAmount: minIncomingStakingTokenAmountWithSlippage,
        incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
        useUnderlyings: false,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CURVE_FRAX_USDC_GAUGE,
    account: vaultProxy,
    expected: minIncomingStakingTokenAmount,
    fuzziness: minIncomingStakingTokenAmount - minIncomingStakingTokenAmountWithSlippage,
  });
});

test.only("prepare adapter trade for Curve Liquidity redeem should work correctly", async () => {
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

  const lendAmountUsdc = toWei(100, 6);
  const lendAmountFrax = toWei(100);

  await testActions.deal({
    token: USDC,
    to: vaultProxy,
    amount: lendAmountUsdc,
    slotOfBalancesMapping: 9,
  });
  await testActions.deal({
    token: FRAX,
    to: vaultProxy,
    amount: lendAmountFrax,
    slotOfBalancesMapping: 0,
  });

  const orderedOutgoingAssetAmounts = [lendAmountFrax, lendAmountUsdc] as const;

  const minIncomingLpTokenAmount = await publicClient.readContract({
    abi: abiPool,
    address: CURVE_FRAX_USDC_POOL,
    functionName: "calc_token_amount",
    args: [orderedOutgoingAssetAmounts, true],
  });

  const slippage = 1n;

  const minIncomingLpTokenAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingLpTokenAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityLend,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
        minIncomingLpTokenAmount: minIncomingLpTokenAmountWithSlippage,
        useUnderlyings: false,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CURVE_FRAX_USDC_LP,
    account: vaultProxy,
    expected: minIncomingLpTokenAmount,
    fuzziness: minIncomingLpTokenAmount - minIncomingLpTokenAmountWithSlippage,
  });

  const incomingAssetPoolIndex = 0n;

  const minIncomingTokenAmount = await publicClient.readContract({
    abi: abiPool,
    address: CURVE_FRAX_USDC_POOL,
    functionName: "calc_withdraw_one_coin",
    args: [minIncomingLpTokenAmountWithSlippage, incomingAssetPoolIndex],
  });

  const minIncomingTokenAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingTokenAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityRedeem,
        pool: CURVE_FRAX_USDC_POOL,
        outgoingLpTokenAmount: minIncomingLpTokenAmountWithSlippage,
        redeemType: RedeemType.OneCoin,
        useUnderlyings: false,
        incomingAssetsData: encodeAbiParameters(
          [
            { name: "incomingAssetPoolIndex", type: "uint256" },
            { name: "minIncomingAssetAmount", type: "uint256" },
          ],
          [incomingAssetPoolIndex, minIncomingTokenAmountWithSlippage],
        ),
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: FRAX,
    account: vaultProxy,
    expected: minIncomingTokenAmount,
    fuzziness: minIncomingTokenAmount - minIncomingTokenAmountWithSlippage,
  });
});
