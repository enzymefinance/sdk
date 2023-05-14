import { prepareSetNominatedOwnerParams } from "../../src/actions/setNominatedOwner.js";
import { sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export async function setNominatedOwner({
  nominatedOwner,
  vaultProxy,
  account,
}: {
  nominatedOwner: Address;
  account: Address;
  vaultProxy: Address;
}) {
  return await sendTestTransaction({
    address: vaultProxy,
    account,
    ...prepareSetNominatedOwnerParams({
      nominatedOwner: nominatedOwner,
    }),
  });
}
