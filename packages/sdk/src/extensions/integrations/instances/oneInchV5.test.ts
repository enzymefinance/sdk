import { ALICE, BOB, INTEGRATION_MANAGER, ONE_INCH_V5_ADAPTER, RETH, WETH } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { decodeOneInchV5TakeOrderArgs } from "./oneInchV5.js";

import { parseEther } from "viem";
import { beforeAll, test } from "vitest";

// blockNumber must be aligned with the test arguments data as it is used to compute the swapData hash.
beforeAll(async () => {
  await testClient.reset({
    blockNumber: 17883205n,
  });
});

test("prepare adapter trade for 1inchV5 take order should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  // Args hash was taken from tx 0xd1bbddc9dc11a84634f85e901757c687d1fe366e6eef60869253db0c48fd90e6
  const { executor, orderDescription, data } = await decodeOneInchV5TakeOrderArgs(
    "0x00000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf335880000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000ae78736cd615f374d3085123a210448e74fc639300000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf33588000000000000000000000000cc721874a2ee84198ef3a6a4c7ef7c642347d78a00000000000000000000000000000000000000000000010f0cf064dd59200000000000000000000000000000000000000000000000000000227cfc140e6e1b0500000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000012800000000000000000000000000000000000000000000010a0000dc00001a0020d6bdbf786b175474e89094c44da98b954eedeac495271d0f00a007e5c0d200000000000000000000000000000000000000000000000000009e00004f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e50160594a405d53811d3bc4766596efd80fd545a2706b175474e89094c44da98b954eedeac495271d0f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e500a4e0faa58465a2d369aa21b3e42d43374c6f9613c02aaa39b223fe8d0a0e5c4f27ead9083c756cc280a06c4eca27ae78736cd615f374d3085123a210448e74fc63931111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000",
  );

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: parseEther("1"),
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ONE_INCH_V5_ADAPTER,
      callArgs: {
        type: Integration.OneInchV5TakeOrder,
        executor,
        orderDescription,
        data,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: RETH,
    account: vaultProxy,
    expected: 2703050404931320911n,
    fuzziness: 2703050404931320911n - 2487613863293942433n,
  });
});
