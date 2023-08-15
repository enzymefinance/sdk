import { increaseTimeAndMine } from "../../../../tests/actions/increaseTimeAndMine.js";
import {
  ALICE,
  BOB,
  CRV,
  CURVE_FRAX_USDC_GAUGE,
  CURVE_FRAX_USDC_LP,
  CURVE_FRAX_USDC_POOL,
  CURVE_LIQUIDITY_ADAPTER,
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

test("prepareUseIntegration for Curve Liquidity lend should be equal to encoded data with encodeCallArgsForCurveLiquidityLend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityLend,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [toWei(100), toWei(100)],
        minIncomingLpTokenAmount: toWei(100),
        useUnderlyings: false,
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
        "0x000000000000000000000000ea0a896dde31cfcb53a96ac767119b69d7b4f633099f751500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a200000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
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

test("prepareUseIntegration for Curve Liquidity lend and stake should be equal to encoded data with encodeCallArgsForCurveLiquidityLendAndStake", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityLendAndStake,
        pool: CURVE_FRAX_USDC_POOL,
        orderedOutgoingAssetAmounts: [toWei(100), toWei(100)],
        minIncomingStakingTokenAmount: toWei(100),
        incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
        useUnderlyings: false,
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
        "0x000000000000000000000000ea0a896dde31cfcb53a96ac767119b69d7b4f63329fa046e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000100000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a200000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
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

test("prepareUseIntegration for Curve Liquidity redeem should be equal to encoded data with encodeCallArgsForCurveLiquidityRedeem", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityRedeem,
        pool: CURVE_FRAX_USDC_POOL,
        outgoingLpTokenAmount: toWei(100),
        redeemType: RedeemType.OneCoin,
        useUnderlyings: false,
        incomingAssetsData: encodeAbiParameters(
          [
            { name: "incomingAssetPoolIndex", type: "uint256" },
            { name: "minIncomingAssetAmount", type: "uint256" },
          ],
          [0n, toWei(100)],
        ),
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
        "0x000000000000000000000000ea0a896dde31cfcb53a96ac767119b69d7b4f633c29fa9dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000100000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a20000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
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

test("prepareUseIntegration for Curve Liquidity unstake and redeem should be equal to encoded data with encodeCallArgsForCurveLiquidityUnstakeAndRedeem", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityUnstakeAndRedeem,
        pool: CURVE_FRAX_USDC_POOL,
        outgoingStakingTokenAmount: toWei(100),
        outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
        redeemType: RedeemType.OneCoin,
        useUnderlyings: false,
        incomingAssetsData: encodeAbiParameters(
          [
            { name: "incomingAssetPoolIndex", type: "uint256" },
            { name: "minIncomingAssetAmount", type: "uint256" },
          ],
          [0n, toWei(100)],
        ),
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
        "0x000000000000000000000000ea0a896dde31cfcb53a96ac767119b69d7b4f6338334eb990000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000120000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
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

test("prepareUseIntegration for Curve Liquidity stake should be equal to encoded data with encodeCallArgsForCurveLiquidityStake", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityStake,
        pool: CURVE_FRAX_USDC_POOL,
        incomingStakingToken: CURVE_FRAX_USDC_GAUGE,
        amount: toWei(100),
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
        "0x000000000000000000000000ea0a896dde31cfcb53a96ac767119b69d7b4f633fa7dd04d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
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

test("prepareUseIntegration for Curve Liquidity unstake should be equal to encoded data with encodeCallArgsForCurveLiquidityUnstake", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityUnstake,
        pool: CURVE_FRAX_USDC_POOL,
        outgoingStakingToken: CURVE_FRAX_USDC_GAUGE,
        amount: toWei(100),
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
        "0x000000000000000000000000ea0a896dde31cfcb53a96ac767119b69d7b4f63368e306770000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000dcef968d416a41cdac0ed8702fac8128a64241a2000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa595030000000000000000000000000000000000000000000000056bc75e2d63100000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
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

  await increaseTimeAndMine({
    seconds: toSeconds({ hours: 1_000 }),
    blocks: 1_000,
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

test("prepareUseIntegration for Curve Liquidity claim rewards should be equal to encoded data with encodeCallArgsForCurveLiquidityClaimRewards", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_LIQUIDITY_ADAPTER,
      callArgs: {
        type: Integration.CurveLiquidityClaimRewards,
        stakingToken: CURVE_FRAX_USDC_GAUGE,
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
        "0x000000000000000000000000ea0a896dde31cfcb53a96ac767119b69d7b4f633b9dfbacc0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000cfc25170633581bf896cb6cdee170e3e3aa59503",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
