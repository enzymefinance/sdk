import { increaseTimeAndMine } from "../../../../tests/actions/increaseTimeAndMine.js";
import {
  ALICE,
  BOB,
  IDLE,
  IDLE_V4_ADAPTER,
  IDLE_V4_PRICE_FEED,
  IDLE_V4_WETH,
  INTEGRATION_MANAGER,
  WETH,
} from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions, testClientMainnet } from "../../../../tests/globals.js";
import { toSeconds, toWei } from "../../../utils/conversion.js";
import { multiplyByRate } from "../../../utils/rates.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { IIdlePriceFeed } from "@enzymefinance/abis/IIdlePriceFeed";
import { type Address, parseUnits, zeroAddress } from "viem";
import { expect, test } from "vitest";

async function getIdlePoolTokenRate(idlePoolToken: Address) {
  const { result } = await publicClientMainnet.simulateContract({
    abi: IIdlePriceFeed,
    functionName: "calcUnderlyingValues",
    args: [idlePoolToken, parseUnits("1", 18)],
    address: IDLE_V4_PRICE_FEED,
    account: zeroAddress,
  });

  const [_, underlyingAmounts] = result;

  const rate = underlyingAmounts[0];

  if (rate === undefined) {
    throw new Error("Rate is undefined");
  }

  return rate;
}

test("prepare adapter trade for Idle V4 lend should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner,
      denominationAsset: WETH,
    },
    network: "mainnet",
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    network: "mainnet",
    sharesBuyer,
    investmentAmount: depositAmount,
  });

  const poolTokenRate = await getIdlePoolTokenRate(IDLE_V4_WETH);

  const slippage = 1n;

  const minIncomingIdleTokenAmount = multiplyByRate({
    inverse: true,
    rate: poolTokenRate,
    rateDecimals: 18,
    value: depositAmount,
  });

  const minIncomingIdleTokenAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingIdleTokenAmount,
    slippage,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: IDLE_V4_ADAPTER,
      callArgs: {
        type: Integration.IdleV4Lend,
        idleToken: IDLE_V4_WETH,
        depositAmount,
        minIncomingIdleTokenAmount: minIncomingIdleTokenAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: IDLE_V4_WETH,
    account: vaultProxy,
    expected: minIncomingIdleTokenAmount,
    fuzziness: minIncomingIdleTokenAmount - minIncomingIdleTokenAmountWithSlippage,
  });
});

test("prepare adapter trade for Idle V4 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner,
      denominationAsset: WETH,
    },
    network: "mainnet",
  });

  const investmentAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    network: "mainnet",
    sharesBuyer,
    investmentAmount: investmentAmount,
  });

  const poolTokenRateBeforeLend = await getIdlePoolTokenRate(IDLE_V4_WETH);

  const slippage = 1n;

  const minIncomingIdleTokenAmount = multiplyByRate({
    inverse: true,
    rate: poolTokenRateBeforeLend,
    rateDecimals: 18,
    value: investmentAmount,
  });

  const minIncomingIdleTokenAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingIdleTokenAmount,
    slippage,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: IDLE_V4_ADAPTER,
      callArgs: {
        type: Integration.IdleV4Lend,
        idleToken: IDLE_V4_WETH,
        depositAmount: investmentAmount,
        minIncomingIdleTokenAmount: minIncomingIdleTokenAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: IDLE_V4_WETH,
    account: vaultProxy,
    expected: minIncomingIdleTokenAmount,
    fuzziness: minIncomingIdleTokenAmount - minIncomingIdleTokenAmountWithSlippage,
  });

  const poolTokenRateBeforeRedeem = await getIdlePoolTokenRate(IDLE_V4_WETH);

  const minIncomingUnderlyingAmount = multiplyByRate({
    inverse: false,
    rate: poolTokenRateBeforeRedeem,
    rateDecimals: 18,
    value: minIncomingIdleTokenAmountWithSlippage,
  });

  const minIncomingUnderlyingAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingUnderlyingAmount,
    slippage,
  });

  // wait at least one block so reentrancy guard is not triggered
  await testClientMainnet.mine({ blocks: 1 });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: IDLE_V4_ADAPTER,
      callArgs: {
        type: Integration.IdleV4Redeem,
        idleToken: IDLE_V4_WETH,
        outgoingIdleTokenAmount: minIncomingIdleTokenAmountWithSlippage,
        minIncomingUnderlyingAmount: minIncomingUnderlyingAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: minIncomingUnderlyingAmount,
    fuzziness: minIncomingUnderlyingAmount - minIncomingUnderlyingAmountWithSlippage,
  });
});

test("prepare adapter trade for Idle V4 claim rewards should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner,
      denominationAsset: WETH,
    },
    network: "mainnet",
  });

  const investmentAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    network: "mainnet",
    sharesBuyer,
    investmentAmount: investmentAmount,
  });

  const poolTokenRateBeforeLend = await getIdlePoolTokenRate(IDLE_V4_WETH);

  const slippage = 1n;

  const minIncomingIdleTokenAmount = multiplyByRate({
    inverse: true,
    rate: poolTokenRateBeforeLend,
    rateDecimals: 18,
    value: investmentAmount,
  });

  const minIncomingIdleTokenAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingIdleTokenAmount,
    slippage,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: IDLE_V4_ADAPTER,
      callArgs: {
        type: Integration.IdleV4Lend,
        idleToken: IDLE_V4_WETH,
        depositAmount: investmentAmount,
        minIncomingIdleTokenAmount: minIncomingIdleTokenAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: IDLE_V4_WETH,
    account: vaultProxy,
    expected: minIncomingIdleTokenAmount,
    fuzziness: minIncomingIdleTokenAmount - minIncomingIdleTokenAmountWithSlippage,
  });

  await increaseTimeAndMine({
    seconds: toSeconds({ hours: 1_000 }),
    blocks: 1_000,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: IDLE_V4_ADAPTER,
      callArgs: {
        type: Integration.IdleV4ClaimRewards,
        idleToken: IDLE_V4_WETH,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const idleBalance = await testActions.getBalanceOf({
    token: IDLE,
    account: vaultProxy,
  });

  expect(idleBalance).toBeGreaterThan(0n);
});
