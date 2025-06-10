import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Constants } from "@enzymefinance/sdk/Utils";
import jscodeshift from "jscodeshift";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your TypeScript file
const filePath = path.join(__dirname, "../src/assets/ethereum.ts");

// Read the file
const fileContent = fs.readFileSync(filePath, "utf8");
const j = jscodeshift;
const root = j(fileContent);

// Function to check if an asset is expired
function isExpired(symbol) {
  const match = symbol.match(/(\d{2}[A-Z]{3}\d{4})/);
  if (!match) {
    return false;
  }
  const dateStr = match[0];
  const date = new Date(Date.parse(dateStr.replace(/(\d{2})([A-Z]{3})(\d{4})/, "$1 $2 $3")));

  const expirationTime = new Date().getTime() - Number(Constants.ONE_WEEK_IN_SECONDS) * 1000 * 2; // expired for 2 weeks

  return date.getTime() < expirationTime;
}

const unregisteredAssets: Array<string> = [];

// Modify expired assets
// biome-ignore lint/complexity/noForEach: <explanation>
root
  .find(j.ObjectExpression)
  .filter((path) => {
    const symbolProperty = path.value.properties.find((prop) => {
      if (prop.type !== "Property" || prop.key.type !== "Identifier" || prop.key.name !== "symbol") {
        return false;
      }

      return prop.value.type === "Literal";
    });

    if (!symbolProperty || symbolProperty.type !== "Property" || symbolProperty.value.type !== "Literal") {
      return false;
    }

    return isExpired(symbolProperty.value.value);
  })
  .forEach((path) => {
    // Set releases to empty array
    const releasesProp = path.value.properties.find((prop) => {
      if (prop.type !== "Property" || prop.key.type !== "Identifier" || prop.key.name !== "releases") {
        return false;
      }

      return prop.value.type === "ArrayExpression";
    });

    if (!releasesProp || releasesProp.type !== "Property" || releasesProp.value.type !== "ArrayExpression") {
      return;
    }

    releasesProp.value.elements = [];

    const idProperty = path.value.properties.find((prop) => {
      if (prop.type !== "Property" || prop.key.type !== "Identifier" || prop.key.name !== "id") {
        return false;
      }

      return prop.value.type === "Literal";
    });

    if (
      !idProperty ||
      idProperty.type !== "Property" ||
      idProperty.value.type !== "Literal" ||
      typeof idProperty.value.value !== "string"
    ) {
      return;
    }

    unregisteredAssets.push(idProperty.value.value);

    // Set priceFeed to { type: PriceFeedType.NONE }
    const priceFeedProp = path.value.properties.find((prop) => {
      if (prop.type !== "Property" || prop.key.type !== "Identifier" || prop.key.name !== "priceFeed") {
        return false;
      }

      return prop.value.type === "ObjectExpression";
    });

    if (!priceFeedProp || priceFeedProp.type !== "Property" || priceFeedProp.value.type !== "ObjectExpression") {
      return;
    }

    priceFeedProp.value.properties = [
      j.property("init", j.identifier("type"), j.memberExpression(j.identifier("PriceFeedType"), j.identifier("NONE"))),
    ];
  });

// Write back to the file
fs.writeFileSync(filePath, root.toSource(), "utf8");

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log("Unregistered assets:", unregisteredAssets);
