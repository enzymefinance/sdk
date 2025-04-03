import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Asset } from "@enzymefinance/sdk";
import dotenv from "dotenv";
import jscodeshift from "jscodeshift";

import { getEnvironmentForRelease } from "../src/deployments/all.js";
import type { Release } from "../src/releases.js";
import { toAddress } from "../src/utils.js";
import { getClient } from "../test/utils/client.js";
import { readTokensFromMarket } from "../test/utils/contractt/utils/pendle.js";

dotenv.config({ path: "../../.env" });

// const env = getEnvironmentForRelease(process.env.VITE_RELEASE as Release);

// const client = getClient(env.network.id);

// const market = "0x21d85ff3bedff031ef466c7d5295240c8ab2a2b8";

// const { sy, pt } = await readTokensFromMarket(client, { market });

// const marketInfo = await getPendleMarketInfo(env.network.id, market);

// const ptSymbol = await Asset.getSymbol(client, { asset: toAddress(marketInfo.pt.address) });

// console.log(sy, pt, marketInfo);

// Define the new assets you want to add
const newAssets = [
  {
    decimals: 18,
    id: "0x00000000001547270b2be2c7c80b03a28f4b7f55",
    name: "NewAsset2",
    releases: ["sulu"],
    symbol: "NA2",
    type: "AssetType.PENDLE_V2_PT",
    priceFeed: {
      type: "PriceFeedType.PRIMITIVE_PENDLE_V2",
      aggregator: "",
      rateAsset: "RateAsset.ETH",
    },
  },
];

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
    newAssets.forEach((asset) => {
      // Convert the asset into a jscodeshift object expression with correct literals
      const newObject = j.objectExpression(
        Object.entries(asset).map(([key, value]) => {
          if (key === "type") {
            // Use j.identifier to refer to AssetType.PENDLE_V2_PT directly
            value = j.identifier(value);
          } else if (key === "priceFeed") {
            // Handle nested priceFeed object
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
            value = j.arrayExpression(
              value.map((item) => j.identifier(item)), // Convert string 'sulu' to identifier
            );
          } else {
            // Otherwise, just create a literal value (string, number, etc.)
            value = j.literal(value);
          }

          // Return the property (key-value pair)
          return j.property("init", j.identifier(key), value);
        }),
      );

      // Push the new object to the array
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

console.log("New assets have been added!");
