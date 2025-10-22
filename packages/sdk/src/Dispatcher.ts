import * as Abis from "@enzymefinance/abis";
import type { Address, Client } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "./Utils.js";

export function getOwner(
  client: Client,
  args: Viem.ContractCallParameters<{
    dispatcher: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IDispatcher,
    functionName: "getOwner",
    address: args.dispatcher,
  });
}

export function getFundDeployerForVaultProxy(
  client: Client,
  args: Viem.ContractCallParameters<{
    dispatcher: Address;
    vaultProxy: Address;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: Abis.IDispatcher,
    functionName: "getFundDeployerForVaultProxy",
    address: args.dispatcher,
    args: [args.vaultProxy],
  });
}
