import * as fs from "node:fs";
import * as path from "node:path";
import arg from "arg";
import dotenv from "dotenv";
import { asHex } from "../../../sdk/dist/src/Utils/hex";
import { toAddress } from "../../src/utils.js";
import { decryptKeystore } from "./decrypt-keystore.js";
import { deployOracles } from "./deploy-oracles.js";

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

const wallet = await decryptKeystore({
  keystoreFilePath,
});

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log("Decrypted wallet", wallet.address);

const results = await deployOracles({
  lpMarkets: lps.map((lp) => toAddress(lp)),
  ptMarkets: ptMarkets.map((pt) => toAddress(pt)),
  privateKey: asHex(wallet.privateKey),
});

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log("All oracles deployed");
