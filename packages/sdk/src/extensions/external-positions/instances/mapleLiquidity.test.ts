import { EXTERNAL_POSITION_MANAGER, WETH } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import {
  decodeMapleLiquidityCancelRedeemV2Args,
  decodeMapleLiquidityClaimRewardsV1Args,
  decodeMapleLiquidityLendV2Args,
  decodeMapleLiquidityRedeemV2Args,
  decodeMapleLiquidityRequestRedeemV2Args,
} from "./mapleLiquidity.js";
import { parseEther } from "viem";
import { test } from "vitest";

test.only("prepare external position trade for Maple Liquidity lend V2 should work correctly", async () => {
  const vaultProxy = "0x278c647f7cfb9d55580c69d3676938608c945ba8" as const;
  const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
  const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

  await testClient.reset({
    blockNumber: 17270518n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xec93a05a52d999b353508818510e157d0632aeceaae60d06638857a423dc63ba
  const callArgs =
    "0x00000000000000000000000010ee63e67f1599abe651e526a761f428a725f235000000000000000000000000000000000000000000000000000000000000000900000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000fff9a1caf78b2e5b0a49355a8637ea78b43fb6c300000000000000000000000000000000000000000000000000038d7ea4c68000";

  const decodedCallArgs = decodeMapleLiquidityLendV2Args(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.MapleLiquidityLendV2,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 2137266192270935n,
  });
});

test("prepare external position trade for Maple Liquidity redeem V2 should work correctly", async () => {
  const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
  const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

  await testClient.reset({
    blockNumber: 16238961n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x5a54cb31c0b059ee7a280ea4da3bcf03c53760e8aebe3fe71e181bcfee4422de
  const callArgs =
    "0x00000000000000000000000010ee63e67f1599abe651e526a761f428a725f235000000000000000000000000000000000000000000000000000000000000000b00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000fff9a1caf78b2e5b0a49355a8637ea78b43fb6c3000000000000000000000000000000000000000000000000000034793ae2a28c";

  const decodedCallArgs = decodeMapleLiquidityRedeemV2Args(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.MapleLiquidityRedeemV2,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.pool,
    account: decodedCallArgs.externalPositionProxy,
    expected: 950394819398592n,
  });
});

test("prepare external position trade for Maple Liquidity request redeem V2 should work correctly", async () => {
  const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
  const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

  await testClient.reset({
    blockNumber: 16238972n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x80c91825d037c2e85e39a9ab5d13348f079dfd6817c039cfe91a4d7ca9545aed
  const callArgs =
    "0x0000000000000000000000002affcd7650c2c116edb6907725dab53a259285c7000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000079400a2c9a5e2431419cac98bf46893c86e8bdd700000000000000000000000000000000000000000000000000000000000f3a6b";

  const decodedCallArgs = decodeMapleLiquidityRequestRedeemV2Args(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.MapleLiquidityRequestRedeemV2,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.pool,
    account: decodedCallArgs.externalPositionProxy,
    expected: 3072431n,
  });
});

test("prepare external position trade for Maple Liquidity cancel redeem V2 should work correctly", async () => {
  const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
  const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

  await testClient.reset({
    blockNumber: 16274942n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xf4b5cd5fc4e801907041f2de96bc5cad98223f0c5c410b1f785f5d2e94ebd192
  const callArgs =
    "0x00000000000000000000000010ee63e67f1599abe651e526a761f428a725f235000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000fff9a1caf78b2e5b0a49355a8637ea78b43fb6c3000000000000000000000000000000000000000000000000000012cd64268075";

  const decodedCallArgs = decodeMapleLiquidityCancelRedeemV2Args(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.MapleLiquidityCancelRedeemV2,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.pool,
    account: decodedCallArgs.externalPositionProxy,
    expected: 971068177239093n,
  });
});

test("prepare external position trade for Maple Liquidity claim rewards V1 should work correctly", async () => {
  const vaultProxy = "0x339b7ba786e6cf938b34f81d7c9543264ddf73b7" as const;
  const comptrollerProxy = "0x69E38c085A2f87BC27c5fCE9B126a50Df960Ab63" as const;
  const vaultOwner = "0xbf687e4f225e86faf1bbdd5b7b14eccec2f71fdb" as const;

  await testClient.reset({
    blockNumber: 16770470n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x368f571ad93ac9e9a1f3dfef05f0721c22daafaf5a5000955a76c722ca6776ec
  const callArgs =
    "0x0000000000000000000000009f37f4fb3f4f9a2eaa2300bd79530bf73f11d2ef000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000d0123f5220a36e9ec6082d83b4a11f92aa48ccd0";

  const decodedCallArgs = decodeMapleLiquidityClaimRewardsV1Args(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.MapleLiquidityClaimRewardsV1,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: "0x33349B282065b0284d756F0577FB39c158F935e6", // MPL token
    account: vaultProxy,
    expected: 34975869761446182024n,
  });
});
