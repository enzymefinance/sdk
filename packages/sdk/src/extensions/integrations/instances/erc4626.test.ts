import { getAddress } from "viem";
import { expect, test } from "vitest";
import { WETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import {
  decodeErc4626LendArgs,
  decodeErc4626RedeemArgs,
  encodeErc4626LendArgs,
  encodeErc4626RedeemArgs,
} from "./erc4626.js";

test("decodeErc4626LendArgs should be equal to encoded data with encodeErc4626LendArgs", () => {
  const params = {
    tokenAddress: getAddress(WETH),
    outgoingAmount: toWei(100),
    minIncomingAmount: toWei(95),
  };

  const encoded = encodeErc4626LendArgs(params);
  const decoded = decodeErc4626LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeErc4626LendArgs should encode correctly", () => {
  expect(
    encodeErc4626LendArgs({
      tokenAddress: WETH,
      outgoingAmount: toWei(100),
      minIncomingAmount: toWei(95),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000052663ccab1e1c0000"',
  );
});

test("decodeErc4626LendArgs should decode correctly", () => {
  expect(
    decodeErc4626LendArgs(
      "0x0000000000000000000000004d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e80000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000052663ccab1e1c0000",
    ),
  ).toEqual({
    tokenAddress: WETH,
    outgoingAmount: toWei(100),
    minIncomingAmount: toWei(95),
  });
});

test("decodeErc4626LendArgs should be equal to encoded data with encodeErc4626LendArgs", () => {
  const params = {
    tokenAddress: getAddress(WETH),
    outgoingAmount: toWei(100),
    minIncomingAmount: toWei(95),
  };

  const encoded = encodeErc4626LendArgs(params);
  const decoded = decodeErc4626LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("decodeErc4626RedeemArgs should be equal to encoded data with encodeErc4626RedeemArgs", () => {
  const params = {
    tokenAddress: getAddress(WETH),
    outgoingAmount: toWei(100),
    minIncomingAmount: toWei(95),
  };

  const encoded = encodeErc4626RedeemArgs(params);
  const decoded = decodeErc4626RedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeErc4626RedeemArgs should encode correctly", () => {
  expect(
    encodeErc4626RedeemArgs({
      tokenAddress: WETH,
      outgoingAmount: toWei(100),
      minIncomingAmount: toWei(95),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000052663ccab1e1c0000"',
  );
});

test("decodeErc4626RedeemArgs should decode correctly", () => {
  expect(
    decodeErc4626RedeemArgs(
      "0x0000000000000000000000004d5f47fa6a74757f35c14fd3a6ef8e3c9bc514e80000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000052663ccab1e1c0000",
    ),
  ).toEqual({
    tokenAddress: WETH,
    outgoingAmount: toWei(100),
    minIncomingAmount: toWei(95),
  });
});
