import { prepareFunctionParams } from "../utils/viem.js";
import { type Address, type Hex, decodeFunctionData, getAbiItem, parseAbi } from "viem";

export interface SetRecipientForFundParams {
  comptrollerProxy: Address;
  recipient: Address;
}

const abi = parseAbi(["function setRecipientForFund(address _comptrollerProxy, address _recipient)"] as const);

export function prepareSetRecipientForFundParams({ comptrollerProxy, recipient }: SetRecipientForFundParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi, name: "setRecipientForFund" }),
    args: [comptrollerProxy, recipient],
  });
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
