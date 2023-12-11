import type { Address, Chain, PublicClient, Transport } from "viem";
import { Viem } from "../Utils.js";

// delegates are only for ethereum
const AAVE = "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9" as const;
const COMP = "0xc00e94Cb662C3520282E6f5717214004A7f26888" as const;
const STKAAVE = "0x4da27a545c0c5b758a6ba100e3a049001de870f5" as const;
const UNI = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" as const;

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

export async function getDelegatees<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    vaultProxy: Address;
  }>,
) {
  // it doesn't matter what type we use, in our case voting power delegatee and proposition power delegatee will be always the same
  const votingPowerType = 0;

  const [compDelegatee, uniDelegatee, aaveDelegatee, stkaaveDelegatee] = await Promise.all([
    Viem.readContract(client, args, {
      abi: [tokenDaoDelegatesAbi],
      functionName: "delegates",
      address: COMP,
      args: [args.vaultProxy],
    }),
    Viem.readContract(client, args, {
      abi: [tokenDaoDelegatesAbi],
      functionName: "delegates",
      address: UNI,
      args: [args.vaultProxy],
    }),
    Viem.readContract(client, args, {
      abi: [tokenDaoDelegateeByTypeAbi],
      functionName: "getDelegateeByType",
      address: AAVE,
      args: [args.vaultProxy, votingPowerType],
    }),
    Viem.readContract(client, args, {
      abi: [tokenDaoDelegateeByTypeAbi],
      functionName: "getDelegateeByType",
      address: STKAAVE,
      args: [args.vaultProxy, votingPowerType],
    }),
  ]);

  return {
    aaveDelegatee,
    compDelegatee,
    stkaaveDelegatee,
    uniDelegatee,
  };
}
