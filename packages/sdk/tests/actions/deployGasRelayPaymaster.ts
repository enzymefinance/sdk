import { type Address } from "viem";
import { sendTestTransaction } from "../globals.js";
import { prepareDeployGasRelayPaymasterParams } from "../../src/actions/deployGasRelayPaymaster.js";

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
