import { type Address } from "viem";
import { sendTestTransaction } from "../globals.js";
import { prepareFreelyTransferableSharesParams } from "../../src/actions/setFreelyTransferableShares.js";

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
