import { ALICE, BOB, MANAGEMENT_FEE, WETH } from "../../tests/constants.js";
import { testActions } from "../../tests/globals.js";
import { encodeManagementFeeSettings } from "../extensions/fees/instances/managementFee.js";
import { toBps } from "../utils/conversion.js";
import { decodeSetRecipientForFundParams, prepareSetRecipientForFundParams } from "./setRecipientForFund.js";
import { encodeFunctionData } from "viem";
import { expect, test } from "vitest";

test("should set recipient for fund correctly", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner: ALICE,
      denominationAsset: WETH,
      feeSettings: [
        {
          address: MANAGEMENT_FEE,
          settings: encodeManagementFeeSettings({
            perAnnumRateInBps: toBps(0.1),
          }),
        },
      ],
    },
    network: "mainnet",
  });

  await testActions.setRecipientForFund({
    network: "mainnet",
    account: ALICE,
    comptrollerProxy,
    recipient: BOB,
  });

  const newRecipient = await testActions.getRecipientForFund({
    comptrollerProxy,
  });

  expect(newRecipient).toEqual(BOB);
});

test("should prepare params correctly", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner: ALICE,
      denominationAsset: WETH,
      feeSettings: [
        {
          address: MANAGEMENT_FEE,
          settings: encodeManagementFeeSettings({
            perAnnumRateInBps: toBps(0.1),
          }),
        },
      ],
    },
    network: "mainnet",
  });

  expect(
    prepareSetRecipientForFundParams({
      comptrollerProxy,
      recipient: BOB,
    }),
  ).toMatchInlineSnapshot(`
    {
      "abi": [
        {
          "inputs": [
            {
              "name": "_comptrollerProxy",
              "type": "address",
            },
            {
              "name": "_recipient",
              "type": "address",
            },
          ],
          "name": "setRecipientForFund",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x34d1a73CC6fF0C7b8C376afBf582AA079032f880",
        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
      ],
      "functionName": "setRecipientForFund",
    }
  `);
});

test("should decode params correctly", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner: ALICE,
      denominationAsset: WETH,
      feeSettings: [
        {
          address: MANAGEMENT_FEE,
          settings: encodeManagementFeeSettings({
            perAnnumRateInBps: toBps(0.1),
          }),
        },
      ],
    },
    network: "mainnet",
  });

  const params = {
    comptrollerProxy,
    recipient: BOB,
  };

  const prepared = prepareSetRecipientForFundParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeSetRecipientForFundParams(encoded);

  expect(decoded).toEqual(params);
});
