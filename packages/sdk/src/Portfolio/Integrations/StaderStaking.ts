import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// WRAP
//--------------------------------------------------------------------------------------------

export const wrap = IntegrationManager.makeUse(IntegrationManager.Selector.Wrap, wrapEncode);

const wrapEncoding = [
  {
    name: "outgoingAmount",
    type: "uint256",
  },
  {
    name: "minIncomingAmount",
    type: "uint256",
  },
] as const;

export type WrapArgs = {
  outgoingAmount: bigint;
  minIncomingAmount: bigint;
};

export function wrapEncode(args: WrapArgs): Hex {
  return encodeAbiParameters(wrapEncoding, [args.outgoingAmount, args.minIncomingAmount]);
}

export function wrapDecode(encoded: Hex): WrapArgs {
  const [outgoingAmount, minIncomingAmount] = decodeAbiParameters(wrapEncoding, encoded);

  return {
    outgoingAmount,
    minIncomingAmount,
  };
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

const staderStakePoolsManagerAbi = [
  {
    inputs: [{ internalType: "uint256", name: "_assets", type: "uint256" }],
    name: "previewDeposit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
] as const;

export function previewDeposit(
  client: Client,
  args: Viem.ContractCallParameters<{
    staderStakingPoolManager: Address;
    depositAmount: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: staderStakePoolsManagerAbi,
    functionName: "previewDeposit",
    address: args.staderStakingPoolManager,
    args: [args.depositAmount],
  });
}
