import * as fs from "node:fs";
import * as path from "node:path";
import arg from "arg";
import dotenv from "dotenv";
import { decryptKeystore } from "./decrypt-keystore.js";

dotenv.config({ path: "../../../.env" });

const args = arg({
  "--keystore-path": String,
  "--pt-markets": String,
  "--lps": String,
  "-kp": "--keystore-path",
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

const wallet = await decryptKeystore({
  keystoreFilePath,
});
