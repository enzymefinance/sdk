import { test, expect } from "vitest";

import { ALICE, BOB, EXTERNAL_POSITION_MANAGER, KILN_STAKING_CONTRACT, WETH } from "../../tests/constants.js";
import { toWei } from "../utils/conversion.js";
import { ExternalPosition } from "../enums.js";
import { testActions, sendTestTransaction, publicClient } from "../../tests/globals.js";
import { prepareCreateExternalPosition } from "./prepareCreateExternalPosition.js";
import { parseAbiItem } from "viem";

test("prepare create external position should work correctly", async () => {
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
      trade: {
        type: ExternalPosition.KilnStake,
        callArgs: {
          validatorAmount,
          stakingContract: KILN_STAKING_CONTRACT,
        },
      },
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

  const [validatorsAddedEventLog] = await publicClient.getLogs({
    event: parseAbiItem("event ValidatorsAdded(address stakingContractAddress, uint256 validatorAmount)"),
  });

  expect(validatorsAddedEventLog?.args).toEqual({ stakingContractAddress: KILN_STAKING_CONTRACT, validatorAmount });

  expect(externalPositionDeployedForFundEventLog).toBeTruthy();
});

test("prepareCreateExternalPosition should be equal to encoded properly", () => {
  expect(
    prepareCreateExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      typeId: 3n,
      trade: {
        type: ExternalPosition.KilnStake,
        callArgs: {
          validatorAmount: 5n,
          stakingContract: KILN_STAKING_CONTRACT,
        },
      },
    }),
  ).toMatchInlineSnapshot(
    `
    {
      "abi": [
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_extension",
              "type": "address",
            },
            {
              "internalType": "uint256",
              "name": "_actionId",
              "type": "uint256",
            },
            {
              "internalType": "bytes",
              "name": "_callArgs",
              "type": "bytes",
            },
          ],
          "name": "callOnExtension",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function",
        },
      ],
      "args": [
        "0x1e3da40f999cf47091f869ebac477d84b0827cf4",
        0n,
        "0x000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000816df553a89c4bff7ebfd778a9706a989dd3ce30000000000000000000000000000000000000000000000000000000000000005",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
