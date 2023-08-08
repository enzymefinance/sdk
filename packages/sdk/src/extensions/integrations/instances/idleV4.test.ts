import { IDLE_V4_WETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import {
  decodeIdleV4ClaimRewardsArgs,
  decodeIdleV4LendArgs,
  decodeIdleV4RedeemArgs,
  encodeIdleV4ClaimRewardsArgs,
  encodeIdleV4LendArgs,
  encodeIdleV4RedeemArgs,
} from "./idleV4.js";
import { expect, test } from "vitest";

test("decodeIdleV4LendArgs should be equal to encoded data with encodeIdleV4LendArgs", () => {
  const params = {
    idleToken: IDLE_V4_WETH,
    depositAmount: toWei(100),
    minIncomingIdleTokenAmount: toWei(50),
  } as const;

  const encoded = encodeIdleV4LendArgs(params);
  const decoded = decodeIdleV4LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeIdleV4LendArgs should encode correctly", () => {
  expect(
    encodeIdleV4LendArgs({
      idleToken: IDLE_V4_WETH,
      depositAmount: toWei(100),
      minIncomingIdleTokenAmount: toWei(50),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f800000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b1880000"',
  );
});

test("decodeIdleV4LendArgs should decode correctly", () => {
  expect(
    decodeIdleV4LendArgs(
      "0x000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f800000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b1880000",
    ),
  ).toEqual({
    idleToken: IDLE_V4_WETH,
    depositAmount: toWei(100),
    minIncomingIdleTokenAmount: toWei(50),
  });
});

test("decodeIdleV4RedeemArgs should be equal to encoded data with encodeIdleV4RedeemArgs", () => {
  const params = {
    idleToken: IDLE_V4_WETH,
    outgoingIdleTokenAmount: toWei(100),
    minIncomingUnderlyingAmount: toWei(50),
  } as const;

  const encoded = encodeIdleV4RedeemArgs(params);
  const decoded = decodeIdleV4RedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeIdleV4RedeemArgs should encode correctly", () => {
  expect(
    encodeIdleV4RedeemArgs({
      idleToken: IDLE_V4_WETH,
      outgoingIdleTokenAmount: toWei(100),
      minIncomingUnderlyingAmount: toWei(50),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f800000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b1880000"',
  );
});

test("decodeIdleV4RedeemArgs should decode correctly", () => {
  expect(
    decodeIdleV4RedeemArgs(
      "0x000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f800000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b1880000",
    ),
  ).toEqual({
    idleToken: IDLE_V4_WETH,
    outgoingIdleTokenAmount: toWei(100),
    minIncomingUnderlyingAmount: toWei(50),
  });
});

test("decodeIdleV4ClaimRewardsArgs should be equal to encoded data with encodeIdleV4ClaimRewardsArgs", () => {
  const params = {
    idleToken: IDLE_V4_WETH,
  } as const;

  const encoded = encodeIdleV4ClaimRewardsArgs(params);
  const decoded = decodeIdleV4ClaimRewardsArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeIdleV4ClaimRewardsArgs should encode correctly", () => {
  expect(
    encodeIdleV4ClaimRewardsArgs({
      idleToken: IDLE_V4_WETH,
    }),
  ).toMatchInlineSnapshot('"0x000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f80"');
});

test("decodeIdleV4ClaimRewardsArgs should decode correctly", () => {
  expect(decodeIdleV4ClaimRewardsArgs("0x000000000000000000000000c8e6ca6e96a326dc448307a5fde90a0b21fd7f80")).toEqual({
    idleToken: IDLE_V4_WETH,
  });
});
