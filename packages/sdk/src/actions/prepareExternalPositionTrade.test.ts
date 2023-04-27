import { test, expect } from "vitest";

import { ALICE, BOB, EXTERNAL_POSITION_MANAGER, KILN_STAKING_CONTRACT, WETH } from "../../tests/constants.js";
import { toWei } from "../utils/conversion.js";
import { ExternalPosition } from "../enums.js";
import { testActions, sendTestTransaction } from "../../tests/globals.js";
import { prepareCreateExternalPosition } from "./prepareCreateExternalPosition.js";
import { decodeEventLog, getEventSelector, type Address } from "viem";
import { IKilnStakingPositionLib } from "../../../abis/src/abis/IKilnStakingPositionLib.js";
import { prepareExternalPositionTrade } from "./prepareExternalPositionTrade.js";
import { IExternalPositionManager } from "../../../abis/src/abis/IExternalPositionManager.js";

test("prepare external position trade should work correctly", async () => {
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

  const { receipt: createExternalPositionReceipt } = await sendTestTransaction({
    ...prepareCreateExternalPosition({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      typeId: kilnTypeId,
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const externalPositionDeployedForFundEventSelector = getEventSelector(
    "ExternalPositionDeployedForFund(address indexed comptrollerProxy, address indexed vaultProxy, address externalPosition, uint256 indexed externalPositionTypeId, bytes data)",
  );

  const externalPositionDeployedForFundEvent = createExternalPositionReceipt.logs.find(
    (log) => log.topics[0] === externalPositionDeployedForFundEventSelector,
  );

  const externalPositionDeployedForFundEventLog = decodeEventLog({
    abi: IExternalPositionManager,
    data: externalPositionDeployedForFundEvent?.data,
    topics: externalPositionDeployedForFundEvent?.topics ?? [],
  });

  const { receipt: externalPositionTradeReceipt } = await sendTestTransaction({
    ...prepareExternalPositionTrade({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      trade: {
        type: ExternalPosition.KilnStake,
        callArgs: {
          validatorAmount,
          stakingContract: KILN_STAKING_CONTRACT,
          externalPositionProxy: (externalPositionDeployedForFundEventLog.args as { externalPosition: Address })
            .externalPosition,
        },
      },
    }),
    account: vaultOwner,
    address: comptrollerProxy,
  });

  const validatorsAddedEventSelector = getEventSelector(
    "ValidatorsAdded(address stakingContractAddress, uint256 validatorAmount)",
  );

  const validatorsAddedEvent = externalPositionTradeReceipt.logs.find(
    (log) => log.topics[0] === validatorsAddedEventSelector,
  );

  const validatorsAddedEventLog = decodeEventLog({
    abi: IKilnStakingPositionLib,
    data: validatorsAddedEvent?.data,
    topics: validatorsAddedEvent?.topics ?? [],
  });

  expect(validatorsAddedEventLog.args).toEqual({ stakingContractAddress: KILN_STAKING_CONTRACT, validatorAmount });
});

test("prepareExternalPositionTrade should be equal to encoded properly", () => {
  expect(
    prepareExternalPositionTrade({
      externalPositionManager: EXTERNAL_POSITION_MANAGER,
      trade: {
        type: ExternalPosition.KilnStake,
        callArgs: {
          validatorAmount: 5n,
          stakingContract: KILN_STAKING_CONTRACT,
          externalPositionProxy: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
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
        1n,
        "0x000000000000000000000000faf2c3db614e9d38fe05edc634848be7ff0542b90000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000816df553a89c4bff7ebfd778a9706a989dd3ce30000000000000000000000000000000000000000000000000000000000000005",
      ],
      "functionName": "callOnExtension",
    }
  `,
  );
});
