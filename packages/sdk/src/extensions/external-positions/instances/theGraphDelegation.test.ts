import { parseEther } from "viem";
import { expect, test } from "vitest";
import { ITheGraphDelegationPositionLib } from "../../../../../abis/src/abis/ITheGraphDelegationPositionLib.js";
import { EXTERNAL_POSITION_MANAGER } from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testClientMainnet } from "../../../../tests/globals.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import {
  decodeTheGraphDelegationDelegateArgs,
  decodeTheGraphDelegationUndelegateArgs,
  decodeTheGraphDelegationWithdrawArgs,
} from "./theGraphDelegation.js";

const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

test("prepare external position trade for The Graph Delegation delegate should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 15680558n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x90d6d22bbd36f6138c7f6ae1e84ac0afe1c77d8a54cdf873bb70c5c101f7fd51
  const callArgs =
    "0x00000000000000000000000077bc80782bdceb445cbfcf6f7c31d0205d9a702500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000062a0bd1d110ff4e5b793119e95fc07c9d1fc8c4a0000000000000000000000000000000000000000000000000a688906bd8b0000";

  const decodedCallArgs = decodeTheGraphDelegationDelegateArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.TheGraphDelegationDelegate,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const grtValue = await publicClientMainnet.readContract({
    abi: ITheGraphDelegationPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getDelegationGrtValue",
    args: [decodedCallArgs.indexer],
  });

  expect(grtValue).toBe(746249999999999999n);
});

test("prepare external position trade for The Graph Delegation undelegate should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 16125126n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x3880f2eacccefe49c1f4fb893b630416c2fe576dfc4a6e401ea7bf633eded593
  const callArgs =
    "0x00000000000000000000000077bc80782bdceb445cbfcf6f7c31d0205d9a702500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000063e2c9a3db9ffd3cc108f08ead601966ea031f5c00000000000000000000000000000000000000000000000000990409fc05124d";

  const decodedCallArgs = decodeTheGraphDelegationUndelegateArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.TheGraphDelegationUndelegate,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const grtValue = await publicClientMainnet.readContract({
    abi: ITheGraphDelegationPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getDelegationGrtValue",
    args: [decodedCallArgs.indexer],
  });

  expect(grtValue).toBe(1011381388327971961n);
});

test("prepare external position trade for The Graph Delegation withdraw should work correctly", async () => {
  await testClientMainnet.reset({
    blockNumber: 16125134n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x2f4f6c1f5a522d3770a6594503f0ee936792ac7732d79f8db544b1464f9e1dd1
  const callArgs =
    "0x000000000000000000000000c9c461fa8580b897b7bd10d75305d608489e822300000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000085fe868adf7f5950b052469075556fb207e5372d0000000000000000000000000000000000000000000000000000000000000000";

  const decodedCallArgs = decodeTheGraphDelegationWithdrawArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.TheGraphDelegationWithdraw,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const grtValue = await publicClientMainnet.readContract({
    abi: ITheGraphDelegationPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getDelegationGrtValue",
    args: [decodedCallArgs.indexer],
  });

  expect(grtValue).toBe(1n);
});
