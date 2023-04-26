import { test } from "vitest";
import { sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, BOB, WETH } from "../../tests/constants.js";
import { parseAbi } from "viem";

test("test", async () => {
  const { comptrollerProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  const abi = parseAbi(["function setRecipientForFund(address recipient)"]);

  console.log(abi);

  await sendTestTransaction({
    abi: [abi],
    functionName: "setRecipientForFund",
    account: ALICE,
    args: [BOB],
    address: comptrollerProxy,
  });
});
