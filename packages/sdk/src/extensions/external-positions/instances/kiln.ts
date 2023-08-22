import { decodeCallOnExternalPositionArgs, encodeCallOnExternalPositionArgs } from "../callOnExternalPosition.js";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type KilnAction = typeof KilnAction[keyof typeof KilnAction];
export const KilnAction = {
  Stake: 0n,
  ClaimFees: 1n,
  WithdrawEth: 2n,
} as const;

export const kilnStakeArgsEncoding = [
  {
    type: "address",
    name: "stakingContract",
  },
  {
    name: "validatorAmount",
    type: "uint256",
  },
] as const;

export type KilnStakeArgs = {
  stakingContract: Address;
  validatorAmount: bigint;
  externalPositionProxy: Address;
};

export function encodeKilnStakeArgs({ externalPositionProxy, stakingContract, validatorAmount }: KilnStakeArgs): Hex {
  const actionArgs = encodeAbiParameters(kilnStakeArgsEncoding, [stakingContract, validatorAmount]);

  return encodeCallOnExternalPositionArgs({
    externalPositionProxy,
    actionId: KilnAction.Stake,
    actionArgs,
  });
}

export function decodeKilnStakeArgs(callArgs: Hex): KilnStakeArgs {
  const { externalPositionProxy, actionArgs } = decodeCallOnExternalPositionArgs(callArgs);
  const [stakingContract, validatorAmount] = decodeAbiParameters(kilnStakeArgsEncoding, actionArgs);

  return {
    validatorAmount,
    externalPositionProxy,
    stakingContract,
  };
}
