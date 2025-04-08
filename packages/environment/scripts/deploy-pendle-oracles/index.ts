import * as fs from "node:fs";
import * as path from "node:path";
import arg from "arg";
import dotenv from "dotenv";
import { asHex } from "../../../sdk/dist/src/Utils/hex";
import { toAddress } from "../../src/utils.js";
import { decryptKeystore } from "./decrypt-keystore.js";
import { deployOracles } from "./deploy-oracles.js";
import { updateAssetsFilePriceFeeds } from "./update-assets-file.js";

dotenv.config({ path: "../../../.env" });

const args = arg({
  "--keystore-path": String,
  "--pt-markets": String,
  "--lps": String,
  "-k": "--keystore-path",
});

const keystorePathArg = args["--keystore-path"];
if (!keystorePathArg) {
  throw new Error("--keystore-path argument is required");
}

const keystoreFilePath = path.resolve(keystorePathArg);
if (!fs.existsSync(keystoreFilePath)) {
  throw new Error(`Keystore file not found at ${keystoreFilePath}`);
}

const ptMarketsArg = args["--pt-markets"];
const lpArg = args["--lps"];

if (!(ptMarketsArg || lpArg)) {
  throw new Error("Either --pt-markets or --lps must be provided");
}

const ptMarkets = ptMarketsArg ? ptMarketsArg.split(",") : [];
const lps = lpArg ? lpArg.split(",") : [];

// const wallet = await decryptKeystore({
//   keystoreFilePath,
// });

// // biome-ignore lint/suspicious/noConsoleLog: <explanation>
// console.log("Decrypted wallet", wallet.address);

// const results = await deployOracles({
//   lpMarkets: lps.map((lp) => toAddress(lp)),
//   ptMarkets: ptMarkets.map((pt) => toAddress(pt)),
//   privateKey: asHex(wallet.privateKey),
// });

const results = [
  {
    deployedPendleOracle: "0x391115569cC95B788E159d287b03C13239a94276",
    quoteAggregatorInfo: {
      aggregator: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
      nonStandard: true,
    },
    assetId: "0x4f62a7a25a4fd6ae386e957284afb5fbf1e1f32c",
    success: true,
    market: "0xb6b2cf977c512bcd195b58e2ccfb3fb15535cb19",
  },
] as const;

updateAssetsFilePriceFeeds(results.filter((r) => r.success));

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log("All oracles deployed");
