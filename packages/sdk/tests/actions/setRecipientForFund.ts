import { prepareSetRecipientForFundParams } from "../../src/actions/setRecipientForFund.js";
import { MANAGEMENT_FEE } from "../constants.js";
import { sendTestTransaction } from "../globals.js";
import type { Address } from "viem";

export function setRecipientForFund({
  comptrollerProxy,
  recipient,
  account,
}: {
  comptrollerProxy: Address;
  recipient: Address;
  account: Address;
}) {
  return sendTestTransaction({
    ...prepareSetRecipientForFundParams({
      comptrollerProxy,
      recipient,
    }),
    account,
    address: MANAGEMENT_FEE,
  });
}
