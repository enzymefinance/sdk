import { Asset } from "@enzymefinance/sdk";
import dotenv from "dotenv";

import { getEnvironmentForRelease } from "../src/deployments/all.js";
import type { Release } from "../src/releases.js";
import { toAddress } from "../src/utils.js";
import { getClient } from "../test/utils/client.js";
import { readTokensFromMarket } from "../test/utils/contracts/PendleV2Tokens.js";
import { getPendleMarketInfo } from "../test/utils/pendle.js";

dotenv.config({ path: "../../.env" });

const env = getEnvironmentForRelease(process.env.VITE_RELEASE as Release);

const client = getClient(env.network.id);

const market = "0x21d85ff3bedff031ef466c7d5295240c8ab2a2b8";

const { sy, pt } = await readTokensFromMarket(client, { market });

const marketInfo = await getPendleMarketInfo(env.network.id, market);

const ptSymbol = await Asset.getSymbol(client, { asset: toAddress(marketInfo.pt.address) });

console.log(sy, pt, marketInfo);
