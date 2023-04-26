import { type Address } from "viem";
import { sendTestTransaction } from "../globals.js";
import { prepareSetNominatedOwnerParams } from "../../src/actions/setNominatedOwner.js";

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
      nextNominatedOwner: nominatedOwner,
    }),
  });
}
