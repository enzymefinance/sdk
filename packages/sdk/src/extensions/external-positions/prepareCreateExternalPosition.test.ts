import { ALICE, BOB, EXTERNAL_POSITION_MANAGER, KILN_STAKING_CONTRACT, WETH } from "../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions } from "../../../tests/globals.js";
import { toWei } from "../../utils/conversion.js";
import { ExternalPosition } from "./externalPositionTypes.js";
import { prepareCreateExternalPosition } from "./prepareCreateExternalPosition.js";
import { parseAbiItem } from "viem";
import { expect, test } from "vitest";

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
      callArgs: {
        type: ExternalPosition.KilnStake,
        validatorAmount,
        stakingContract: KILN_STAKING_CONTRACT,
      },
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

  const [validatorsAddedEventLog] = await publicClientMainnet.getLogs({
    event: parseAbiItem("event ValidatorsAdded(address stakingContractAddress, uint256 validatorAmount)"),
  });

  expect(validatorsAddedEventLog?.args).toEqual({ stakingContractAddress: KILN_STAKING_CONTRACT, validatorAmount });
  expect(externalPositionDeployedForFundEventLog).toBeTruthy();
});
