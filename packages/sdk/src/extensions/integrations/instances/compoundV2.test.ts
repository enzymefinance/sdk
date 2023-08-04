import { COMPOUND_V2_C_ETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import {
  decodeCompoundV2LendArgs,
  decodeCompoundV2RedeemArgs,
  encodeCompoundV2LendArgs,
  encodeCompoundV2RedeemArgs,
} from "./compoundV2.js";
import { getAddress } from "viem";
import { expect, test } from "vitest";

test("decodeCompoundV2LendArgs should be equal to encoded data with encodeCompoundV2LendArgs", () => {
  const params = {
    cToken: getAddress(COMPOUND_V2_C_ETH),
    depositAmount: toWei(100),
    minCTokenAmount: toWei(99),
  };

  const encoded = encodeCompoundV2LendArgs(params);
  const decoded = decodeCompoundV2LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCompoundV2LendArgs should encode correctly", () => {
  expect(
    encodeCompoundV2LendArgs({
      cToken: COMPOUND_V2_C_ETH,
      depositAmount: toWei(100),
      minCTokenAmount: toWei(99),
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000004ddc2d193948926d02f9b1fe9e1daa0718270ed50000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000055de6a779bbac0000"',
  );
});

test("decodeCompoundV2LendArgs should decode correctly", () => {
  expect(
    decodeCompoundV2LendArgs(
      "0x0000000000000000000000004ddc2d193948926d02f9b1fe9e1daa0718270ed50000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000055de6a779bbac0000",
    ),
  ).toEqual({
    cToken: COMPOUND_V2_C_ETH,
    depositAmount: toWei(100),
    minCTokenAmount: toWei(99),
  });
});

test("decodeCompoundV2LendArgs should be equal to encoded data with encodeCompoundV2LendArgs", () => {
  const params = {
    cToken: getAddress(COMPOUND_V2_C_ETH),
    depositAmount: toWei(100),
    minCTokenAmount: toWei(99),
  };

  const encoded = encodeCompoundV2LendArgs(params);
  const decoded = decodeCompoundV2LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("decodeCompoundV2RedeemArgs should be equal to encoded data with encodeCompoundV2RedeemArgs", () => {
  const params = {
    cToken: getAddress(COMPOUND_V2_C_ETH),
    redeemAmount: toWei(100),
    minUnderlyingAmount: toWei(99),
  };

  const encoded = encodeCompoundV2RedeemArgs(params);
  const decoded = decodeCompoundV2RedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeCompoundV2RedeemArgs should encode correctly", () => {
  expect(
    encodeCompoundV2RedeemArgs({
      cToken: COMPOUND_V2_C_ETH,
      redeemAmount: toWei(100),
      minUnderlyingAmount: toWei(99),
    }),
  ).toMatchInlineSnapshot(
    '"0x0000000000000000000000004ddc2d193948926d02f9b1fe9e1daa0718270ed50000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000055de6a779bbac0000"',
  );
});

test("decodeCompoundV2RedeemArgs should decode correctly", () => {
  expect(
    decodeCompoundV2RedeemArgs(
      "0x0000000000000000000000004ddc2d193948926d02f9b1fe9e1daa0718270ed50000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000055de6a779bbac0000",
    ),
  ).toEqual({
    cToken: COMPOUND_V2_C_ETH,
    redeemAmount: toWei(100),
    minUnderlyingAmount: toWei(99),
  });
});
