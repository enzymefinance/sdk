import { http, type Hex, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrum, base, mainnet, polygon } from "viem/chains";
import { Network } from "../../src/networks.js";

export function getWalletClient(network: Network, privateKey: Hex) {
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

  const account = privateKeyToAccount(privateKey);

  return createWalletClient({
    chain,
    transport: http(url, { batch: true }),
    account,
  });
}
