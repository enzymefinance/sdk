import {
  decodeMinAssetBalancesPostRedemptionPolicySettings,
  encodeMinAssetBalancesPostRedemptionPolicySettings,
  minAssetBalancesPostRedemptionPolicySettingsEncoding,
} from "./minAssetBalancesPostRedemptionPolicy.js";
import { encodeAbiParameters } from "viem";
import { expect, test } from "vitest";

test("minAssetBalancesPostRedemptionPolicySettingsEncoding should have the correct properties", () => {
  expect(minAssetBalancesPostRedemptionPolicySettingsEncoding).toMatchInlineSnapshot(`
    [
      {
        "name": "assets",
        "type": "address[]",
      },
      {
        "name": "limits",
        "type": "uint256[]",
      },
    ]
  `);
});

test("encodeMinAssetBalancesPostRedemptionPolicySettings should encode correctly", () => {
  expect(
    encodeMinAssetBalancesPostRedemptionPolicySettings([
      {
        asset: "0xfedc73464dfd156d30f6524654a5d56e766da0c3",
        limit: 1n,
      },
      {
        asset: "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9",
        limit: 2n,
      },
    ]),
  ).toMatchInlineSnapshot(
    '"0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fedc73464dfd156d30f6524654a5d56e766da0c3000000000000000000000000faf2c3db614e9d38fe05edc634848be7ff0542b9000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002"',
  );
});

test("decodeMinAssetBalancesPostRedemptionPolicySettings should throw error if encoded assets and limits have different lengths", () => {
  const assets = ["0xfedc73464dfd156d30f6524654a5d56e766da0c3", "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9"] as const;
  const limits = [1n];
  const encoded = encodeAbiParameters(minAssetBalancesPostRedemptionPolicySettingsEncoding, [assets, limits]);

  expect(() => decodeMinAssetBalancesPostRedemptionPolicySettings(encoded)).toThrowError(
    "Expected limits and assets to have the same length",
  );
});

test("decodeMinAssetBalancesPostRedemptionPolicySettings should decode correctly", () => {
  expect(
    decodeMinAssetBalancesPostRedemptionPolicySettings(
      "0x000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fedc73464dfd156d30f6524654a5d56e766da0c3000000000000000000000000faf2c3db614e9d38fe05edc634848be7ff0542b9000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000002",
    ),
  ).toMatchInlineSnapshot(`
    [
      {
        "asset": "0xfeDC73464Dfd156d30F6524654a5d56E766DA0c3",
        "limit": 1n,
      },
      {
        "asset": "0xFaF2c3DB614E9d38fE05EDc634848BE7Ff0542B9",
        "limit": 2n,
      },
    ]
  `);
});
