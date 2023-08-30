import { prepareSetRecipientForFundParams } from "../../src/actions/setRecipientForFund.js";
import { MANAGEMENT_FEE } from "../constants.js";
import { type ClientNetwork, sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setRecipientForFund({
  comptrollerProxy,
  recipient,
  account,
  clientNetwork,
}: {
  comptrollerProxy: Address;
  recipient: Address;
  account: Address;
  clientNetwork: ClientNetwork;
}) {
  return sendTestTransaction({
    ...prepareSetRecipientForFundParams({
      comptrollerProxy,
      recipient,
    }),
    clientNetwork,
    account,
    address: MANAGEMENT_FEE,
  });
}
