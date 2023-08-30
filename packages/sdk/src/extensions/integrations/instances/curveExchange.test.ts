import { parseAbi } from "viem";
import { test } from "vitest";

import {
  ALICE,
  BOB,
  CURVE_EXCHANGE_ADAPTER,
  CURVE_REGISTRY,
  ETH_ADDRESS,
  INTEGRATION_MANAGER,
  STETH,
  WETH,
} from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";

const abiCurveRegistry = parseAbi(["function get_address(uint256 _id) view returns (address)"] as const);

const abiCurveSwaps = parseAbi([
  "function get_best_rate(address _from, address to, uint256 amount) view returns (address bestPool, uint256 amountReceived)",
] as const);

test("prepare adapter trade for Uniswap V2 Exchange take order should work correctly", async () => {
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

  // id won't change, for swaps it will be always the same id in the registry
  const swapId = 2n;

  const swapsContcrat = await publicClientMainnet.readContract({
    abi: abiCurveRegistry,
    address: CURVE_REGISTRY,
    functionName: "get_address",
    args: [swapId],
  });

  const [bestPool, minIncomingAssetAmount] = await publicClientMainnet.readContract({
    abi: abiCurveSwaps,
    address: swapsContcrat,
    functionName: "get_best_rate",
    args: [ETH_ADDRESS, STETH, depositAmount],
  });

  const minIncomingAssetAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingAssetAmount,
    slippage: 1n,
  });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: CURVE_EXCHANGE_ADAPTER,
      callArgs: {
        type: Integration.CurveExchangeTakeOrder,
        pool: bestPool,
        outgoingAsset: WETH,
        outgoingAssetAmount: depositAmount,
        minIncomingAsset: STETH,
        minIncomingAssetAmount: minIncomingAssetAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: STETH,
    account: vaultProxy,
    expected: minIncomingAssetAmount,
    fuzziness: minIncomingAssetAmount - minIncomingAssetAmountWithSlippage,
  });
});
