import { ALICE, BOB, EXTERNAL_POSITION_MANAGER, KILN_STAKING_CONTRACT, WETH } from "../../../../tests/constants.js";
import { publicClient, sendTestTransaction, testActions, testClient } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareCreateExternalPosition } from "../prepareCreateExternalPosition.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import { KilnClaimType, decodeKilnStakeArgs } from "./kiln.js";
import { IKilnStakingPositionLib } from "@enzymefinance/abis";
import { parseAbiItem, parseEther } from "viem";
import { assert, expect, test } from "vitest";

test("prepare external position trade for Kiln stake should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner,
    denominationAsset: WETH,
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    sharesBuyer,
    investmentAmount: depositAmount,
  });

  const kilnTypeId = 8n;
  const validatorAmount = 1n;

  await sendTestTransaction({
    ...prepareCreateExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      typeId: kilnTypeId,
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const [externalPositionDeployedForFundEventLog] = await publicClient.getLogs({
    address: EXTERNAL_POSITION_MANAGER,
    event: parseAbiItem(
      "event ExternalPositionDeployedForFund(address indexed comptrollerProxy, address indexed vaultProxy, address externalPosition, uint256 indexed externalPositionTypeId, bytes data)",
    ),
  });

  const externalPositionProxy = externalPositionDeployedForFundEventLog?.args.externalPosition;
  assert(externalPositionProxy);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnStake,
        validatorAmount,
        stakingContract: KILN_STAKING_CONTRACT,
        externalPositionProxy,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const [validatorsAddedEventLog] = await publicClient.getLogs({
    event: parseAbiItem("event ValidatorsAdded(address stakingContractAddress, uint256 validatorAmount)"),
  });

  expect(validatorsAddedEventLog?.args).toEqual({ stakingContractAddress: KILN_STAKING_CONTRACT, validatorAmount });
});

test("prepare external position trade for Kiln claim fees should work correctly", async () => {
  const externalPositionAddress = "0x1286a58549be3d113ab5da9371393704f448c7f6" as const;
  const defaultPublicKey = "0x0000000" as const;

  const vaultOwner = "0x01bfb6b1051f0a6072ef0c079ea81274095e1510" as const;
  const comptrollerProxy = "0x6c62b8f7b2fd1c60ffd3afc1a2b15d4318745677" as const;

  await testClient.reset({
    blockNumber: 17264820n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xfca076b64faf411134c2a6c2424a4b0c81aa761ec06556dbf6b7e902e9d24e88
  const callArgs =
    "0x0000000000000000000000006c62b8f7b2fd1c60ffd3afc1a2b15d431874567703e38a2b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000028000000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf335880000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000ae78736cd615f374d3085123a210448e74fc639300000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf33588000000000000000000000000cc721874a2ee84198ef3a6a4c7ef7c642347d78a00000000000000000000000000000000000000000000010f0cf064dd59200000000000000000000000000000000000000000000000000000227cfc140e6e1b0500000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000012800000000000000000000000000000000000000000000010a0000dc00001a0020d6bdbf786b175474e89094c44da98b954eedeac495271d0f00a007e5c0d200000000000000000000000000000000000000000000000000009e00004f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e50160594a405d53811d3bc4766596efd80fd545a2706b175474e89094c44da98b954eedeac495271d0f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e500a4e0faa58465a2d369aa21b3e42d43374c6f9613c02aaa39b223fe8d0a0e5c4f27ead9083c756cc280a06c4eca27ae78736cd615f374d3085123a210448e74fc63931111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000";

  const decodedCallArgs = decodeKilnStakeArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnStake,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testClient.reset({
    blockNumber: 17264821n,
  });

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnClaimFees,
        claimFeeType: KilnClaimType.ConsensusLayer,
        publicKeys: [defaultPublicKey, defaultPublicKey],
        stakingContract: KILN_STAKING_CONTRACT,
        externalPositionProxy: decodedCallArgs.externalPositionProxy,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const managedAssets = await publicClient.readContract({
    abi: IKilnStakingPositionLib,
    address: externalPositionAddress,
    functionName: "getManagedAssets",
  });

  // 1 validator was added at 32 ETH
  expect(managedAssets[1]).toEqual([32000000000000000000n]);
});

test("prepare external position trade for Kiln sweep ETH should work correctly", async () => {
  const vaultOwner = "0x01bfb6b1051f0a6072ef0c079ea81274095e1510" as const;
  const comptrollerProxy = "0x6c62b8f7b2fd1c60ffd3afc1a2b15d4318745677" as const;
  const vaultProxy = "0x48143538590587df4de00a77c2dd52f689088335" as const;

  await testClient.reset({
    blockNumber: 17264820n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xfca076b64faf411134c2a6c2424a4b0c81aa761ec06556dbf6b7e902e9d24e88
  const callArgs =
    "0x0000000000000000000000006c62b8f7b2fd1c60ffd3afc1a2b15d431874567703e38a2b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000028000000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf335880000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000ae78736cd615f374d3085123a210448e74fc639300000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf33588000000000000000000000000cc721874a2ee84198ef3a6a4c7ef7c642347d78a00000000000000000000000000000000000000000000010f0cf064dd59200000000000000000000000000000000000000000000000000000227cfc140e6e1b0500000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000012800000000000000000000000000000000000000000000010a0000dc00001a0020d6bdbf786b175474e89094c44da98b954eedeac495271d0f00a007e5c0d200000000000000000000000000000000000000000000000000009e00004f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e50160594a405d53811d3bc4766596efd80fd545a2706b175474e89094c44da98b954eedeac495271d0f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e500a4e0faa58465a2d369aa21b3e42d43374c6f9613c02aaa39b223fe8d0a0e5c4f27ead9083c756cc280a06c4eca27ae78736cd615f374d3085123a210448e74fc63931111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000";

  const decodedCallArgs = decodeKilnStakeArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnStake,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testClient.reset({
    blockNumber: 17264829n,
  });

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnSweepEth,
        externalPositionProxy: decodedCallArgs.externalPositionProxy,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 144115149584482222663n,
  });
});

test("prepare external position trade for Kiln pause position value should work correctly", async () => {
  const vaultOwner = "0x01bfb6b1051f0a6072ef0c079ea81274095e1510" as const;
  const comptrollerProxy = "0x6c62b8f7b2fd1c60ffd3afc1a2b15d4318745677" as const;
  const vaultProxy = "0x48143538590587df4de00a77c2dd52f689088335" as const;

  await testClient.reset({
    blockNumber: 17264820n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xfca076b64faf411134c2a6c2424a4b0c81aa761ec06556dbf6b7e902e9d24e88
  const callArgs =
    "0x0000000000000000000000006c62b8f7b2fd1c60ffd3afc1a2b15d431874567703e38a2b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000028000000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf335880000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000ae78736cd615f374d3085123a210448e74fc639300000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf33588000000000000000000000000cc721874a2ee84198ef3a6a4c7ef7c642347d78a00000000000000000000000000000000000000000000010f0cf064dd59200000000000000000000000000000000000000000000000000000227cfc140e6e1b0500000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000012800000000000000000000000000000000000000000000010a0000dc00001a0020d6bdbf786b175474e89094c44da98b954eedeac495271d0f00a007e5c0d200000000000000000000000000000000000000000000000000009e00004f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e50160594a405d53811d3bc4766596efd80fd545a2706b175474e89094c44da98b954eedeac495271d0f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e500a4e0faa58465a2d369aa21b3e42d43374c6f9613c02aaa39b223fe8d0a0e5c4f27ead9083c756cc280a06c4eca27ae78736cd615f374d3085123a210448e74fc63931111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000";

  const decodedCallArgs = decodeKilnStakeArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnStake,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testClient.reset({
    blockNumber: 17264829n,
  });

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnPausePositionValue,
        externalPositionProxy: decodedCallArgs.externalPositionProxy,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 144115149584482222663n,
  });
});

test("prepare external position trade for Kiln unpause position value should work correctly", async () => {
  const vaultOwner = "0x01bfb6b1051f0a6072ef0c079ea81274095e1510" as const;
  const comptrollerProxy = "0x6c62b8f7b2fd1c60ffd3afc1a2b15d4318745677" as const;
  const vaultProxy = "0x48143538590587df4de00a77c2dd52f689088335" as const;

  await testClient.reset({
    blockNumber: 17264820n,
  });

  await testClient.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xfca076b64faf411134c2a6c2424a4b0c81aa761ec06556dbf6b7e902e9d24e88
  const callArgs =
    "0x0000000000000000000000006c62b8f7b2fd1c60ffd3afc1a2b15d431874567703e38a2b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000028000000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf335880000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000ae78736cd615f374d3085123a210448e74fc639300000000000000000000000092f3f71cef740ed5784874b8c70ff87ecdf33588000000000000000000000000cc721874a2ee84198ef3a6a4c7ef7c642347d78a00000000000000000000000000000000000000000000010f0cf064dd59200000000000000000000000000000000000000000000000000000227cfc140e6e1b0500000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000120000000000000000000000000000000000000000000000000000000000000012800000000000000000000000000000000000000000000010a0000dc00001a0020d6bdbf786b175474e89094c44da98b954eedeac495271d0f00a007e5c0d200000000000000000000000000000000000000000000000000009e00004f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e50160594a405d53811d3bc4766596efd80fd545a2706b175474e89094c44da98b954eedeac495271d0f02a00000000000000000000000000000000000000000000000000000000000000001ee63c1e500a4e0faa58465a2d369aa21b3e42d43374c6f9613c02aaa39b223fe8d0a0e5c4f27ead9083c756cc280a06c4eca27ae78736cd615f374d3085123a210448e74fc63931111111254eeb25477b68fb85ed929f73a960582000000000000000000000000000000000000000000000000";

  const decodedCallArgs = decodeKilnStakeArgs(callArgs);

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnStake,
        ...decodedCallArgs,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testClient.reset({
    blockNumber: 17264829n,
  });

  await sendTestTransaction({
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnPausePositionValue,
        externalPositionProxy: decodedCallArgs.externalPositionProxy,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  await testActions.assertBalanceOf({
    token: WETH,
    account: vaultProxy,
    expected: 144115149584482222663n,
  });
});
