import { expect, test } from "vitest";
import { publicClient, sendTestTransaction, testActions } from "../../tests/globals.js";
import { ALICE, BOB, CAROL, WETH } from "../../tests/constants.js";
import { IVault } from "../../../abis/src/abis/IVault.js";
import { getAbiItem } from "viem";
import { prepareFunctionParams } from "../utils/viem.js";
import { simulateClaimOwnership } from "./claimOwnership.js";

test("test", async () => {
  const { vaultProxy } = await testActions.createTestVault({
    vaultOwner: ALICE,
    denominationAsset: WETH,
  });

  await sendTestTransaction({
    address: vaultProxy,
    account: ALICE,
    ...prepareFunctionParams({
      abi: getAbiItem({ abi: IVault, name: "setNominatedOwner" }),
      args: [BOB],
    }),
  });

  // await sendTestTransaction({
  //   address: vaultProxy,
  //   account: BOB,
  //   ...prepareFunctionParams({
  //     abi: getAbiItem({ abi: IVault, name: "claimOwnership" }),
  //   }),
  // });

  const { request, result } = await simulateClaimOwnership({
    vaultProxy,
    address: CAROL,
  });

  console.log("REQ", request, "RESULT", result);

  const owner = await publicClient.readContract({
    abi: IVault,
    address: vaultProxy,
    functionName: "getNominatedOwner",
  });

  console.log("OWNER", owner);
});
