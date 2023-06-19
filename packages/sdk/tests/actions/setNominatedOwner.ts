import { prepareSetNominatedOwnerParams } from "../../src/actions/setNominatedOwner.js";
import { sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setNominatedOwner({
  nominatedOwner,
  vaultProxy,
  account,
}: {
  nominatedOwner: Address;
  account: Address;
  vaultProxy: Address;
}) {
  return sendTestTransaction({
    address: vaultProxy,
    account,
    ...prepareSetNominatedOwnerParams({
      nominatedOwner: nominatedOwner,
    }),
  });
}
