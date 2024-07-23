import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getUnderlying } from "../utils/contracts/CompoundToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const compound = environment.getAssets({ types: [AssetType.COMPOUND_V2] });

test.each(compound)("compound underlying is correct: $symbol ($name): $id", async (asset) => {
  // TODO: Make this work generically (currently only works for cETH on mainnet).
  const ceth = asset.symbol === "cETH" && asset.name === "Compound Ether";
  const checksum = ceth
    ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
    : await getUnderlying(client, { compoundToken: asset.id });

  expect(checksum.toLowerCase(), "Underlying asset not found in the environment").toBe(asset.underlying);

  // check if underlying asset is registerd
  expect(
    asset.registered ? environment.getAsset(asset.underlying).registered : true,
    "Underlying asset not registered",
  ).toBe(true);
});

test.skip("empty test suite fallback");
