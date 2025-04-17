import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Asset } from "@enzymefinance/sdk";
import arg from "arg";
import dotenv from "dotenv";
import jscodeshift from "jscodeshift";

import { getEnvironmentForRelease } from "../src/deployments/all.js";
import type { Release } from "../src/releases.js";
import { toAddress } from "../src/utils.js";
import { getClient } from "../test/utils/client.js";
import { getPendleMarketInfo } from "../test/utils/pendle.js";

dotenv.config({ path: "../../.env" });

// parse args
const args = arg({
  // Types
  "--ptMarkets": String,
  "--lps": String,
});

const ptMarketsArg = args["--ptMarkets"];
const lpArg = args["--lps"];

if (!(ptMarketsArg || lpArg)) {
  throw new Error("Either --pts or --lps must be provided");
}

const ptMarkets = ptMarketsArg ? ptMarketsArg.split(",") : [];
const lp = lpArg ? lpArg.split(",") : [];

async function getAssetInfo(market: string) {
  const env = getEnvironmentForRelease(process.env.VITE_RELEASE as Release);

  const client = getClient(env.network.id);

  const marketInfo = await getPendleMarketInfo(env.network.id, market);

  const ptName = await Asset.getName(client, { asset: toAddress(marketInfo.pt.address) });

  return {
    marketInfo,
    ptName,
  };
}

async function getPTAssetInfo(market: string) {
  const { marketInfo, ptName } = await getAssetInfo(market);

  return {
    symbol: marketInfo.pt.symbol,
    name: ptName,
    id: marketInfo.pt.address,
    type: "AssetType.PENDLE_V2_PT",
    releases: ["sulu"],
    decimals: marketInfo.pt.decimals,
    underlying: marketInfo.underlyingAsset.address,
    markets: [market],
    priceFeed: {
      type: "PriceFeedType.PRIMITIVE_PENDLE_V2",
      aggregator: "",
      rateAsset: "RateAsset.ETH",
    },
  };
}

async function getLPAssetInfo(market: string) {
  const { marketInfo, ptName } = await getAssetInfo(market);

  return {
    symbol: marketInfo.pt.symbol.replace("PT", "LP"),
    name: ptName.replace("PT", "LP"),
    id: marketInfo.lp.address,
    type: "AssetType.PENDLE_V2_LP",
    releases: ["sulu"],
    decimals: marketInfo.lp.decimals,
    underlying: marketInfo.underlyingAsset.address,
    priceFeed: {
      type: "PriceFeedType.PRIMITIVE_PENDLE_V2",
      aggregator: "",
      rateAsset: "RateAsset.ETH",
    },
  };
}

const assets = await Promise.all([
  ...ptMarkets.map((market) => getPTAssetInfo(market)),
  ...lp.map((market) => getLPAssetInfo(market)),
]);

// Path to the file containing the array
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your TypeScript file
const filePath = path.join(__dirname, "../src/assets/ethereum.ts");

// Read the existing file content
const fileContent = fs.readFileSync(filePath, "utf8");

// Parse the file with jscodeshift
const j = jscodeshift;
const root = j(fileContent);

// Find the `defineAssetList` call and its second argument (the array)
// biome-ignore lint/complexity/noForEach: <explanation>
root
  .find(j.CallExpression, {
    callee: { name: "defineAssetList" },
  })
  .forEach((path) => {
    // Get the array from the second argument of `defineAssetList`
    const assetArray = path.node.arguments[1];

    // Add new objects to the array (the array is a `ArrayExpression`)
    // biome-ignore lint/complexity/noForEach: <explanation>
    assets.forEach((asset) => {
      // Convert the asset into a jscodeshift object expression with correct literals
      const newObject = j.objectExpression(
        Object.entries(asset).map(([key, value]) => {
          if (key === "type") {
            // Use j.identifier to refer to AssetType.PENDLE_V2_PT directly
            // @ts-ignore
            value = j.identifier(value);
          } else if (key === "priceFeed") {
            // Handle nested priceFeed object
            // @ts-ignore
            value = j.objectExpression(
              Object.entries(value).map(([nestedKey, nestedValue]) => {
                if (nestedValue === "") {
                  // Handle the empty string case explicitly
                  nestedValue = j.literal("");
                } else {
                  // Use j.identifier for other cases
                  nestedValue = j.identifier(nestedValue);
                }
                return j.property("init", j.identifier(nestedKey), nestedValue); // Use the correct value
              }),
            );
          } else if (key === "releases" && Array.isArray(value)) {
            // Handle releases array
            // @ts-ignore
            value = j.arrayExpression(
              value.map((item) => j.identifier(item)), // Convert string 'sulu' to identifier
            );
          } else if (key === "markets" && Array.isArray(value)) {
            // Handle markets array
            // @ts-ignore
            value = j.arrayExpression(
              value.map((item) => j.literal(item)), // Convert market addresses to string literals
            );
          } else {
            // Otherwise, just create a literal value (string, number, etc.)
            // @ts-ignore
            value = j.literal(value);
          }

          // Return the property (key-value pair)
          // @ts-ignore
          return j.property("init", j.identifier(key), value);
        }),
      );

      // Push the new object to the array
      if (assetArray.type !== "ArrayExpression") {
        throw new Error("assetArray is an ArrayExpression");
      }
      assetArray.elements.push(newObject);
    });
  });

// Write the modified content back to the file, removing unwanted line breaks
let source = root.toSource({
  quote: "single",
  trailingComma: true,
  tabWidth: 2, // Keep the indentations tight
  useTabs: false, // Use spaces instead of tabs
});

// Post-process to remove empty lines between properties
source = source.replace(/\n\s*\n/g, "\n"); // Remove empty lines between properties

fs.writeFileSync(filePath, source, "utf8");

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log(
  "New assets have been added!",
  assets.map((asset) => ({ id: asset.id, symbol: asset.symbol })),
);
