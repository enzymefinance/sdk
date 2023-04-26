import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem, type Address, type Hex, decodeFunctionData } from "viem";

export interface PrepareSetNominatedOwnerParams {
  nextNominatedOwner: Address;
}

export function prepareSetNominatedOwnerParams({ nextNominatedOwner }: PrepareSetNominatedOwnerParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "setNominatedOwner" }),
    args: [nextNominatedOwner],
  });
}

export function decodeSetNominatedOwnerParams(params: Hex): PrepareSetNominatedOwnerParams {
  const abi = getAbiItem({
    abi: IVault,
    name: "setNominatedOwner",
  });

  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [nextNominatedOwner] = decoded.args;

  return {
    nextNominatedOwner,
  };
}
