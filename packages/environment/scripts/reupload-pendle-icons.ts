import { createWriteStream } from "node:fs";
import { dirname, join } from "node:path";
import { pipeline } from "node:stream";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import arg from "arg";
import { isAddressEqual } from "viem";
import { AssetType } from "../src/assets";
import { getEnvironmentForRelease } from "../src/deployments/all";

const streamPipeline = promisify(pipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const outputPath = join(__dirname, "enzyme_icon.png");

function getUrl(assetId: string) {
  return `https://app.enzyme.finance/asset/ethereum/${assetId}/icon?size=128`;
}

async function downloadIcon(assetId: string) {
  const response = await fetch(getUrl(assetId));

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error("Failed to fetch image: No body in response");
  }

  await streamPipeline(response.body, createWriteStream(outputPath));
}

// parse args
const args = arg({
  "--ids": String,
});

const ids = args["--ids"]?.split(",");

if (!ids) {
  throw new Error("--ids must be provided");
}

await reuploadIcons(ids);

async function reuploadIcons(assetIds: Array<string>) {
  for (const assetId of assetIds) {
    await reuploadIcon(assetId);
  }
}

async function reuploadIcon(assetId: string) {
  const env = getEnvironmentForRelease("ethereum.sulu");

  if (!env.hasAsset(assetId)) {
    return;
  }

  const asset = env.getAsset(assetId);

  if (asset.type !== AssetType.PENDLE_V2_PT && asset.type !== AssetType.PENDLE_V2_LP) {
    throw new Error(`Asset ${assetId} is not a pendle v2 pt or lp`);
  }

  const assets = env.getAssets({ types: [asset.type] });

  const pendleAssetWithSameUnderlying = assets.find((a) => isAddressEqual(a.underlying, asset.underlying));

  if (!pendleAssetWithSameUnderlying) {
    return;
  }

  await downloadIcon(pendleAssetWithSameUnderlying.underlying);
}
