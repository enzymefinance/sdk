import { prepareFreelyTransferableSharesParams } from "../../src/actions/setFreelyTransferableShares.js";
import { type Network, sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setFreelyTransferableShares({
  vaultProxy,
  account,
  network,
}: {
  vaultProxy: Address;
  account: Address;
  network: Network;
}) {
  return sendTestTransaction({
    address: vaultProxy,
    account,
    network,
    ...prepareFreelyTransferableSharesParams(),
  });
}
