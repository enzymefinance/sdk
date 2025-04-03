import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jscodeshift from "jscodeshift";

// Convert ES module URL to file path
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
  return date < new Date();
}

const unregisteredAssets: Array<string> = [];

// Modify expired assets
// biome-ignore lint/complexity/noForEach: <explanation>
root
  .find(j.ObjectExpression)
  .filter((path) => {
    const symbolProperty = path.value.properties.find((prop) => prop.key.name === "symbol");

    if (!symbolProperty || symbolProperty.value.type !== "Literal") {
      return false;
    }
    return isExpired(symbolProperty.value.value);
  })
  .forEach((path) => {
    // Set releases to empty array
    const releasesProp = path.value.properties.find((prop) => prop.key.name === "releases");
    releasesProp.value.elements = [];

    const idProperty = path.value.properties.find((prop) => prop.key.name === "id");
    unregisteredAssets.push(idProperty.value.value);

    // Set priceFeed to { type: PriceFeedType.NONE }
    const priceFeedProp = path.value.properties.find((prop) => prop.key.name === "priceFeed");
    priceFeedProp.value = j.objectExpression([
      j.property("init", j.identifier("type"), j.memberExpression(j.identifier("PriceFeedType"), j.identifier("NONE"))),
    ]);
  });

// Write back to the file
fs.writeFileSync(filePath, root.toSource(), "utf8");

console.log("Unregistered assets:", unregisteredAssets);
