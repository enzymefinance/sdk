import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getToken } from "../utils/contracts/YearnVaultToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const yearn = environment.getAssets({
  types: [AssetType.YEARN_VAULT_V2],
});

test.each(yearn)("yearn underlying is correct: $symbol ($name): $id", async (asset) => {
  const checksum = await getToken(client, { yearnVault: asset.id });

  expect(checksum.toLowerCase(), "Expected underlying asset does not match the environment").toBe(asset.underlying);

  // check if underlying asset is registerd
  expect(
    asset.registered ? environment.getAsset(asset.underlying).registered : true,
    "Underlying asset not registered",
  ).toBe(true);
});

test.skip("empty test suite fallback");
