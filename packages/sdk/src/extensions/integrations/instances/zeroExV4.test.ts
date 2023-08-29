import { INTEGRATION_MANAGER, ZERO_EX_V4_ADAPTER, WETH } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { decodeZeroExV4TakeOrderArgs } from "./zeroExV4.js";
import { parseEther } from "viem";

import { test } from "vitest";

test("prepare adapter trade for zeroExV4 take order should work correctly", async () => {
  await testClient.reset({
    blockNumber: 17685732n,
  });

  const comptrollerProxy = "0xc65de17ec97eec0e184c94767517b6acf47b27aa";
  const vaultOwner = "0x3bd195c758adafbf092666e1a410fd67b8c14a4f";
  const vaultProxy = "0x4819ac09e4619748b1cdf657283a948731fa6ab6";

  await testClient.setBalance({
    value: parseEther("1"),
    address: vaultOwner,
  });

  // callArgs from tx 0x480356e40b21ef1eab2168d02694efc49ea9de50198d3811db7383fdacfe4e88
  const callArgs = "0x0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000037e11d600000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001c0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000006ad91e052f06943d000000000000000000000000000000000000000000000000000000037e11d600000000000000000000000000a69babef1ca67a37ffaf7a485dfff3382056e78c0000000000000000000000005966cbe0167d95ea03ffad0bd9091849a52dfbd50000000000000000000000001fd0c666094d8c5dae247aa6c3c4c33fd21bdc9100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064b025e301ffffffffffffffffffffffffffffffffffffff04e5804a64b024b7000000360000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000001bd5b2117ff21fbd946204f1161dd70f3f0f13f7797d09218399deb679516fda9c58b7db3ddaabcd188972ba5c97b415f09dd5c8a2fb4ce16c3db28312707b828d";

  const decodedCallArgs = await decodeZeroExV4TakeOrderArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ZERO_EX_V4_ADAPTER,
      callArgs: {
        type: Integration.ZeroExV4TakeOrder,
        ...decodedCallArgs
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 7699218045579203645n,
  });
});
