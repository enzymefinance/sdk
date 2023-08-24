import { ILiquityDebtPositionLib } from "../../../../../abis/src/abis/ILiquityDebtPositionLib.js";
import { EXTERNAL_POSITION_MANAGER } from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import {
  decodeLiquityDebtPositionBorrowArgs,
  decodeLiquityDebtPositionOpenTroveArgs,
} from "./liquity.js";
import { parseEther } from "viem";
import { expect, test } from "vitest";

const comptrollerProxy = "0x746de9838bb3d14f1ac1b78bd855e48201f221a6" as const;
const vaultOwner = "0x8d1d8a440e9a3bb04260e0532ad81037f63bfa16" as const;

test("prepare external position trade for Liquity debt position Open Trove should work correctly", async () => {
  await testClient.reset({
    blockNumber: 15496448n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x17a5931f4d11516f4238983af1970f10cf171ae87b7dbedfb7766cdd6372caf7
  const callArgs =
    "0x0000000000000000000000000000000000000000000000000021c0331d5dc0000000000000000000000000000000000000000000000000001d24b2dfac52000000000000000000000000000000000000000000000000006c6b935b8bbd40000000000000000000000000000029d42d1c7b3113937e409130a94927a77e974cf3000000000000000000000000615181ed9d52a0a5718aa85f92ef5366ab167884";

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

  const lusdValue = await publicClient.readContract({
    abi: ILiquityDebtPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getDebtAssets",
    args: [],
  });

  expect(lusdValue).toBe(2000000000000000000000n);
});

test("prepare external position trade for Liquity debt position borrow should work correctly", async () => {
  await testClient.reset({
    blockNumber: 15496904n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x88f5546eccc9320624c2ad79da015db80f26974df94185314c666c93c9c7fdba
  const callArgs =
    "0x000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000028b2b9adca1bd1263086b0b221713a684968817000000000000000000000000c39e11ca02e107f649fa312eea48b62eb3c0db64";

  const decodedCallArgs = decodeLiquityDebtPositionBorrowArgs(callArgs);

  console.log({ decodedCallArgs });

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
    token: "0x5f98805a4e8be255a32880fdec7f6728c6568ba0",
    account: "0x278c647f7cfb9d55580c69d3676938608c945ba8",
    expected: 100000000000000000n,
  });
});