import { ALICE, BOB, EXTERNAL_POSITION_MANAGER, KILN_STAKING_CONTRACT, WETH } from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions, testClientMainnet } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareCreateExternalPosition } from "../prepareCreateExternalPosition.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import { KilnClaimType, decodeKilnStakeArgs } from "./kiln.js";
import { IKilnStakingPositionLib } from "@enzymefinance/abis/IKilnStakingPositionLib";
import { parseAbiItem, parseEther } from "viem";
import { assert, expect, test } from "vitest";

test("prepare external position trade for Kiln stake should work correctly", async () => {
  const vaultOwner = ALICE;
  const sharesBuyer = BOB;

  const { comptrollerProxy } = await testActions.createTestVault({
    settings: {
      vaultOwner,
      denominationAsset: WETH,
    },
    network: "mainnet",
  });

  const depositAmount = toWei(250);

  await testActions.buyShares({
    comptrollerProxy,
    network: "mainnet",
    sharesBuyer,
    investmentAmount: depositAmount,
  });

  const kilnTypeId = 8n;
  const validatorAmount = 1n;

  await sendTestTransaction({
    network: "mainnet",
    ...prepareCreateExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      typeId: kilnTypeId,
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const [externalPositionDeployedForFundEventLog] = await publicClientMainnet.getLogs({
    address: EXTERNAL_POSITION_MANAGER,
    event: parseAbiItem(
      "event ExternalPositionDeployedForFund(address indexed comptrollerProxy, address indexed vaultProxy, address externalPosition, uint256 indexed externalPositionTypeId, bytes data)",
    ),
  });

  const externalPositionProxy = externalPositionDeployedForFundEventLog?.args.externalPosition;
  assert(externalPositionProxy);

  await sendTestTransaction({
    network: "mainnet",
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

  const [validatorsAddedEventLog] = await publicClientMainnet.getLogs({
    event: parseAbiItem("event ValidatorsAdded(address stakingContractAddress, uint256 validatorAmount)"),
  });

  expect(validatorsAddedEventLog?.args).toEqual({ stakingContractAddress: KILN_STAKING_CONTRACT, validatorAmount });
});

test("prepare external position trade for Kiln claim fees should work correctly", async () => {
  const externalPositionAddress = "0x1286a58549be3d113ab5da9371393704f448c7f6" as const;
  const defaultPublicKey = "0x0000000" as const;

  const vaultOwner = "0x01bfb6b1051f0a6072ef0c079ea81274095e1510" as const;
  const comptrollerProxy = "0x6c62b8f7b2fd1c60ffd3afc1a2b15d4318745677" as const;

  await testClientMainnet.reset({
    blockNumber: 17264821n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xfca076b64faf411134c2a6c2424a4b0c81aa761ec06556dbf6b7e902e9d24e88
  const callArgs =
    "0x000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000816df553a89c4bff7ebfd778a9706a989dd3ce30000000000000000000000000000000000000000000000000000000000000001";

  const decodedCallArgs = decodeKilnStakeArgs(callArgs);

  await sendTestTransaction({
    network: "mainnet",
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

  const managedAssets = await publicClientMainnet.readContract({
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

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  // Taken from tx 0xfca076b64faf411134c2a6c2424a4b0c81aa761ec06556dbf6b7e902e9d24e88
  const callArgs =
    "0x000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000816df553a89c4bff7ebfd778a9706a989dd3ce30000000000000000000000000000000000000000000000000000000000000001";

  const decodedCallArgs = decodeKilnStakeArgs(callArgs);

  await testClientMainnet.reset({
    blockNumber: 17264822n,
  });

  await sendTestTransaction({
    network: "mainnet",
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

test("prepare external position trade for Kiln pause, and unpause position value should work correctly", async () => {
  // use info from tx 0x22b9715c6f371fa1fd025f37d22f02bcee273cbd097ff1a6aed746ff67d5da0c
  const vaultOwner = "0x01bfb6b1051f0a6072ef0c079ea81274095e1510" as const;
  const comptrollerProxy = "0xad2cf50ad663639c6d22f72f8f4d686f51fc89f8" as const;
  const externalPositionProxy = "0xb0d4d3fbdbc89dadb2546b68fead1b10f2cc27f0" as const;

  await testClientMainnet.reset({
    blockNumber: 17883104n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnPausePositionValue,
        externalPositionProxy,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const isPositionPausedAfterPause = await publicClientMainnet.readContract({
    abi: IKilnStakingPositionLib,
    address: externalPositionProxy,
    functionName: "positionValueIsPaused",
  });

  expect(isPositionPausedAfterPause).toBeTruthy();

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnUnpausePositionValue,
        externalPositionProxy,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const isPositionPausedAfterUnpause = await publicClientMainnet.readContract({
    abi: IKilnStakingPositionLib,
    address: externalPositionProxy,
    functionName: "positionValueIsPaused",
  });

  expect(isPositionPausedAfterUnpause).toBeFalsy();
});

// abi for staking contract: 0x0816df553a89c4bff7ebfd778a9706a989dd3ce3 used in unstake test
const IStakingContractStorageLib = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_publicKeyRoot",
        type: "bytes32",
      },
    ],
    name: "getExitRequestedFromRoot",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

test("prepare external position trade for Kiln unstake should work correctly", async () => {
  // use info from tx 0x22b9715c6f371fa1fd025f37d22f02bcee273cbd097ff1a6aed746ff67d5da0c
  const vaultOwner = "0x01bfb6b1051f0a6072ef0c079ea81274095e1510" as const;
  const comptrollerProxy = "0xad2cf50ad663639c6d22f72f8f4d686f51fc89f8" as const;
  const externalPositionProxy = "0xb0d4d3fbdbc89dadb2546b68fead1b10f2cc27f0" as const;
  const stakingContract = "0x0816df553a89c4bff7ebfd778a9706a989dd3ce3" as const;
  const publicKey =
    "0x990d14af044765720ac6e058c70b7e0e97aaac6777f817a6a2d2980c0a29851d18f413dcc1cd8a9fffe74240bc06a874" as const;
  const pubKeyRoot = "0x3159179a87d04f17975d9164c0921a702cf15f22b483868e09f29cc8ded6eb24" as const;

  await testClientMainnet.reset({
    blockNumber: 17883105n,
  });

  await testClientMainnet.setBalance({ address: vaultOwner, value: parseEther("1") });

  await sendTestTransaction({
    network: "mainnet",
    ...prepareUseExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      callArgs: {
        type: ExternalPosition.KilnUnstake,
        externalPositionProxy,
        publicKeys: publicKey,
        stakingContract,
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const isExitRequested = await publicClientMainnet.readContract({
    abi: IStakingContractStorageLib,
    address: stakingContract,
    functionName: "getExitRequestedFromRoot",
    args: [pubKeyRoot],
  });

  expect(isExitRequested).toBeTruthy();
});
