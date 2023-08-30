import { prepareDeployGasRelayPaymasterParams } from "../../src/actions/deployGasRelayPaymaster.js";
import { type Network, sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function deployGasRelayPaymaster({
  account,
  address,
  network,
}: {
  account: Address;
  address: Address;
  network: Network;
}) {
  return sendTestTransaction({
    account,
    address,
    ...prepareDeployGasRelayPaymasterParams(),
    network,
  });
}
