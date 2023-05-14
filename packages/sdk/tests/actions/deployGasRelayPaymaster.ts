import { prepareDeployGasRelayPaymasterParams } from "../../src/actions/deployGasRelayPaymaster.js";
import { sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function deployGasRelayPaymaster({
  account,
  address,
}: {
  account: Address;
  address: Address;
}) {
  return sendTestTransaction({
    account,
    address,
    ...prepareDeployGasRelayPaymasterParams(),
  });
}
