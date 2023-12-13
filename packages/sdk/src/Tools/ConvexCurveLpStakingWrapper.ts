import * as Abis from "@enzymefinance/abis";
import { Address } from "viem";
import { Viem } from "../Utils.js";

export function claimRewardsFor(args: {
  convexWrapper: Address;
  for: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IConvexCurveLpStakingWrapperLib,
    functionName: "claimRewardsFor",
    address: args.convexWrapper,
    args: [args.for],
  });
}

export function withdrawTo(args: {
  convexWrapper: Address;
  to: Address;
  amount: bigint;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IConvexCurveLpStakingWrapperLib,
    functionName: "withdrawTo",
    address: args.convexWrapper,
    args: [args.to, args.amount],
  });
}
