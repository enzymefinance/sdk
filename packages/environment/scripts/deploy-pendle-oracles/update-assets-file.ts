import type { Address } from "viem";
import jscodeshift from "jscodeshift";
import type { CallExpression, Property } from "jscodeshift";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const j = jscodeshift.withParser("ts");

const assetsFilePath = resolve(
  __dirname,
  "../../../src/assets/ethereum.ts",
);

export function updateAssetsFilePriceFeeds(
  oraclesInfo: Array<{
    deployedPendleOracle: Address;
    quoteAggregatorInfo: { nonStandard: boolean };
    assetId: Address;
  }>,
) {
  const source = readFileSync(assetsFilePath, "utf8");
  const root = j(source);

  const oraclesMap = new Map<string, Address>(
    oraclesInfo.map((info) => [
      info.assetId.toLowerCase(),
      info.deployedPendleOracle,
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
      let priceFeedProperty: Property | null = null;

      for (const prop of element.properties) {
        if (
          prop.type === "Property" &&
          prop.key.type === "Identifier" &&
          prop.key.name === "id" &&
          prop.value.type === "StringLiteral" 
        ) {
          currentAssetId = prop.value.value.toLowerCase();
        } else if (
          prop.type === "Property" &&
          prop.key.type === "Identifier" &&
          prop.key.name === "priceFeed"
        ) {
          priceFeedProperty = prop;
        }
      }

      const newOracleAddress = currentAssetId ? oraclesMap.get(currentAssetId) : undefined;

      if (newOracleAddress && priceFeedProperty && priceFeedProperty.value.type === "ObjectExpression") {
        const priceFeedObject = priceFeedProperty.value;

        for (const feedProp of priceFeedObject.properties) {
          if (
            feedProp.type === "Property" &&
            feedProp.key.type === "Identifier" &&
            feedProp.key.name === "aggregator"
          ) {
            feedProp.value = j.stringLiteral(newOracleAddress);
            console.log(
              `Updated aggregator for asset ${currentAssetId} to ${newOracleAddress}`,
            );
            break;
          }
        }
      } else if (newOracleAddress && priceFeedProperty) {
        console.warn(`Price feed for asset ${currentAssetId} is not an object expression.`);
      }
    }
  }

  const updatedSource = root.toSource({ quote: "double" });
  writeFileSync(assetsFilePath, updatedSource, "utf8");

  console.log(`Successfully updated price feeds in ${assetsFilePath}`);
}
