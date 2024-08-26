import { expect, test } from "vitest";
import { AssetType } from "../../src/index.js";
import { getClient } from "../utils/client.js";
import { getToken } from "../utils/contracts/IdleToken.js";
import { environment } from "../utils/fixtures.js";

const client = getClient(environment.network.id);

const idle = environment.getAssets({ types: [AssetType.IDLE] });

test.each(idle)("idle underlying is correct: $symbol ($name): $id", async (asset) => {
  const checksum = await getToken(client, { idleToken: asset.id });

  expect(checksum.toLowerCase(), "Actual underlying asset does not match expected").toBe(asset.underlying);

  // check if underlying asset is registerd
  expect(
    asset.registered ? environment.getAsset(asset.underlying).registered : true,
    "Underlying asset not registered",
  ).toBe(true);
});

test.skip("empty test suite fallback");
