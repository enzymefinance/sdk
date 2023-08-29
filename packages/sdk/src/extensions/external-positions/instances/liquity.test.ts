import { parseEther } from "viem";
import { test } from "vitest";
import { EXTERNAL_POSITION_MANAGER } from "../../../../tests/constants.js";
import { sendTestTransaction, testActions, testClientMainnet } from "../../../../tests/globals.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import {
  decodeLiquityDebtPositionAddCollateralArgs,
  decodeLiquityDebtPositionBorrowArgs,
  decodeLiquityDebtPositionOpenTroveArgs,
  decodeLiquityDebtPositionRemoveCollateralArgs,
  decodeLiquityDebtPositionRepayBorrowArgs,
} from "./liquity.js";

const LUSD = "0x5f98805a4e8be255a32880fdec7f6728c6568ba0" as const;

const comptrollerProxy = "0x746de9838bb3d14f1ac1b78bd855e48201f221a6" as const;
const vaultOwner = "0x8d1d8a440e9a3bb04260e0532ad81037f63bfa16" as const;
const vaultProxy = "0x278c647f7cfb9d55580c69d3676938608c945ba8" as const;

test("prepare external position trade for Liquity debt position Open Trove should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 15496448n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x17a5931f4d11516f4238983af1970f10cf171ae87b7dbedfb7766cdd6372caf7
  const callArgs =
    "0x00000000000000000000000030f003f39a295866df145e1fb5afaa2913ee7e3f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000021c0331d5dc0000000000000000000000000000000000000000000000000001d24b2dfac52000000000000000000000000000000000000000000000000006c6b935b8bbd40000000000000000000000000000029d42d1c7b3113937e409130a94927a77e974cf3000000000000000000000000615181ed9d52a0a5718aa85f92ef5366ab167884";

  const decodedCallArgs = decodeLiquityDebtPositionOpenTroveArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.LiquityDebtPositionOpenTrove,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: LUSD,
    account: vaultProxy,
    expected: 2200022742143806596932n,
  });
});

test("prepare external position trade for Liquity debt position add collateral should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 15496904n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x88f5546eccc9320624c2ad79da015db80f26974df94185314c666c93c9c7fdba
  const callArgs =
    "0x00000000000000000000000030f003f39a295866df145e1fb5afaa2913ee7e3f000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000028b2b9adca1bd1263086b0b221713a684968817000000000000000000000000c39e11ca02e107f649fa312eea48b62eb3c0db64";

  const decodedCallArgs = decodeLiquityDebtPositionAddCollateralArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.LiquityDebtPositionAddCollateral,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: LUSD,
    account: vaultProxy,
    expected: 2200022742143806596932n,
  });
});

test("prepare external position trade for Liquity debt position remove collateral should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 15525758n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xc1967b462514afa17f1e827b66f4d96b53611851016dbc64c29a5708f9ce8a57
  const callArgs =
    "0x00000000000000000000000030f003f39a295866df145e1fb5afaa2913ee7e3f00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000002c68af0bb140000000000000000000000000000a3e41e807779488f0f90de248c429c451c392ce0000000000000000000000000615181ed9d52a0a5718aa85f92ef5366ab167884";

  const decodedCallArgs = decodeLiquityDebtPositionRemoveCollateralArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.LiquityDebtPositionRemoveCollateral,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: LUSD,
    account: vaultProxy,
    expected: 2200022742143806596932n,
  });
});

test("prepare external position trade for Liquity debt position borrow should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 15525836n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x4d9706718486c7d77cbc081b3eabaab972194da71c859de94f385ad72b5374fa
  const callArgs =
    "0x00000000000000000000000030f003f39a295866df145e1fb5afaa2913ee7e3f000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000001aa535d3d0c0000000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000c39e11ca02e107f649fa312eea48b62eb3c0db64000000000000000000000000d6587a974c7d3ece23fa53d5606da6b291311f6f";

  const decodedCallArgs = decodeLiquityDebtPositionBorrowArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.LiquityDebtPositionBorrow,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: LUSD,
    account: vaultProxy,
    expected: 2100022742143806596932n,
  });
});

test("prepare external position trade for Liquity debt position repay borrow should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 15525807n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xe0654c73a891031e469d7d54ecd8c5711a61e3598475c0e2b0ebaea5ffeccac1
  const callArgs =
    "0x00000000000000000000000030f003f39a295866df145e1fb5afaa2913ee7e3f00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000ad78ebc5ac6200000000000000000000000000000aab92ac996a0317cb83650cd6098142b70ae56b2000000000000000000000000a3e41e807779488f0f90de248c429c451c392ce0";

  const decodedCallArgs = decodeLiquityDebtPositionRepayBorrowArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.LiquityDebtPositionRepayBorrow,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: LUSD,
    account: vaultProxy,
    expected: 2000022742143806596932n,
  });
});
