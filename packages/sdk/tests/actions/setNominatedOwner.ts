import { prepareSetNominatedOwnerParams } from "../../src/actions/setNominatedOwner.js";
import { type ClientNetwork, sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setNominatedOwner({
  nominatedOwner,
  vaultProxy,
  account,
  clientNetwork,
}: {
  nominatedOwner: Address;
  account: Address;
  vaultProxy: Address;
  clientNetwork: ClientNetwork;
}) {
  return sendTestTransaction({
    address: vaultProxy,
    account,
    clientNetwork,
    ...prepareSetNominatedOwnerParams({
      nominatedOwner: nominatedOwner,
    }),
  });
}
