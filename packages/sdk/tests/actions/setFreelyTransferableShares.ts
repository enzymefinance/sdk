import { prepareFreelyTransferableSharesParams } from "../../src/actions/setFreelyTransferableShares.js";
import { sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setFreelyTransferableShares({
  vaultProxy,
  account,
}: {
  vaultProxy: Address;
  account: Address;
}) {
  return sendTestTransaction({
    address: vaultProxy,
    account,
    ...prepareFreelyTransferableSharesParams(),
  });
}
