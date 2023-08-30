import { prepareSetNominatedOwnerParams } from "../../src/actions/setNominatedOwner.js";
import { type Network, sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setNominatedOwner({
  nominatedOwner,
  vaultProxy,
  account,
  network,
}: {
  nominatedOwner: Address;
  account: Address;
  vaultProxy: Address;
  network: Network;
}) {
  return sendTestTransaction({
    address: vaultProxy,
    account,
    network,
    ...prepareSetNominatedOwnerParams({
      nominatedOwner: nominatedOwner,
    }),
  });
}
