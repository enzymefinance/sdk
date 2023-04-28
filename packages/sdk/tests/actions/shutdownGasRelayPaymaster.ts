import { type Address } from "viem";
import { sendTestTransaction } from "../globals.js";
import { prepareShutdownGasRelayPaymasterParams } from "../../src/actions/shutdownGasRelayPaymaster.js";

export function shutdownGasRelayPaymaster({
  account,
  address,
}: {
  account: Address;
  address: Address;
}) {
  return sendTestTransaction({
    account,
    address,
    ...prepareShutdownGasRelayPaymasterParams(),
  });
}
