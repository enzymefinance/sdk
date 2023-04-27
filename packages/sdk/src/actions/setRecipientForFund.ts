import { type Address, parseAbi, type Hex, decodeFunctionData } from "viem";
import { MANAGEMENT_FEE } from "../../tests/constants.js";

export interface SetRecipientForFundParams {
  comptrollerProxy: Address;
  recipient: Address;
}

const abi = parseAbi(["function setRecipientForFund(address _comptrollerProxy, address _recipient)"]);

export function prepareSetRecipientForFundParams({ comptrollerProxy, recipient }: SetRecipientForFundParams) {
  return {
    abi,
    functionName: "setRecipientForFund",
    args: [comptrollerProxy, recipient],
    address: MANAGEMENT_FEE,
  } as const;
}

export function decodeSetRecipientForFundParams(params: Hex): SetRecipientForFundParams {
  const decoded = decodeFunctionData({
    abi,
    data: params,
  });

  const [comptrollerProxy, recipient] = decoded.args;

  return {
    comptrollerProxy,
    recipient,
  };
}
