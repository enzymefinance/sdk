import { parseAbi, type Address } from "viem";
import { MANAGEMENT_FEE } from "../constants.js";
import { sendTestTransaction } from "../globals.js";
import { prepareSetRecipientForFundParams } from "../../src/actions/setRecipientForFund.js";

export async function setRecipientForFund({
  comptrollerProxy,
  recipient,
  account,
}: {
  comptrollerProxy: Address;
  recipient: Address;
  account: Address;
}) {
  const a = prepareSetRecipientForFundParams({
    comptrollerProxy,
    recipient,
  });

  console.log("A", a);

  const res = await sendTestTransaction({
    abi: parseAbi(["function setRecipientForFund(address _comptrollerProxy, address _recipient)"]),
    functionName: "setRecipientForFund",
    args: [comptrollerProxy, recipient],
    account,
    address: MANAGEMENT_FEE,
  });

  console.log("RES", res);
  return res;
}
