import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import jscodeshift from "jscodeshift";
import type { ObjectProperty } from "jscodeshift";
import type { Address } from "viem";

const j = jscodeshift.withParser("ts");

// Get the directory name in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const assetsFilePath = resolve(__dirname, "../../src/assets/ethereum.ts");

export function updateAssetsFilePriceFeeds(
  oraclesInfo: Array<{
    deployedPendleOracle: Address;
    quoteAggregatorInfo: { nonStandard: boolean };
    assetId: Address;
  }>,
) {
  const updatedAssetIds: Array<string> = [];

  const source = readFileSync(assetsFilePath, "utf8");
  const root = j(source);

  const oraclesMap = new Map<string, { deployedPendleOracle: Address; quoteAggregatorInfo: { nonStandard: boolean } }>(
    oraclesInfo.map((info) => [
      info.assetId.toLowerCase(),
      { deployedPendleOracle: info.deployedPendleOracle, quoteAggregatorInfo: info.quoteAggregatorInfo },
    ]),
  );

  const defineAssetListCalls = root.find(j.CallExpression, {
    callee: { name: "defineAssetList" },
  });

  for (const path of defineAssetListCalls.paths()) {
    const assetsArray = path.value.arguments[1];
    if (assetsArray?.type !== "ArrayExpression") {
      console.warn("Could not find assets array in defineAssetList call.");
      continue;
    }

    for (const element of assetsArray.elements) {
      if (element?.type !== "ObjectExpression") {
        continue;
      }

      let currentAssetId: string | null = null;
      let priceFeedProperty: ObjectProperty | null = null;

      for (const prop of element.properties) {
        if (
          prop.type === "ObjectProperty" &&
          prop.key.type === "Identifier" &&
          prop.key.name === "id" &&
          prop.value.type === "StringLiteral"
        ) {
          currentAssetId = prop.value.value.toLowerCase();
        } else if (prop.type === "ObjectProperty" && prop.key.type === "Identifier" && prop.key.name === "priceFeed") {
          priceFeedProperty = prop;
        }
      }

      const quoteAggregatorInfo = currentAssetId ? oraclesMap.get(currentAssetId) : undefined;

      if (
        quoteAggregatorInfo &&
        priceFeedProperty &&
        priceFeedProperty.value.type === "ObjectExpression" &&
        currentAssetId
      ) {
        const priceFeedObject = priceFeedProperty.value;

        for (const feedProp of priceFeedObject.properties) {
          if (
            feedProp.type === "ObjectProperty" &&
            feedProp.key.type === "Identifier" &&
            feedProp.key.name === "aggregator"
          ) {
            feedProp.value = j.stringLiteral(quoteAggregatorInfo.deployedPendleOracle.toLowerCase());
            break;
          }
        }

        // Add nonStandard property if applicable
        if (quoteAggregatorInfo.quoteAggregatorInfo.nonStandard) {
          const nonStandardProp = j.objectProperty(j.identifier("nonStandard"), j.booleanLiteral(true));
          priceFeedObject.properties.push(nonStandardProp);
        }
        updatedAssetIds.push(currentAssetId);
      }
    }

    const updatedSource = root.toSource({ quote: "double" });
    writeFileSync(assetsFilePath, updatedSource, "utf8");

    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("Successfully updated price feeds for assets:", updatedAssetIds);
  }
}
