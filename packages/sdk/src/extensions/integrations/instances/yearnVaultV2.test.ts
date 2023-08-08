import { YEARN_VAULT_V2_WETH } from "../../../../tests/constants.js";
import { toWei } from "../../../utils/conversion.js";
import {
  decodeYearnVaultV2LendArgs,
  decodeYearnVaultV2RedeemArgs,
  encodeYearnVaultV2LendArgs,
  encodeYearnVaultV2RedeemArgs,
} from "./yearnVaultV2.js";
import { getAddress } from "viem";
import { expect, test } from "vitest";

test("decodeYearnVaultV2LendArgs should be equal to encoded data with encodeYearnVaultV2LendArgs", () => {
  const params = {
    yVault: getAddress(YEARN_VAULT_V2_WETH),
    depositAmount: toWei(100),
    minIncomingYVaultSharesAmount: toWei(1),
  };

  const encoded = encodeYearnVaultV2LendArgs(params);
  const decoded = decodeYearnVaultV2LendArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeYearnVaultV2LendArgs should encode correctly", () => {
  expect(
    encodeYearnVaultV2LendArgs({
      yVault: YEARN_VAULT_V2_WETH,
      depositAmount: toWei(100),
      minIncomingYVaultSharesAmount: toWei(1),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000a258c4606ca8206d8aa700ce2143d7db854d168c0000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000de0b6b3a7640000"',
  );
});

test("decodeYearnVaultV2LendArgs should decode correctly", () => {
  expect(
    decodeYearnVaultV2LendArgs(
      "0x000000000000000000000000a258c4606ca8206d8aa700ce2143d7db854d168c0000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000de0b6b3a7640000",
    ),
  ).toEqual({
    yVault: YEARN_VAULT_V2_WETH,
    depositAmount: toWei(100),
    minIncomingYVaultSharesAmount: toWei(1),
  });
});

test("decodeYearnVaultV2RedeemArgs should be equal to encoded data with encodeYearnVaultV2RedeemArgs", () => {
  const params = {
    yVault: getAddress(YEARN_VAULT_V2_WETH),
    maxOutgoingYVaultSharesAmount: toWei(100),
    minIncomingUnderlyingAmount: toWei(50),
    slippageToleranceBps: toWei(30),
  };

  const encoded = encodeYearnVaultV2RedeemArgs(params);
  const decoded = decodeYearnVaultV2RedeemArgs(encoded);

  expect(decoded).toEqual(params);
});

test("encodeYearnVaultV2RedeemArgs should encode correctly", () => {
  expect(
    encodeYearnVaultV2RedeemArgs({
      yVault: YEARN_VAULT_V2_WETH,
      maxOutgoingYVaultSharesAmount: toWei(100),
      minIncomingUnderlyingAmount: toWei(50),
      slippageToleranceBps: toWei(30),
    }),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000a258c4606ca8206d8aa700ce2143d7db854d168c0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b1880000000000000000000000000000000000000000000000000001a055690d9db80000"',
  );
});

test("decodeYearnVaultV2RedeemArgs should decode correctly", () => {
  expect(
    decodeYearnVaultV2RedeemArgs(
      "0x000000000000000000000000a258c4606ca8206d8aa700ce2143d7db854d168c0000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000002b5e3af16b1880000000000000000000000000000000000000000000000000001a055690d9db80000",
    ),
  ).toEqual({
    yVault: YEARN_VAULT_V2_WETH,
    maxOutgoingYVaultSharesAmount: toWei(100),
    minIncomingUnderlyingAmount: toWei(50),
    slippageToleranceBps: toWei(30),
  });
});
