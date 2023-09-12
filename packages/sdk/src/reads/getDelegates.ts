import { AAVE, COMP, STKAAVE, UNI } from "../../tests/constants.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, PublicClient } from "viem";

export async function getDAODelegates(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
  }>,
) {
  const tokenDaoDelegatesAbi = {
    name: "delegates",
    type: "function",
    inputs: [
      {
        name: "account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  } as const;

  const tokenDaoDelegateeByTypeAbi = {
    name: "getDelegateeByType",
    type: "function",
    inputs: [
      {
        name: "delegator",
        type: "address",
        internalType: "address",
      },
      {
        name: "type",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  } as const;

  // it doesn't matter what type we use, in our case voting power delegatee and proposition power delegatee will be always the same
  const votingPowerType = 0;
  const contractsWithoutVotingPower = [COMP, UNI];
  const contractsWithVotingPower = [AAVE, STKAAVE];

  const [[compDelegatee, uniDelegatee], [aaveDelegatee, stkaaveDelegatee]] = await Promise.all([
    contractsWithoutVotingPower.map((address) =>
      client.readContract({
        ...readContractParameters(args),
        abi: [tokenDaoDelegatesAbi],
        functionName: "delegates",
        address: address,
        args: [args.vaultProxy],
      }),
    ),
    contractsWithVotingPower.map((address) =>
      client.readContract({
        ...readContractParameters(args),
        abi: [tokenDaoDelegateeByTypeAbi],
        functionName: "getDelegateeByType",
        address: address,
        args: [args.vaultProxy, votingPowerType],
      }),
    ),
  ]);

  return {
    aaveDelegatee,
    compDelegatee,
    stkaaveDelegatee,
    uniDelegatee,
  };
}
