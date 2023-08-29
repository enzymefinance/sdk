import { IArbitraryLoanPositionLib } from "../../../../../abis/src/abis/IArbitraryLoanPositionLib.js";
import { TESTNET_EXTERNAL_POSITION_MANAGER } from "../../../../tests/constants.js";
import { publicClientPolygon, sendTestTransaction, testClientPolygon } from "../../../../tests/globals.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareCreateExternalPosition } from "../prepareCreateExternalPosition.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import {
  decodeArbitraryLoanCloseLoanArgs,
  decodeArbitraryLoanReconcileArgs,
  decodeArbitraryLoanUpdateBorrowableAmountArgs,
} from "./arbitraryLoan.js";
import { parseEther } from "viem";
import { expect, test } from "vitest";

const comptrollerProxy = "0x98de9294485f99aea12ca4af411f61ee6db3d604" as const;
const vaultOwner = "0x32efef8899b23899ff179b446ef7564e0de84cba" as const;

const abitraryLoanTypeId = 3n;

test("prepare external position trade for Arbitrary Loan configure loan should work correctly", async () => {
  await testClientPolygon.reset({
    blockNumber: 32509888n,
  });

  await testClientPolygon.setBalance({ address: vaultOwner, value: parseEther("1") });
  // Taken from tx 0x1fd60f36babb6f006c9cde48232d4d33133408f90f95e8d1729327eb62968bd8
  const actionArgs = {
    borrower: "0x32EFEf8899b23899FF179B446eF7564E0De84Cba",
    asset: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    amount: 0n,
    accountingModule: "0xB3DCb678CeeECEEDe9A3E215E9576850dAef29FC",
    accountingModuleConfigData:
      "0x0000000000000000000000000000000000000000033b2e3c9fd0803ce80000000000000000000000000000000000000000000000033b2e3cc9ba65ba47e4cb7400000000000000000000000000000000000000000000000000000000630f18f000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001",
    description: "0x7465737400000000000000000000000000000000000000000000000000000000",
  } as const;

  await sendTestTransaction({
    ...prepareCreateExternalPosition({
      externalPositionManager: TESTNET_EXTERNAL_POSITION_MANAGER,
      typeId: abitraryLoanTypeId,
      callArgs: {
        type: ExternalPosition.ArbitraryLoanConfigureLoan,
        ...actionArgs,
      },
    }),
    network: "polygon",
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const externalPositionProxy = "0xcc139b59b4c5997d523df222e8313bfb938264c9" as const;

  const [borrower, borrowableAmoumt, loanAsset] = await Promise.all([
    publicClientPolygon.readContract({
      abi: IArbitraryLoanPositionLib,
      address: externalPositionProxy,
      functionName: "getBorrower",
    }),
    publicClientPolygon.readContract({
      abi: IArbitraryLoanPositionLib,
      address: externalPositionProxy,
      functionName: "getBorrowableAmount",
    }),
    publicClientPolygon.readContract({
      abi: IArbitraryLoanPositionLib,
      address: externalPositionProxy,
      functionName: "getLoanAsset",
    }),
  ]);

  expect(borrower).toEqual(actionArgs.borrower);
  expect(borrowableAmoumt).toEqual(actionArgs.amount);
  expect(loanAsset).toEqual(actionArgs.asset);
});

test("prepare external position trade for Arbitrary Loan update borrowable amount should work correctly", async () => {
  await testClientPolygon.reset({
    blockNumber: 30972230n,
  });

  await testClientPolygon.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xa26f1bf69ca292f85257c5350cdd1edf809d1dc545a8edd23b33b80a0b9aeaf6
  const callArgs =
    "0x000000000000000000000000fbbb4b04883f5eb9e1ea380eff45fa84b7cb62810000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000001c6bf52634000";

  const decodedCallArgs = decodeArbitraryLoanUpdateBorrowableAmountArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: TESTNET_EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.ArbitraryLoanUpdateBorrowableAmount,
        ...decodedCallArgs,
      },
    }),
    network: "polygon",
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const borrowableAmoumt = await publicClientPolygon.readContract({
    abi: IArbitraryLoanPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getBorrowableAmount",
  });

  expect(borrowableAmoumt).toBe(500000000000000n);
});

test("prepare external position trade for Arbitrary Loan reconcile should work correctly", async () => {
  await testClientPolygon.reset({
    blockNumber: 30973505n,
  });

  await testClientPolygon.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x31bfc3dfe41ddfdad46ac294957bb14bd58210139ce54bae5dacbd645e270f28
  const callArgs =
    "0x0000000000000000000000004fe8b848ef1f9eef8589b88e9e42b1439c41a13600000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000";

  const decodedCallArgs = decodeArbitraryLoanReconcileArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: TESTNET_EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.ArbitraryLoanReconcile,
        ...decodedCallArgs,
      },
    }),
    network: "polygon",
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const totalRepaid = await publicClientPolygon.readContract({
    abi: IArbitraryLoanPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "getTotalRepaid",
  });

  expect(totalRepaid).toBeGreaterThan(1000230144595000n);
});

test("prepare external position trade for Arbitrary Loan close loan should work correctly", async () => {
  await testClientPolygon.reset({
    blockNumber: 30854017n,
  });

  await testClientPolygon.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0x879192366ae3012293719cfc1a3d0273d32f02415d519a27d334abd6e4b4d5c7
  const callArgs =
    "0x000000000000000000000000b84fae783c9ba1aa99250dade86f5f031ead6f0f00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000002000000000000000000000000dab529f40e671a1d4bf91361c21bf9f0c9712ab70000000000000000000000008505b9d2254a7ae468c0e9dd10ccea3a837aef5c";

  const decodedCallArgs = decodeArbitraryLoanCloseLoanArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: TESTNET_EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.ArbitraryLoanCloseLoan,
        ...decodedCallArgs,
      },
    }),
    network: "polygon",
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const loanIsClosed = await publicClientPolygon.readContract({
    abi: IArbitraryLoanPositionLib,
    address: decodedCallArgs.externalPositionProxy,
    functionName: "loanIsClosed",
  });

  expect(loanIsClosed).toBeTruthy();
});
