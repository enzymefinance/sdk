import { increaseTimeAndMine } from "../../../../tests/actions/increaseTimeAndMine.js";
import {
  ALICE,
  BOB,
  CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
  CONVEX_CURVE_LP_STAKING_ADAPTER,
  CURVE_FRAX_USDC_LP,
  CURVE_FRAX_USDC_POOL,
  CURVE_LIQUIDITY_ADAPTER,
  CVX,
  FRAX,
  INTEGRATION_MANAGER,
  USDC,
  WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toSeconds, toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { RedeemType } from "../instances/curveLiquidity.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { encodeAbiParameters, parseAbi } from "viem";
import { expect, test } from "vitest";

const abiPool = parseAbi([
  "function calc_token_amount(uint256[2] _amounts, bool _is_deposit) view returns (uint256)",
  "function calc_withdraw_one_coin(uint256 _amount, int128 _index) view returns (uint256)",
] as const);

test.only("prepare adapter trade for Convex Curve Lp Staking lend and stake should work correctly", async () => {
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
      integrationAdapter: CONVEX_CURVE_LP_STAKING_ADAPTER,
      callArgs: {
        type: Integration.ConvexCurveLpStakingLendAndStake,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
        minIncomingStakingTokenAmount: minIncomingStakingTokenAmountWithSlippage,
        incomingStakingToken: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
        useUnderlyings: false,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
    account: vaultProxy,
    expected: minIncomingStakingTokenAmount,
    fuzziness: minIncomingStakingTokenAmount - minIncomingStakingTokenAmountWithSlippage,
  });
});

test("prepare adapter trade for Convex Curve Lp Staking unstake and redeem should work correctly", async () => {
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
      integrationAdapter: CONVEX_CURVE_LP_STAKING_ADAPTER,
      callArgs: {
        type: Integration.ConvexCurveLpStakingLendAndStake,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
        minIncomingStakingTokenAmount: minIncomingStakingTokenAmountWithSlippage,
        incomingStakingToken: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
        useUnderlyings: false,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
    account: vaultProxy,
    expected: minIncomingStakingTokenAmount,
    fuzziness: minIncomingStakingTokenAmount - minIncomingStakingTokenAmountWithSlippage,
  });

  const incomingAssetPoolIndex = 0n;

  const minIncomingTokenAmount = await publicClient.readContract({
    abi: abiPool,
    address: CURVE_FRAX_USDC_POOL,
    functionName: "calc_withdraw_one_coin",
    args: [minIncomingStakingTokenAmountWithSlippage, incomingAssetPoolIndex],
  });

  const minIncomingTokenAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingTokenAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CONVEX_CURVE_LP_STAKING_ADAPTER,
      callArgs: {
        type: Integration.ConvexCurveLpStakingUnstakeAndRedeem,
        pool: CURVE_FRAX_USDC_POOL,
        outgoingStakingTokenAmount: minIncomingStakingTokenAmountWithSlippage,
        outgoingStakingToken: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
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

test("prepare adapter trade for Convex Curve Lp Staking stake should work correctly", async () => {
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

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CONVEX_CURVE_LP_STAKING_ADAPTER,
      callArgs: {
        type: Integration.ConvexCurveLpStakingStake,
        pool: CURVE_FRAX_USDC_POOL,
        incomingStakingToken: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
        amount: minIncomingLpTokenAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
    account: vaultProxy,
    expected: minIncomingLpTokenAmountWithSlippage,
  });
});

test("prepare adapter trade for Convex Curve Lp Staking unstake should work correctly", async () => {
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
      integrationAdapter: CONVEX_CURVE_LP_STAKING_ADAPTER,
      callArgs: {
        type: Integration.ConvexCurveLpStakingLendAndStake,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
        minIncomingStakingTokenAmount: minIncomingStakingTokenAmountWithSlippage,
        incomingStakingToken: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
        useUnderlyings: false,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
    account: vaultProxy,
    expected: minIncomingStakingTokenAmount,
    fuzziness: minIncomingStakingTokenAmount - minIncomingStakingTokenAmountWithSlippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CONVEX_CURVE_LP_STAKING_ADAPTER,
      callArgs: {
        type: Integration.ConvexCurveLpStakingUnstake,
        pool: CURVE_FRAX_USDC_POOL,
        outgoingStakingToken: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
        amount: minIncomingStakingTokenAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CURVE_FRAX_USDC_LP,
    account: vaultProxy,
    expected: minIncomingStakingTokenAmountWithSlippage,
  });
});

test("prepare adapter trade for Convex Curve Lp Staking claim rewards should work correctly", async () => {
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
      integrationAdapter: CONVEX_CURVE_LP_STAKING_ADAPTER,
      callArgs: {
        type: Integration.ConvexCurveLpStakingLendAndStake,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [...orderedOutgoingAssetAmounts],
        minIncomingStakingTokenAmount: minIncomingStakingTokenAmountWithSlippage,
        incomingStakingToken: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
        useUnderlyings: false,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
    account: vaultProxy,
    expected: minIncomingStakingTokenAmount,
    fuzziness: minIncomingStakingTokenAmount - minIncomingStakingTokenAmountWithSlippage,
  });

  await increaseTimeAndMine({
    seconds: toSeconds({ hours: 100 }),
    blocks: 100,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CONVEX_CURVE_LP_STAKING_ADAPTER,
      callArgs: {
        type: Integration.ConvexCurveLpStakingClaimRewards,
        stakingToken: CONVEX_CURVE_FRAX_USDC_STAKING_WRAPPER,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const cvxBalance = await testActions.getBalanceOf({
    token: CVX,
    account: vaultProxy,
  });

  expect(cvxBalance).toBeGreaterThan(0n);
});
