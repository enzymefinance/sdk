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
  // const url = `https://${
  //   network === Network.ARBITRUM
  //     ? "arb"
  //     : network === Network.BASE
  //       ? "base"
  //       : network === Network.POLYGON
  //         ? "polygon"
  //         : "eth"
  // }-mainnet.g.alchemy.com/v2/${process.env.VITE_ALCHEMY_API_KEY}`;

  const url = "https://virtual.mainnet.rpc.tenderly.co/5edd8a18-0355-4fa9-8ad4-2caf8715d6d1";

  const account = privateKeyToAccount(privateKey);

  return createWalletClient({
    chain,
    transport: http(url, { batch: true }),
    account,
  });
}
