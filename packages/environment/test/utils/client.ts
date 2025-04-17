import { http, type PublicClient, createPublicClient } from "viem";
import { arbitrum, base, mainnet, polygon } from "viem/chains";
import { Network } from "../../src/networks.js";

export function getClient(network: Network) {
  const chain =
    network === Network.ARBITRUM
      ? arbitrum
      : network === Network.BASE
        ? base
        : network === Network.POLYGON
          ? polygon
          : mainnet;
  const url = `https://${
    network === Network.ARBITRUM
      ? "arb"
      : network === Network.BASE
        ? "base"
        : network === Network.POLYGON
          ? "polygon"
          : "eth"
  }-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}`;

  console.log();

  return createPublicClient({
    chain,
    transport: http(url, { batch: true }),
  }) as PublicClient; // TODO: remove typecasting (currently breaks for the Base network client)
}
