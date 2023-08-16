import { IComptroller } from "../../../../../abis/src/abis/IComptroller.js";
import { increaseTimeAndMine } from "../../../../tests/actions/increaseTimeAndMine.js";
import {
  ALICE,
  BOB,
  CRV,
  CURVE_FRAX_USDC_GAUGE,
  CURVE_FRAX_USDC_LP,
  CURVE_FRAX_USDC_POOL,
  CURVE_LIQUIDITY_ADAPTER,
  CURVE_MINTER,
  FRAX,
  INTEGRATION_MANAGER,
  USDC,
  WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { TOGGLE_APPROVE_MINT_SELECTOR } from "../../../constants/selectors.js";
import { toSeconds, toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { prepareFunctionParams } from "../../../utils/viem.js";
import { RedeemType } from "../instances/curveLiquidity.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { encodeAbiParameters, getAbiItem, parseAbi } from "viem";
import { expect, test } from "vitest";

export const abiCurvePool = parseAbi([
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
    abi: abiCurvePool,
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
    abi: abiCurvePool,
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

test("prepare adapter trade for Curve Liquidity redeem should work correctly", async () => {
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
    abi: abiCurvePool,
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
    abi: abiCurvePool,
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

test("prepare adapter trade for Curve Liquidity unstake and redeem should work correctly", async () => {
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
    abi: abiCurvePool,
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

  const incomingAssetPoolIndex = 0n;

  const minIncomingTokenAmount = await publicClient.readContract({
    abi: abiCurvePool,
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
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityUnstakeAndRedeem,
        pool: CURVE_FRAX_USDC_POOL,
        outgoingStakingTokenAmount: minIncomingStakingTokenAmountWithSlippage,
        outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
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

test("prepare adapter trade for Curve Liquidity stake should work correctly", async () => {
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
    abi: abiCurvePool,
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
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityStake,
        pool: CURVE_FRAX_USDC_POOL,
        incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
        amount: minIncomingLpTokenAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: CURVE_FRAX_USDC_GAUGE,
    account: vaultProxy,
    expected: minIncomingLpTokenAmountWithSlippage,
  });
});

test("prepare adapter trade for Curve Liquidity unstake should work correctly", async () => {
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
    abi: abiCurvePool,
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

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityUnstake,
        pool: CURVE_FRAX_USDC_POOL,
        outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
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

test("prepare adapter trade for Curve Liquidity claim rewards should work correctly", async () => {
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
    abi: abiCurvePool,
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

  await sendTestTransaction({
    ...prepareFunctionParams({
      abi: getAbiItem({ abi: IComptroller, name: "vaultCallOnContract" }),
      args: [
        CURVE_MINTER,
        TOGGLE_APPROVE_MINT_SELECTOR,
        encodeAbiParameters([{ name: "adapter", type: "address" }], [CURVE_LIQUIDITY_ADAPTER]),
      ],
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await increaseTimeAndMine({
    seconds: toSeconds({ hours: 100 }),
    blocks: 100,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityClaimRewards,
        stakingToken: CURVE_FRAX_USDC_GAUGE,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const crvBalance = await testActions.getBalanceOf({
    token: CRV,
    account: vaultProxy,
  });

  expect(crvBalance).toBeGreaterThan(0n);
});
