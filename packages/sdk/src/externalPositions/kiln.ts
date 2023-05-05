import { ExternalPosition } from "../enums.js";
import {
  decodeCallArgsForCallOnExternalPosition,
  encodeCallArgsForCallOnExternalPosition,
} from "./callOnExternalPosition.js";
import { type Address, decodeAbiParameters, encodeAbiParameters, parseAbiParameters } from "viem";
import type { Hex } from "viem";

// stake
const actionsArgsForKilnStakeAbiParamaters = parseAbiParameters("address stakingContract, uint validatorAmount");

export type CallArgsForKilnStake = {
  stakingContract: Address;
  validatorAmount: bigint;
} & { externalPositionProxy: Address };

export function encodeCallArgsForKilnStake({
  externalPositionProxy,
  stakingContract,
  validatorAmount,
}: CallArgsForKilnStake): Hex {
  const actionArgs = encodeAbiParameters(actionsArgsForKilnStakeAbiParamaters, [stakingContract, validatorAmount]);

  return encodeCallArgsForCallOnExternalPosition({
    externalPositionProxy,
    actionId: KilnAction.Stake,
    actionArgs,
  });
}

export function decodeCallArgsForKilnStake(callArgs: Hex): CallArgsForKilnStake {
  const decodedCallArgs = decodeCallArgsForCallOnExternalPosition(callArgs);

  const { externalPositionProxy, actionArgs } = decodedCallArgs;

  const decodedActionArgs = decodeAbiParameters(actionsArgsForKilnStakeAbiParamaters, actionArgs);

  const [stakingContract, validatorAmount] = decodedActionArgs;

  return {
    validatorAmount,
    externalPositionProxy,
    stakingContract,
  };
}

export type KilnStakeTrade = {
  type: typeof ExternalPosition.KilnStake;
  callArgs: CallArgsForKilnStake;
};

export type KilnAction = typeof KilnAction[keyof typeof KilnAction];
export const KilnAction = {
  Stake: 0n,
  ClaimFees: 1n,
  WithdrawEth: 2n,
} as const;
