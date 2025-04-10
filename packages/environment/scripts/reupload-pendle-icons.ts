import { createWriteStream, unlinkSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import path from "node:path";
import { pipeline } from "node:stream";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import arg from "arg";
import dotenv from "dotenv";
import { isAddressEqual } from "viem";

import { AssetType } from "../src/assets";
import { getEnvironmentForRelease } from "../src/deployments/all";

dotenv.config({ path: "../../.env" });

const streamPipeline = promisify(pipeline);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
    console.warn(`Asset ${assetId} not found in environment`);
    return;
  }

  const asset = env.getAsset(assetId);

  if (asset.type !== AssetType.PENDLE_V2_PT && asset.type !== AssetType.PENDLE_V2_LP) {
    throw new Error(`Asset ${assetId} is not a pendle v2 pt or lp`);
  }

  const assets = env.getAssets({ types: [asset.type] });

  const pendleAssetWithSameUnderlying = assets.find((a) => isAddressEqual(a.underlying, asset.underlying));

  if (!pendleAssetWithSameUnderlying) {
    console.warn(`Asset ${assetId} has no pendle v2 pt or lp with the same underlying`);
    return;
  }

  const iconPath = await downloadIcon(pendleAssetWithSameUnderlying.underlying);

  await uploadIcon(assetId, iconPath);

  unlinkSync(iconPath);
}

async function uploadIcon(assetId: string, iconPath: string): Promise<void> {
  const fileBuffer = await readFile(iconPath);

  const extension = path.extname(iconPath).toLowerCase();
  let mimeType: string;

  switch (extension) {
    case ".svg":
      mimeType = "image/svg+xml";
      break;
    case ".png":
      mimeType = "image/png";
      break;
    case ".jpg":
    case ".jpeg":
      mimeType = "image/jpeg";
      break;
    default: {
      throw new Error(`Unsupported file extension '${extension}' for icon ${iconPath}`);
    }
  }

  const fileBlob = new Blob([fileBuffer], { type: mimeType });

  const formData = new FormData();

  formData.append("file", fileBlob, path.basename(iconPath));
  formData.append("id", `asset/ethereum/${assetId}/icon`);

  const response = await fetch(
    "https://api.cloudflare.com/client/v4/accounts/b3b5040d0b91c1840ec3897804786482/images/v1",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.UPLOAD_ICON_API_TOKEN}`,
      },
      body: formData,
    },
  );

  if (!response.ok) {
    throw new Error(`Upload failed (${response.status})`);
  }

  console.info(`Successfully uploaded icon for ${assetId}`);
}

function getUrl(assetId: string) {
  return `https://app.enzyme.finance/asset/ethereum/${assetId}/icon?size=128`;
}

async function downloadIcon(assetId: string) {
  const contentTypeToExt = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/svg+xml": "svg",
    "image/webp": "webp",
  } as const;

  const response = await fetch(getUrl(assetId));

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
  }

  if (!response.body) {
    throw new Error("Failed to fetch image: No body in response");
  }

  const contentType = response.headers.get("content-type");

  if (!contentType) {
    throw new Error("Failed to fetch image: No content type in response");
  }

  const extension = contentTypeToExt[contentType] as
    | (typeof contentTypeToExt)[keyof typeof contentTypeToExt]
    | undefined;

  if (!extension) {
    throw new Error(`Failed to fetch image: Unknown content type: ${contentType}`);
  }

  const outputPath = join(__dirname, `${assetId}.${extension}`);

  await streamPipeline(response.body, createWriteStream(outputPath));

  return outputPath;
}
