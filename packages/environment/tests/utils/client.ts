import { http, createPublicClient } from "viem";
import { arbitrum, mainnet, polygon } from "viem/chains";
import { Network } from "../../src/networks";

export function getClient(network: Network) {
  const chain = network === Network.ETHEREUM ? mainnet : network === Network.POLYGON ? polygon : arbitrum;
  const url = `https://${
    network === Network.ETHEREUM ? "eth" : network === Network.POLYGON ? "polygon" : "arb"
  }-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;

  return createPublicClient({
    chain,
    transport: http(url, { batch: true }),
  });
}
