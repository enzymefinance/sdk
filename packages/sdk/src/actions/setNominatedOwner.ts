import { prepareFunctionParams } from "../utils/viem.js";
import { decodeFunctionData, getAbiItem, type Address } from "viem";
import type { Hex } from "viem";
import { IVault } from "../../../abis/src/abis/IVault.js";

export interface SetNominatedOwnerParams {
  nextNominatedOwner: Address;
}

export function prepareSetNominatedOwnerParams({ nextNominatedOwner }: SetNominatedOwnerParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "setNominatedOwner" }),
    args: [nextNominatedOwner],
  });
}

export function decodeSetNominatedOwnerParams(params: Hex): SetNominatedOwnerParams {
  const abi = getAbiItem({ abi: IVault, name: "setNominatedOwner" });
  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [nextNominatedOwner] = decoded.args;

  return {
    nextNominatedOwner
  };
}
