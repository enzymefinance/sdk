import { ALICE, BOB, ERC4626_ADAPTER, INTEGRATION_MANAGER, MA_WETH, WETH } from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { multiplyBySlippage } from "../../../utils/slippage.js";
import { Integration } from "../integrationTypes.js";
import { prepareUseIntegration } from "../prepareUseIntegration.js";
import { parseAbi } from "viem";
import { test } from "vitest";

const abiERC4626 = parseAbi([
  "function convertToShares(uint256 _assetAmount) view returns (uint256 sharesAmount_)",
  "function convertToAssets(uint256 _sharesAmount) view returns (uint256 assetAmount_)",
] as const);

test("prepare adapter trade for ERC4626 lend should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const outgoingAssetAmount = toWei(100);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: outgoingAssetAmount,
  });

  const minIncomingAmount = await publicClientMainnet.readContract({
    abi: abiERC4626,
    address: MA_WETH,
    account: vaultProxy,
    functionName: "convertToShares",
    args: [outgoingAssetAmount],
  });

  const slippage = 1n;

  const minIncomingAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.ERC4626Lend,
        tokenAddress: MA_WETH,
        outgoingAssetAmount,
        minIncomingAmount: minIncomingAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: MA_WETH,
    account: vaultProxy,
    expected: minIncomingAmount,
    fuzziness: minIncomingAmount - minIncomingAmountWithSlippage,
  });
});

test("prepare adapter trade for ERC4626 redeem should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy, vaultProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const outgoingAssetAmount = toWei(100);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: outgoingAssetAmount,
  });

  const minIncomingLendAmount = await publicClientMainnet.readContract({
    abi: abiERC4626,
    address: MA_WETH,
    account: vaultProxy,
    functionName: "convertToShares",
    args: [outgoingAssetAmount],
  });

  const slippage = 1n;

  const minIncomingLendAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingLendAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.ERC4626Lend,
        tokenAddress: MA_WETH,
        outgoingAssetAmount,
        minIncomingAmount: minIncomingLendAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: MA_WETH,
    account: vaultProxy,
    expected: minIncomingLendAmount,
    fuzziness: minIncomingLendAmount - minIncomingLendAmountWithSlippage,
  });

  const minIncomingRedeemAmount = await publicClientMainnet.readContract({
    abi: abiERC4626,
    address: MA_WETH,
    account: vaultProxy,
    functionName: "convertToAssets",
    args: [minIncomingLendAmountWithSlippage],
  });

  const minIncomingRedeemAmountWithSlippage = multiplyBySlippage({
    amount: minIncomingRedeemAmount,
    slippage,
  });

  await sendTestTransaction({
    ...prepareUseIntegration({
      integrationManager: INTEGRATION_MANAGER,
      integrationAdapter: ERC4626_ADAPTER,
      callArgs: {
        type: Integration.ERC4626Redeem,
        tokenAddress: MA_WETH,
        outgoingAssetAmount: minIncomingLendAmountWithSlippage,
        minIncomingAmount: minIncomingRedeemAmountWithSlippage,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: minIncomingRedeemAmount,
    fuzziness: minIncomingRedeemAmount - minIncomingRedeemAmountWithSlippage,
  });
});
