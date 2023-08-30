import { prepareDeployGasRelayPaymasterParams } from "../../src/actions/deployGasRelayPaymaster.js";
import { type ClientNetwork, sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function deployGasRelayPaymaster({
  account,
  address,
  clientNetwork,
}: {
  account: Address;
  address: Address;
  clientNetwork: ClientNetwork;
}) {
  return sendTestTransaction({
    account,
    address,
    ...prepareDeployGasRelayPaymasterParams(),
    clientNetwork,
  });
}
