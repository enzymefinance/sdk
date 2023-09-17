import { publicClientMainnet } from "../../tests/globals.js";
import { getLiquityTroves } from "./getLiquityTroves.js";
import { isAddress } from "viem";
import { assert, expect, test } from "vitest";

test("get liquity troves should work correctly", async () => {
  const result = await getLiquityTroves(publicClientMainnet, {
    // use data from tx 0x17a5931f4d11516f4238983af1970f10cf171ae87b7dbedfb7766cdd6372caf7
    liquityTroveManager: "0xa39739ef8b0231dbfa0dcda07d7e29faabcf4bb2",
    debtPositions: ["0x30f003f39a295866df145e1fb5afaa2913ee7e3f"],
  });

  assert(result !== undefined);
  expect(Object.keys(result).length).toBeGreaterThan(0);

  for (const [position, trove] of Object.entries(result)) {
    expect(isAddress(position)).toBeTruthy();
    expect(trove.collateral).toBeTypeOf("bigint");
    expect(trove.debt).toBeTypeOf("bigint");
    expect(trove.stake).toBeTypeOf("bigint");
    expect(trove.arrayIndex).toBeTypeOf("bigint");
    expect(trove.status).toBeTypeOf("number");
  }
});
