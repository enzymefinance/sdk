import {
  ALICE,
  BOB,
  INTEGRATION_MANAGER,
  WETH,
  YEARN_VAULT_V2_ADAPTER,
  YEARN_VAULT_V2_WETH,
} from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyByRate } from "../../../utils/rates.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "./prepareUseIntegration.js";
import { parseAbi } from "viem";
import { expect, test } from "vitest";

const abiYVault = parseAbi(["function pricePerShare() view returns (uint256 price_)"] as const);

test("prepare adapter trade for Yearn Vault V2 lend should work correctly", async () => {
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

  const pricePerShare = await publicClient.readContract({
    abi: abiYVault,
    address: YEARN_VAULT_V2_WETH,
    functionName: "pricePerShare",
  });

  const slippage = 1n;

  const minIncomingYVaultSharesAmount = multiplyByRate({
    inverse: true,
    rate: pricePerShare,
    rateDecimals: 18,
    value: depositAmount,
  });

  const minIncomingYVaultSharesAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingYVaultSharesAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: YEARN_VAULT_V2_ADAPTER,
      callArgs: {
        type: Integration.YearnVaultV2Lend,
        yVault: YEARN_VAULT_V2_WETH,
        depositAmount,
        minIncomingYVaultSharesAmount: minIncomingYVaultSharesAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: YEARN_VAULT_V2_WETH,
    account: vaultProxy,
    expected: minIncomingYVaultSharesAmount,
    fuzziness: minIncomingYVaultSharesAmount - minIncomingYVaultSharesAmountWithSlippage,
  });
});

test("prepareUseIntegration for Yearn Vault V2 lend should be equal to encoded data with encodeCallArgsForYearnVaultV2Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: YEARN_VAULT_V2_ADAPTER,
      callArgs: {
        type: Integration.YearnVaultV2Lend,
        yVault: YEARN_VAULT_V2_WETH,
        depositAmount: toWei(100),
        minIncomingYVaultSharesAmount: toWei(50),
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
        "0x0000000000000000000000007ea777f9f6ecbf4d03dc5323d3f057b0730fc34a099f75150000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000a258c4606ca8206d8aa700ce2143d7db854d168c0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b1880000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});

test("prepare adapter trade for Yearn Vault V2 redeem should work correctly", async () => {
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

  const pricePerShareBeforeLend = await publicClient.readContract({
    abi: abiYVault,
    address: YEARN_VAULT_V2_WETH,
    functionName: "pricePerShare",
  });

  const slippage = 1n;

  const minIncomingYVaultSharesAmount = multiplyByRate({
    inverse: true,
    rate: pricePerShareBeforeLend,
    rateDecimals: 18,
    value: investmentAmount,
  });

  const minIncomingYVaultSharesAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingYVaultSharesAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: YEARN_VAULT_V2_ADAPTER,
      callArgs: {
        type: Integration.YearnVaultV2Lend,
        yVault: YEARN_VAULT_V2_WETH,
        depositAmount: investmentAmount,
        minIncomingYVaultSharesAmount: minIncomingYVaultSharesAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: YEARN_VAULT_V2_WETH,
    account: vaultProxy,
    expected: minIncomingYVaultSharesAmount,
    fuzziness: minIncomingYVaultSharesAmount - minIncomingYVaultSharesAmountWithSlippage,
  });

  const pricePerShareBeforeRedeem = await publicClient.readContract({
    abi: abiYVault,
    address: YEARN_VAULT_V2_WETH,
    functionName: "pricePerShare",
  });

  const minIncomingUnderlyingAmount = multiplyByRate({
    inverse: false,
    rate: pricePerShareBeforeRedeem,
    rateDecimals: 18,
    value: minIncomingYVaultSharesAmountWithSlippage,
  });

  const minIncomingUnderlyingAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingUnderlyingAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: YEARN_VAULT_V2_ADAPTER,
      callArgs: {
        type: Integration.YearnVaultV2Redeem,
        yVault: YEARN_VAULT_V2_WETH,
        maxOutgoingYVaultSharesAmount: minIncomingYVaultSharesAmountWithSlippage,
        minIncomingUnderlyingAmount,
        slippageToleranceBps: slippage * 100n, // convert to bps
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

test("prepareUseIntegration for Yearn Vault V2 redeem should be equal to encoded data with encodeCallArgsForYearnVaultV2Lend", () => {
  expect(
    prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: YEARN_VAULT_V2_ADAPTER,
      callArgs: {
        type: Integration.YearnVaultV2Redeem,
        yVault: YEARN_VAULT_V2_WETH,
        maxOutgoingYVaultSharesAmount: 0n,
        minIncomingUnderlyingAmount: 0n,
        slippageToleranceBps: 0n,
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
        "0x0000000000000000000000007ea777f9f6ecbf4d03dc5323d3f057b0730fc34ac29fa9dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000080000000000000000000000000a258c4606ca8206d8aa700ce2143d7db854d168c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
