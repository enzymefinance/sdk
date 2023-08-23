import { COMP, EXTERNAL_POSITION_MANAGER } from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import {
  decodeCompoundV2DebtAddCollateralArgs,
  decodeCompoundV2DebtBorrowArgs,
  decodeCompoundV2DebtClaimCompArgs,
  decodeCompoundV2DebtRemoveCollateralArgs,
  decodeCompoundV2DebtRepayBorrowArgs,
} from "./compoundV2Debt.js";
import { type Address, parseAbi, parseEther } from "viem";
import { expect, test } from "vitest";

const abiCToken = parseAbi(["function borrowBalanceStored(address user) view returns (uint256)"] as const);

test("prepare external position trade for Compound V2 Debt add collateral should work correctly", async () => {
  const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
  const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

  await testClient.reset({
    blockNumber: 14186197n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xaae1a73d74e7cc2de7644b4a1a865d3658227b2d7386ed9a256ebc80cfeb5eed
  const callArgs =
    "0x0000000000000000000000004df7cb902e41604c3150d6b73789417c92d84a6b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000039aa39c021dfbae8fac545936693ac917d5e756300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000014a72467cbe0000000000000000000000000000000000000000000000000000000000000000";

  const decodedCallArgs = decodeCompoundV2DebtAddCollateralArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.CompoundV2DebtAddCollateral,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.cTokens[0] as Address,
    account: decodedCallArgs.externalPositionProxy,
    expected: 1419256429758n,
  });
});

test("prepare external position trade for Compound V2 Debt remove collateral should work correctly", async () => {
  const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
  const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

  await testClient.reset({
    blockNumber: 14185691n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x9decb49bf4ca9cd43dc6a3341df84923fe4d5ce97f62011263f8dccd8cde96d1
  const callArgs =
    "0x0000000000000000000000004df7cb902e41604c3150d6b73789417c92d84a6b000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e0000000000000000000000000000000000000000000000000000000000000000100000000000000000000000039aa39c021dfbae8fac545936693ac917d5e756300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000014a72467cbe0000000000000000000000000000000000000000000000000000000000000000";

  const decodedCallArgs = decodeCompoundV2DebtRemoveCollateralArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.CompoundV2DebtRemoveCollateral,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.cTokens[0] as Address,
    account: decodedCallArgs.externalPositionProxy,
    expected: 0n,
  });
});

test("prepare external position trade for Compound V2 Debt borrow should work correctly", async () => {
  const vaultProxy = "0x278C647F7cfb9D55580c69d3676938608C945ba8" as const;
  const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
  const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

  await testClient.reset({
    blockNumber: 14186211n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xabca9acde7398fa18f17c895356da6f64cf5bef6e0d4f4d55dcdd18f65b45256
  const callArgs =
    "0x0000000000000000000000004df7cb902e41604c3150d6b73789417c92d84a6b000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000010000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f98400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000001bc16d674ec8000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000035a18000230da775cac24873d00ff85bccded550";

  const decodedCallArgs = decodeCompoundV2DebtBorrowArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.CompoundV2DebtBorrow,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: decodedCallArgs.underlyingTokens[0] as Address,
    account: vaultProxy,
    expected: 4957808722677052928n,
  });
});

test("prepare external position trade for Compound V2 Debt repay borrow should work correctly", async () => {
  const comptrollerProxy = "0x746de9838BB3D14f1aC1b78Bd855E48201F221a6" as const;
  const vaultOwner = "0x0D947D68f583e8B23ff816df9ff3f23a8Cfd7496" as const;

  await testClient.reset({
    blockNumber: 14186219n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x9bb8affe019e5fec8a3e46eddfc3287d1938797d1a84f456ff04623c4604168f
  const callArgs =
    "0x0000000000000000000000004df7cb902e41604c3150d6b73789417c92d84a6b000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000010000000000000000000000001f9840a85d5af5bf1d1762f925bdaddc4201f9840000000000000000000000000000000000000000000000000000000000000001ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000100000000000000000000000035a18000230da775cac24873d00ff85bccded550";
  const decodedCallArgs = decodeCompoundV2DebtRepayBorrowArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.CompoundV2DebtRepayBorrow,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const cUni = "0x35a18000230da775cac24873d00ff85bccded550" as const;

  const borrowBalanceStored = await publicClient.readContract({
    abi: abiCToken,
    address: cUni,
    functionName: "borrowBalanceStored",
    args: [decodedCallArgs.underlyingTokens[0] as Address],
  });

  expect(borrowBalanceStored).toEqual(0n);
});

test.only("prepare external position trade for Compound V2 Debt claim comp should work correctly", async () => {
  const vaultProxy = "0x91ab92a9fb5002e9f16d3c51910a6cda4f2895ee" as const;
  const comptrollerProxy = "0xd1b7ac3956c5e6aa9c49e833f8b49dc7565a0840" as const;
  const vaultOwner = "0xa77fe539ddca9ea0abc7b81d2da4381d0fc4417c" as const;

  await testClient.reset({
    blockNumber: 15383723n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xe88e922525047e62664f365b22573a5a16bf5ec3eaded6cd0aaa6b27f1d38dcf
  const callArgs =
    "0x000000000000000000000000fb634aa45146ba28bddd98f9eb53a2cf8924c6aa0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
  const decodedCallArgs = decodeCompoundV2DebtClaimCompArgs(callArgs);

  const compBalanceBefore = await testActions.getBalanceOf({
    token: COMP,
    account: vaultProxy,
  });

  console.log({ decodedCallArgs });

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.CompoundV2DebtClaimComp,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const compBalanceAfter = await testActions.getBalanceOf({
    token: COMP,
    account: vaultProxy,
  });

  expect(compBalanceAfter).toBeGreaterThan(compBalanceBefore);
});
