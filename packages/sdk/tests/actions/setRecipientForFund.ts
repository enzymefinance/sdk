import { prepareSetRecipientForFundParams } from "../../src/actions/setRecipientForFund.js";
import { MANAGEMENT_FEE } from "../constants.js";
import { type Network, sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setRecipientForFund({
  comptrollerProxy,
  recipient,
  account,
  network,
}: {
  comptrollerProxy: Address;
  recipient: Address;
  account: Address;
  network: Network;
}) {
  return sendTestTransaction({
    ...prepareSetRecipientForFundParams({
      comptrollerProxy,
      recipient,
    }),
    network,
    account,
    address: MANAGEMENT_FEE,
  });
}
