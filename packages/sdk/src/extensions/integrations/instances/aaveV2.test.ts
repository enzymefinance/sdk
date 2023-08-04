import { AAVE_V2_A_WETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import {
  decodeAaveV2LendArgs,
  decodeAaveV2RedeemArgs,
  encodeAaveV2LendArgs,
  encodeAaveV2RedeemArgs,
} from "./aaveV2.js";
import { getAddress } from "viem";
import { expect, test } from "vitest";

test("decodeAaveV2LendArgs should be equal to encoded data with encodeAaveV2LendArgs", () => {
  const params = {
    aToken: getAddress(AAVE_V2_A_WETH),
    depositAmount: toWei(100),
  };

  const encoded = encodeAaveV2LendArgs(params);
  const decoded = decodeAaveV2LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeAaveV2LendArgs should encode correctly", () => {
  expect(
    encodeAaveV2LendArgs({
      aToken: AAVE_V2_A_WETH,
      depositAmount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeAaveV2LendArgs should decode correctly", () => {
  expect(
    decodeAaveV2LendArgs(
      "0x000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    aToken: AAVE_V2_A_WETH,
    depositAmount: toWei(100),
  });
});

test("decodeAaveV2RedeemArgs should be equal to encoded data with encodeAaveV2RedeemArgs", () => {
  const params = {
    aToken: getAddress(AAVE_V2_A_WETH),
    redeemAmount: toWei(100),
  };

  const encoded = encodeAaveV2RedeemArgs(params);
  const decoded = decodeAaveV2RedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeAaveV2RedeemArgs should encode correctly", () => {
  expect(
    encodeAaveV2RedeemArgs({
      aToken: AAVE_V2_A_WETH,
      redeemAmount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeAaveV2RedeemArgs should decode correctly", () => {
  expect(
    decodeAaveV2RedeemArgs(
      "0x000000000000000000000000030ba81f1c18d280636f32af80b9aad02cf0854e0000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    aToken: AAVE_V2_A_WETH,
    redeemAmount: toWei(100),
  });
});
