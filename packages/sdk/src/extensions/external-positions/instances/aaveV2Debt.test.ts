import { EXTERNAL_POSITION_MANAGER } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import {
  decodeAaveV2DebtAddCollateralArgs,
  decodeAaveV2DebtBorrowArgs,
  decodeAaveV2DebtRemoveCollateralArgs,
  decodeAaveV2DebtRepayBorrowArgs,
} from "./aaveV2Debt.js";
import { type Address, parseEther } from "viem";
import { test } from "vitest";

const vaultProxy = "0x278C647F7cfb9D55580c69d3676938608C945ba8" as const;
const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

test("prepare external position trade for Aave V2 Debt add collateral should work correctly", async () => {
  await testClient.reset({
    blockNumber: 14428856n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x11148ae9452c8f68fb75f05bc4beec0224868f7fe17d9848feffd263d5cf07cd
  const callArgs =
    "0x000000000000000000000000c2c379f4c3c4b49c066a36f2cf847dc3871e27770000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000253329e0e5365b";

  const decodedCallArgs = decodeAaveV2DebtAddCollateralArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.AaveV2DebtAddCollateral,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.aTokens[0] as Address,
    account: decodedCallArgs.externalPositionProxy,
    expected: 10470829098088027n,
  });
});

test("prepare external position trade for Aave V2 Debt remove collateral should work correctly", async () => {
  await testClient.reset({
    blockNumber: 14430254n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x8a9ce501066d7122a728e741fef541cfc8180f005874883a01c3f88b6b6f4b5b
  const callArgs =
    "0x000000000000000000000000c2c379f4c3c4b49c066a36f2cf847dc3871e27770000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000011c37937e08000";

  const decodedCallArgs = decodeAaveV2DebtRemoveCollateralArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.AaveV2DebtRemoveCollateral,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.aTokens[0] as Address,
    account: decodedCallArgs.externalPositionProxy,
    expected: 5470851740820149n,
    fuzziness: 2428626n, // interest can be accured in the meantime, so we allow some fuzziness
  });
});

test("prepare external position trade for Aave V2 Debt borrow should work correctly", async () => {
  await testClient.reset({
    blockNumber: 14428866n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xd8cdbb2b5db096f7b690b3f4bf05feb1ddc6f806a7afd91bdbc63defd61403fb
  const callArgs =
    "0x000000000000000000000000c2c379f4c3c4b49c066a36f2cf847dc3871e27770000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006b175474e89094c44da98b954eedeac495271d0f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000d02ab486cedc0000";

  const decodedCallArgs = decodeAaveV2DebtBorrowArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.AaveV2DebtBorrow,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.underlyingTokens[0] as Address,
    account: vaultProxy,
    expected: 15000000000000000000n,
  });
});

test("prepare external position trade for Aave V2 Debt repay borrow should work correctly", async () => {
  await testClient.reset({
    blockNumber: 14430247n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x5cebab468a8aa8140dc00ab23f4f5f0fe5b75128515cc79e3c2e1088da3440e2
  const callArgs =
    "0x000000000000000000000000c2c379f4c3c4b49c066a36f2cf847dc3871e27770000000000000000000000000000000000000000000000000000000000000003000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000006b175474e89094c44da98b954eedeac495271d0f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000d02ab486cedc0000";

  const decodedCallArgs = decodeAaveV2DebtRepayBorrowArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.AaveV2DebtRepayBorrow,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const variableDebtToken = "0x6C3c78838c761c6Ac7bE9F59fe808ea2A6E4379d"; // varbaibleDebtDAI

  await testActions.assertBalanceOf({
    token: variableDebtToken,
    account: decodedCallArgs.externalPositionProxy,
    expected: 0n,
    fuzziness: 251172745550310n, // debt can be increased in the meantime, so we allow some fuzziness
  });
});
