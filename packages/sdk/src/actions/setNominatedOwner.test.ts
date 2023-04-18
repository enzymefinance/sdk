import { expect, test } from "vitest";
import { encodeFunctionData } from "viem";
import { setupAnvil } from "../../tests/anvil.js";
import { ALICE } from "../../tests/constants.js";
import { decodeSetNominatedOwnerParams, prepareSetNominatedOwnerParams } from "./setNominatedOwner.js";

setupAnvil();

test("decode next nominated owner should work correctly", () => {
  const params = {
    nextNominatedOwner: ALICE,
  };
  const prepared = prepareSetNominatedOwnerParams(params);
  const encoded = encodeFunctionData(prepared);
  const decoded = decodeSetNominatedOwnerParams(encoded);

  expect(decoded).toEqual(params);
});
