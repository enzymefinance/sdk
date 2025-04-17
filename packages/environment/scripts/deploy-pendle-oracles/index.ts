import * as fs from "node:fs";
import * as path from "node:path";
import arg from "arg";
import dotenv from "dotenv";
import { asHex } from "../../../sdk/dist/src/Utils/hex";
import { toAddress } from "../../src/utils.js";
import { decryptKeystore } from "./decrypt-keystore.js";
import { deployOracles } from "./deploy-oracles.js";
import { updateAssetsFilePriceFeeds } from "./update-assets-file.js";

dotenv.config({ path: "../../.env" });

const args = arg({
  "--keystore-path": String,
  "--private-key": String,
  "--pt-markets": String,
  "--lps": String,
  "-k": "--keystore-path",
  "-pk": "--private-key",
});

const keystorePathArg = args["--keystore-path"];
const privateKeyArg = args["--private-key"];

const ptMarketsArg = args["--pt-markets"];
const lpArg = args["--lps"];

if (!(ptMarketsArg || lpArg)) {
  throw new Error("Either --pt-markets or --lps must be provided");
}
const privateKey = await getPrivateKey(privateKeyArg, keystorePathArg);

const ptMarkets = ptMarketsArg ? ptMarketsArg.split(",") : [];
const lps = lpArg ? lpArg.split(",") : [];

const results = await deployOracles({
  lpMarkets: lps.map((lp) => toAddress(lp)),
  ptMarkets: ptMarkets.map((pt) => toAddress(pt)),
  privateKey,
});

updateAssetsFilePriceFeeds(results.filter((r) => r.success));
console.info("All oracles deployed");

function getPrivateKey(privateKeyArg?: string, keystorePathArg?: string) {
  if (privateKeyArg !== undefined) {
    return asHex(privateKeyArg);
  }

  if (keystorePathArg === undefined) {
    throw new Error("Either --keystore-path or --private-key argument is required");
  }

  return getPrivateKeyFromWallet(keystorePathArg);
}

async function getPrivateKeyFromWallet(keystorePathArg: string) {
  const keystoreFilePath = path.resolve(keystorePathArg);
  if (keystoreFilePath && !fs.existsSync(keystoreFilePath)) {
    throw new Error(`Keystore file not found at ${keystoreFilePath}`);
  }
  const wallet = await decryptKeystore({
    keystoreFilePath,
  });
  console.info("Decrypted wallet", wallet.address);

  return asHex(wallet.privateKey);
}
