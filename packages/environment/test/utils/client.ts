import { http, createPublicClient } from "viem";
import { mainnet, polygon } from "viem/chains";
import { Network } from "../../src/networks.js";

export function getClient(network: Network) {
  const chain = network === Network.ETHEREUM ? mainnet : polygon;
  const url = `https://${network === Network.ETHEREUM ? "eth" : "polygon"}-mainnet.g.alchemy.com/v2/${
    process.env.VITE_ALCHEMY_API_KEY
  }`;

  return createPublicClient({
    chain,
    transport: http(url, { batch: true }),
  });
}
