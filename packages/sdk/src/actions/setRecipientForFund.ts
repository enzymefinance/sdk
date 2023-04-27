import { type Address, parseAbi, type Hex, decodeFunctionData } from "viem";

export interface SetRecipientForFundParams {
  comptrollerProxy: Address;
  recipient: Address;
}

const abi = parseAbi(["function setRecipientForFund(address _comptrollerProxy, address _recipient)"]);
const managementFee = "0xfaf2c3db614e9d38fe05edc634848be7ff0542b9";

export function prepareSetRecipientForFundParams({ comptrollerProxy, recipient }: SetRecipientForFundParams) {
  return {
    abi,
    functionName: "setRecipientForFund",
    args: [comptrollerProxy, recipient],
    address: managementFee,
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
