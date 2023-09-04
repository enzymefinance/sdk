import type { ReadContractParameters } from "../utils/viem.js";
import { getAssetDecimals } from "./getAssetDecimals.js";
import { getAssetName } from "./getAssetName.js";
import { getAssetSymbol } from "./getAssetSymbol.js";
import type { Address, PublicClient } from "viem";

export async function getAssetInfo(
  client: PublicClient,
  args: ReadContractParameters<{
    asset: Address;
  }>,
) {
  const [name, symbol, decimals] = await Promise.all([
    getAssetName(client, args),
    getAssetSymbol(client, args),
    getAssetDecimals(client, args),
  ]);

  return { name, symbol, decimals, address: args.asset };
}
