import { prepareSetRecipientForFundParams } from "../../src/actions/setRecipientForFund.js";
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
  const params = {
    ...prepareSetRecipientForFundParams({
      comptrollerProxy,
      recipient,
    }),
    account,
  } as const;

  return sendTestTransaction({ ...params });
}
