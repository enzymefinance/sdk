import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { IProtocolFeeTracker } from "@enzymefinance/abis/IProtocolFeeTracker";
import type { Address, PublicClient } from "viem";

export function getAccruedProtocolFee(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
    protocolFeeTracker: Address;
  }>,
) {
  return client.simulateContract({
    ...readContractParameters(args),
    abi: IProtocolFeeTracker,
    functionName: "payFee",
    address: args.protocolFeeTracker,
    account: args.vaultProxy,
  });
}
