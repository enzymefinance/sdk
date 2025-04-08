import type { Address, Hex } from "viem";
import { Network } from "../../src/networks";
import { getWalletClient } from "./create-wallet-client";

export function deployOracles({
  lpMarkets,
  ptMarkets,
  privateKey,
}: {
  lpMarkets: Array<Address>;
  ptMarkets: Array<Address>;
  privateKey: Hex;
}) {
  const walletClient = getWalletClient(Network.ETHEREUM, privateKey);
}
