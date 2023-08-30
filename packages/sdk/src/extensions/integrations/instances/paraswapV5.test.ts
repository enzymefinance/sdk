import { ALICE, BOB, INTEGRATION_MANAGER, PARASWAP_V5_ADAPTER, USDC, WETH } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClientMainnet } from "../../../../tests/globals.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";

import { parseEther } from "viem";
import { beforeAll, test } from "vitest";

// blockNumber must be aligned with the test arguments data as it is used to compute the swapData hash.
beforeAll(async () => {
  await testClientMainnet.reset({
    blockNumber: 17832981n,
  });
});

test("prepare adapter trade for ParaswapV5 take order should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const swapData =
    "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002600000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f9234cb08edb93c0d4a4d4c70cc3ffd070e78e0700000000000000000000000000000000000000000000000000000000000000e491a32b69000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000de0b6b3a76400000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000004de5397ff1542f962076d0bfe58ea045ffa2d347aca0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000";

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: parseEther("1"),
  });

  await sendTestTransaction({
    clientNetwork: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: PARASWAP_V5_ADAPTER,
      callArgs: {
        type: Integration.ParaswapV5TakeOrder,
        minIncomingAssetAmount: 1667394003n,
        expectedIncomingAssetAmount: 1684236367n,
        outgoingAsset: WETH,
        outgoingAssetAmount: 1000000000000000000n,
        uuid: "0xa691489b65814ca1a2d6267936c64c4d",
        swapType: 0n,
        swapData,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: USDC,
    account: vaultProxy,
    expected: 1684236367n,
    fuzziness: 1684236367n - 1667394003n,
  });
});
