import { COMPOUND_V3_C_WETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import {
  decodeCompoundV3ClaimRewardsArgs,
  decodeCompoundV3LendArgs,
  decodeCompoundV3RedeemArgs,
  encodeCompoundV3ClaimRewardsArgs,
  encodeCompoundV3LendArgs,
  encodeCompoundV3RedeemArgs,
} from "./compoundV3.js";
import { getAddress } from "viem";
import { expect, test } from "vitest";

test("decodeCompoundV3LendArgs should be equal to encoded data with encodeCompoundV3LendArgs", () => {
  const params = {
    cToken: getAddress(COMPOUND_V3_C_WETH),
    depositAmount: toWei(100),
  };

  const encoded = encodeCompoundV3LendArgs(params);
  const decoded = decodeCompoundV3LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCompoundV3LendArgs should encode correctly", () => {
  expect(
    encodeCompoundV3LendArgs({
      cToken: COMPOUND_V3_C_WETH,
      depositAmount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000a17581a9e3356d9a858b789d68b4d866e593ae940000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeCompoundV3LendArgs should decode correctly", () => {
  expect(
    decodeCompoundV3LendArgs(
      "0x000000000000000000000000a17581a9e3356d9a858b789d68b4d866e593ae940000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    cToken: COMPOUND_V3_C_WETH,
    depositAmount: toWei(100),
  });
});

test("decodeCompoundV3RedeemArgs should be equal to encoded data with encodeCompoundV3RedeemArgs", () => {
  const params = {
    cToken: getAddress(COMPOUND_V3_C_WETH),
    redeemAmount: toWei(100),
  };

  const encoded = encodeCompoundV3RedeemArgs(params);
  const decoded = decodeCompoundV3RedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCompoundV3RedeemArgs should encode correctly", () => {
  expect(
    encodeCompoundV3RedeemArgs({
      cToken: COMPOUND_V3_C_WETH,
      redeemAmount: toWei(100),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000a17581a9e3356d9a858b789d68b4d866e593ae940000000000000000000000000000000000000000000000056bc75e2d63100000"',
  );
});

test("decodeCompoundV3RedeemArgs should decode correctly", () => {
  expect(
    decodeCompoundV3RedeemArgs(
      "0x000000000000000000000000a17581a9e3356d9a858b789d68b4d866e593ae940000000000000000000000000000000000000000000000056bc75e2d63100000",
    ),
  ).toEqual({
    cToken: COMPOUND_V3_C_WETH,
    redeemAmount: toWei(100),
  });
});

test("decodeCompoundV3ClaimRewardsArgs should be equal to encoded data with encodeCompoundV3ClaimRewardsArgs", () => {
  const params = {
    cTokens: [getAddress(COMPOUND_V3_C_WETH)],
  };

  const encoded = encodeCompoundV3ClaimRewardsArgs(params);
  const decoded = decodeCompoundV3ClaimRewardsArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCompoundV3ClaimRewardsArgs should encode correctly", () => {
  expect(
    encodeCompoundV3ClaimRewardsArgs({
      cTokens: [COMPOUND_V3_C_WETH],
    }),
  ).toMatchInlineSnapshot(
    '"0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a17581a9e3356d9a858b789d68b4d866e593ae94"',
  );
});

test("decodeCompoundV3ClaimRewardsArgs should decode correctly", () => {
  expect(
    decodeCompoundV3ClaimRewardsArgs(
      "0x00000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a17581a9e3356d9a858b789d68b4d866e593ae94",
    ),
  ).toEqual({
    cTokens: [COMPOUND_V3_C_WETH],
  });
});
