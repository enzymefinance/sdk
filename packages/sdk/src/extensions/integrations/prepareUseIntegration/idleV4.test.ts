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
import { publicClient, sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { toSeconds, toWei } from "../../../utils/conversion.js";
import { multiplyByRate } from "../../../utils/rates.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { prepareFunctionParams } from "../../../utils/viem.js";
import { IIdlePriceFeed } from "../../abis/index.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { type Address, getAbiItem, parseUnits, zeroAddress } from "viem";
import { expect, test } from "vitest";

async function getIdlePoolTokenRate(idlePoolToken: Address) {
  const { result } = await publicClient.simulateContract({
    ...prepareFunctionParams({
      abi: getAbiItem({ abi: IIdlePriceFeed, name: "calcUnderlyingValues" }),
      args: [idlePoolToken, parseUnits("1", 18)],
    }),
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
    vaultOwner,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
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

test("prepareUseIntegration for Idle V4 lend should be equal to encoded data with encodeCallArgsForIdleV4Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: IDLE_V4_ADAPTER,
      callArgs: {
        type: Integration.IdleV4Lend,
        idleToken: IDLE_V4_WETH,
        depositAmount: toWei(100),
        minIncomingIdleTokenAmount: toWei(50),
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
        "0x000000000000000000000000474c8d4a0e53b7235c6f8fc27c9b6406a32dd0b1099f75150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f800000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b1880000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepare adapter trade for Idle V4 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const investmentAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
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
  await testClient.mine({ blocks: 1 });

  await sendTestTransaction({
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

test("prepareUseIntegration for Idle V4 redeem should be equal to encoded data with encodeCallArgsForIdleV4ClaimRewards", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: IDLE_V4_ADAPTER,
      callArgs: {
        type: Integration.IdleV4Redeem,
        idleToken: IDLE_V4_WETH,
        outgoingIdleTokenAmount: toWei(150),
        minIncomingUnderlyingAmount: toWei(200),
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
        "0x000000000000000000000000474c8d4a0e53b7235c6f8fc27c9b6406a32dd0b1c29fa9dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f8000000000000000000000000000000000000000000000000821ab0d441498000000000000000000000000000000000000000000000000000ad78ebc5ac6200000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepare adapter trade for Idle V4 claim rewards should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const investmentAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
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

test("prepareUseIntegration for Idle V4 claim rewards should be equal to encoded data with encodeCallArgsForIdleV4ClaimRewards", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: IDLE_V4_ADAPTER,
      callArgs: {
        type: Integration.IdleV4ClaimRewards,
        idleToken: IDLE_V4_WETH,
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
        "0x000000000000000000000000474c8d4a0e53b7235c6f8fc27c9b6406a32dd0b1b9dfbacc0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f80",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
