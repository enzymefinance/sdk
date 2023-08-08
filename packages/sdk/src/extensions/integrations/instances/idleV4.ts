import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export const idleV4LendEncoding = [
  {
    name: "idleToken",
    type: "address",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    name: "minIncomingIdleTokenAmount",
    type: "uint256",
  },
] as const;

export type IdleV4LendArgs = {
  idleToken: Address;
  depositAmount: bigint;
  minIncomingIdleTokenAmount: bigint;
};

export function encodeIdleV4LendArgs({ idleToken, depositAmount, minIncomingIdleTokenAmount }: IdleV4LendArgs): Hex {
  return encodeAbiParameters(idleV4LendEncoding, [idleToken, depositAmount, minIncomingIdleTokenAmount]);
}

export function decodeIdleV4LendArgs(callArgs: Hex): IdleV4LendArgs {
  const [idleToken, depositAmount, minIncomingIdleTokenAmount] = decodeAbiParameters(idleV4LendEncoding, callArgs);

  return {
    idleToken,
    depositAmount,
    minIncomingIdleTokenAmount,
  };
}

export const idleV4RedeemEncoding = [
  {
    type: "address",
    name: "idleToken",
  },
  {
    name: "outgoingIdleTokenAmount",
    type: "uint256",
  },
  {
    name: "minIncomingUnderlyingAmount",
    type: "uint256",
  },
] as const;

export type IdleV4RedeemArgs = {
  idleToken: Address;
  outgoingIdleTokenAmount: bigint;
  minIncomingUnderlyingAmount: bigint;
};

export function encodeIdleV4RedeemArgs({
  idleToken,
  outgoingIdleTokenAmount,
  minIncomingUnderlyingAmount,
}: IdleV4RedeemArgs): Hex {
  return encodeAbiParameters(idleV4RedeemEncoding, [idleToken, outgoingIdleTokenAmount, minIncomingUnderlyingAmount]);
}

export function decodeIdleV4RedeemArgs(integrationData: Hex): IdleV4RedeemArgs {
  const [idleToken, outgoingIdleTokenAmount, minIncomingUnderlyingAmount] = decodeAbiParameters(
    idleV4RedeemEncoding,
    integrationData,
  );

  return { idleToken, outgoingIdleTokenAmount, minIncomingUnderlyingAmount };
}

export const idleV4ClaimRewardsEncoding = [
  {
    type: "address",
    name: "idleToken",
  },
] as const;

export type IdleV4ClaimRewardsArgs = {
  idleToken: Address;
};

export function encodeIdleV4ClaimRewardsArgs({ idleToken }: IdleV4ClaimRewardsArgs): Hex {
  return encodeAbiParameters(idleV4ClaimRewardsEncoding, [idleToken]);
}

export function decodeIdleV4ClaimRewardsArgs(integrationData: Hex): IdleV4ClaimRewardsArgs {
  const [idleToken] = decodeAbiParameters(idleV4ClaimRewardsEncoding, integrationData);

  return { idleToken };
}
