import * as Abis from "@enzymefinance/abis";
import type { Address, PublicClient } from "viem";
import { Viem } from "./Utils";

export function doesAutoProtocolFeeSharesBuyback(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "doesAutoProtocolFeeSharesBuyback",
    address: args.comptrollerProxy,
  });
}

export function getPolicyManager(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "getPolicyManager",
    address: args.comptrollerProxy,
  });
}

export function getFeeManager(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    functionName: "getFeeManager",
    address: args.comptrollerProxy,
  });
}
