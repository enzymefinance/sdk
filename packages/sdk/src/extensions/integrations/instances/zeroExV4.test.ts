import { DPI, INTEGRATION_MANAGER, ZERO_EX_V4_ADAPTER } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { decodeZeroExV4TakeOrderArgs } from "./zeroExV4.js";
import { parseEther } from "viem";

import { test } from "vitest";

test("prepare adapter trade for zeroExV4 take order should work correctly", async () => {
  await testClient.reset({
    blockNumber: 17686286n,
  });

  const vaultOwner = "0xf2b163bbbe22ab6360fb4659029bfcba8e673dec";

  const comptrollerProxy = "0x1a6e4f75eed0e610c3c0c2f5af7da6ee2a3593c6";
  const vaultProxy = "0x86758fde8e8924be2b9fa440ff9d8c33a4e064a5";

  await testClient.setBalance({
    value: parseEther("1"),
    address: vaultOwner,
  });

  // Args hash was taken from tx 0x1d01ebb639d1fade3abe5449bd891a19a27901ef67747e569b249fd47e049eeb
  const { signedOrder, takerAssetFillAmount, orderType } = await decodeZeroExV4TakeOrderArgs(
    "0x00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000002e90edd000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000001c00000000000000000000000001494ca1f11d487c2bbe4543e90080aeba4ba3c2b000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000008ba2f1dfd5cb9bf9610000000000000000000000000000000000000000000000000000002e90edd000000000000000000000000000a69babef1ca67a37ffaf7a485dfff3382056e78c0000000000000000000000005966cbe0167d95ea03ffad0bd9091849a52dfbd50000000000000000000000001fd0c666094d8c5dae247aa6c3c4c33fd21bdc9100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000064b03ff501ffffffffffffffffffffffffffffffffffffff31b6d12264b03ec9000000360000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000001c555fef663fee8a817cbf678e2dda77dad574cd4112b44d34dacb8569af34784d2c0aaef7928ce92518294ad0dad2158624de8258ee7dbccba1f417d2354d5d39",
  );

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ZERO_EX_V4_ADAPTER,
      callArgs: {
        type: Integration.ZeroExV4TakeOrder,
        signedOrder, takerAssetFillAmount, orderType,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: DPI,
    account: vaultProxy,
    expected: 2575838838058496293217n,
  });
});
