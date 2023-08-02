import { A_WETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import { decodeAaveV3LendArgs, encodeAaveV3LendArgs } from "./aaveV3.js";
import { getAddress } from "viem";
import { expect, test } from "vitest";

test("decodeAaveV3LendArgs should be equal to encoded data with encodeAaveV3LendArgs", () => {
  const params = {
    aToken: getAddress(A_WETH),
    depositAmount: toWei(100),
  };

  const encoded = encodeAaveV3LendArgs(params);
  const decoded = decodeAaveV3LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeAaveV3LendArgs should encode correctly", () => {
  expect(
    encodeAaveV3LendArgs({
      aToken: A_WETH,
      depositAmount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeAaveV3LendArgs should decode correctly", () => {
  expect(
    decodeAaveV3LendArgs(
      "0x000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    aToken: A_WETH,
    depositAmount: toWei(100),
  });
});

test("decodeAaveV3LendArgs should be equal to encoded data with encodeAaveV3LendArgs", () => {
  const params = {
    aToken: getAddress(A_WETH),
    depositAmount: toWei(100),
  };

  const encoded = encodeAaveV3LendArgs(params);
  const decoded = decodeAaveV3LendArgs(encoded);

  expect(decoded).toEqual(params);
});
