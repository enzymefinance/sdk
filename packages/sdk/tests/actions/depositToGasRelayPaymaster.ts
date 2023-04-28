import { type Address } from "viem";
import { sendTestTransaction } from "../globals.js";
import { prepareDepositToGasRelayPaymasterParams } from "../../src/actions/depositToGasRelayPaymaster.js";

export function depositToGasRelayPaymaster({
  account,
  address,
}: {
  account: Address;
  address: Address;
}) {
  return sendTestTransaction({
    account,
    address,
    ...prepareDepositToGasRelayPaymasterParams(),
  });
}
