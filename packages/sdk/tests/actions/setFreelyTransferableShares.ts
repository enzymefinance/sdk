import { prepareFreelyTransferableSharesParams } from "../../src/actions/setFreelyTransferableShares.js";
import { type ClientNetwork, sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setFreelyTransferableShares({
  vaultProxy,
  account,
  clientNetwork,
}: {
  vaultProxy: Address;
  account: Address;
  clientNetwork: ClientNetwork;
}) {
  return sendTestTransaction({
    address: vaultProxy,
    account,
    clientNetwork,
    ...prepareFreelyTransferableSharesParams(),
  });
}
