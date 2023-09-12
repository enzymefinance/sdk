import { AAVE, COMP, STKAAVE, UNI } from "../../tests/constants.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { type Address, type PublicClient, parseAbi } from "viem";

export async function getDelegates(
  client: PublicClient,
  args: ReadContractParameters<{
    vaultProxy: Address;
  }>,
) {
  const tokenDaoDelegates = parseAbi(["function delegates(address account) view returns (address)"] as const);

  const tokenDaoDelegateeByType = parseAbi([
    "function getDelegateeByType(address delegator, uint8 type) view returns (address)",
  ] as const);

  const contractsWithoutVotingPower = [{ address: COMP }, { address: UNI }];

  const [nonVotingPowerContracts] = await Promise.all([
    contractsWithoutVotingPower.map((params) =>
      client.readContract({
        ...readContractParameters(args),
        abi: tokenDaoDelegates,
        functionName: "delegates",
        address: params.address,
        args: [args.vaultProxy],
      }),
    ),
  ]);

  const [compDelegatee, uniDelegatee] = nonVotingPowerContracts;

  // it doesn't matter what type we use, in our case voting power delegatee and proposition power delegatee will be always the same
  const votingPowerType = 0;
  const contractsWithVotingPower = [
    { address: AAVE, votingPowerType },
    { address: STKAAVE, votingPowerType },
  ];

  const [votingPowerContracts] = await Promise.all([
    contractsWithVotingPower.map((params) =>
      client.readContract({
        ...readContractParameters(args),
        abi: tokenDaoDelegateeByType,
        functionName: "getDelegateeByType",
        address: params.address,
        args: [args.vaultProxy, params.votingPowerType],
      }),
    ),
  ]);

  const [aaveDelegatee, stkaaveDelegatee] = votingPowerContracts;

  return {
    aaveDelegatee,
    compDelegatee,
    stkaaveDelegatee,
    uniDelegatee,
  };
}
