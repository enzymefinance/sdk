import { ALICE, BOB, EXTERNAL_POSITION_MANAGER, KILN_STAKING_CONTRACT, WETH } from "../../../../tests/constants.js";
import { publicClientMainnet, sendTestTransaction, testActions } from "../../../../tests/globals.js";
import { toWei } from "../../../utils/conversion.js";
import { ExternalPosition } from "../externalPositionTypes.js";
import { prepareCreateExternalPosition } from "../prepareCreateExternalPosition.js";
import { prepareUseExternalPosition } from "../prepareUseExternalPosition.js";
import { parseAbiItem } from "viem";
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
    network: "mainnet",
    comptrollerProxy,
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
