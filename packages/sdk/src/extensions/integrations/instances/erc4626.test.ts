import { parseAbi } from "viem";
import { test } from "vitest";
import { ALICE, ERC4626_ADAPTER, INTEGRATION_MANAGER, MA_WETH, WETH } from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";

const abiMaShares = parseAbi([
  "function convertToShares(uint256 _assetAmount) view returns (uint256 sharesAmount_)",
] as const);

const abiMaAssets = parseAbi([
  "function convertToAssets(uint256 _sharesAmount) view returns (uint256 assetAmount_)",
] as const);

test("prepare adapter trade for ERC4626 lend should work correctly", async () => {
  const vaultOwner = ALICE;
  const slippage = 100n;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const outgoingAssetAmount = toWei(1000000);
  const minIncomingAmountWithSlippage = multiplyBySlippage({
    amount: outgoingAssetAmount,
    slippage,
  });

  const minIncomingAmount = await publicClient.readContract({
    abi: abiMaShares,
    address: MA_WETH,
    functionName: "convertToShares",
    args: [minIncomingAmountWithSlippage],
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Lend,
        tokenAddress: MA_WETH,
        outgoingAssetAmount,
        minIncomingAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: MA_WETH,
    account: vaultProxy,
    expected: minIncomingAmount,
    fuzziness: 100n,
  });
});

test("prepare adapter trade for ERC4626 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const slippage = 1n;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const outgoingAssetAmount = toWei(1000000);
  const minIncomingAmountWithSlippage = multiplyBySlippage({
    amount: outgoingAssetAmount,
    slippage,
  });

  const minIncomingAmount = await publicClient.readContract({
    abi: abiMaAssets,
    address: MA_WETH,
    functionName: "convertToAssets",
    args: [minIncomingAmountWithSlippage],
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Lend,
        tokenAddress: MA_WETH,
        outgoingAssetAmount,
        minIncomingAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: MA_WETH,
    account: vaultProxy,
    expected: minIncomingAmount,
    fuzziness: 100n,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.Erc4626Redeem,
        tokenAddress: WETH,
        outgoingAssetAmount,
        minIncomingAmount,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: outgoingAssetAmount,
    fuzziness: 100n,
  });
});
