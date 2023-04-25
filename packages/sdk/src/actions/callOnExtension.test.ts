import { expect, test } from "vitest";
import { encodeFunctionData, getAddress, toHex } from "viem";
import { decodeCallOnExtensionParams, prepareCallOnExtensionParams } from "./callOnExtension.js";
import { AAVE_V2_ADAPTER, ALICE, A_WETH, BOB, INTEGRATION_MANAGER, WETH } from "../../tests/constants.js";
import { testActions, sendTestTransaction } from "../../tests/globals.js";
import { toWei } from "../utils/conversion.js";
import { prepareAdapterTrade } from "../integrations/prepareAdapterTrade.js";
import { Integration } from "../enums.js";

test("call on extension should work correctly", async () => {
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

  await sendTestTransaction({
    ...prepareAdapterTrade({
      integrationManager: INTEGRATION_MANAGER,
      trade: {
        type: Integration.AaveV2Lend,
        callArgs: {
          adapter: AAVE_V2_ADAPTER,
          aToken: A_WETH,
          depositAmount,
        },
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: A_WETH,
    account: vaultProxy,
    expected: depositAmount,
  });
});

test("decode call on extension should work correctly", () => {
  const params = {
    extension: getAddress("0x976EA74026E726554dB657fA54763abd0C3a0aa9"),
    actionId: 2n,
    callArgs: toHex("a9059cbb2ab09eb219583f4a59a5d0623ade346d962bcd4e46b11da047c9049b"),
  };
  const prepared = prepareCallOnExtensionParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeCallOnExtensionParams(encoded);

  expect(decoded).toEqual(params);
});
