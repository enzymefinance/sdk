import { ICompoundDebtPositionLib } from "../../../abis/src/abis/ICompoundDebtPositionLib.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

export function getCTokenFromBorrowedAsset(
  client: PublicClient,
  args: ReadContractParameters<{
    externalPositionProxy: Address;
    borrowesAsset: Address;
  }>,
) {
  return client.readContract({
    ...readContractParameters(args),
    abi: ICompoundDebtPositionLib,
    functionName: "getCTokenFromBorrowedAsset",
    address: args.externalPositionProxy,
    args: [args.borrowesAsset],
  });
}
