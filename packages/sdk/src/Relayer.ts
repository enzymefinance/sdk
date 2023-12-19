import * as Abis from "@enzymefinance/abis";
import { type Address, Hex, type PublicClient, encodeFunctionData, isAddressEqual, parseAbi, zeroAddress } from "viem";
import { Viem } from "./Utils.js";

const relayHubAbi = [
  {
    inputs: [
      { internalType: "uint256", name: "maxAcceptanceBudget", type: "uint256" },
      {
        components: [
          {
            components: [
              { internalType: "address", name: "from", type: "address" },
              { internalType: "address", name: "to", type: "address" },
              { internalType: "uint256", name: "value", type: "uint256" },
              { internalType: "uint256", name: "gas", type: "uint256" },
              { internalType: "uint256", name: "nonce", type: "uint256" },
              { internalType: "bytes", name: "data", type: "bytes" },
              { internalType: "uint256", name: "validUntil", type: "uint256" },
            ],
            internalType: "struct IForwarder.ForwardRequest",
            name: "request",
            type: "tuple",
          },
          {
            components: [
              { internalType: "uint256", name: "gasPrice", type: "uint256" },
              { internalType: "uint256", name: "pctRelayFee", type: "uint256" },
              { internalType: "uint256", name: "baseRelayFee", type: "uint256" },
              { internalType: "address", name: "relayWorker", type: "address" },
              { internalType: "address", name: "paymaster", type: "address" },
              { internalType: "address", name: "forwarder", type: "address" },
              { internalType: "bytes", name: "paymasterData", type: "bytes" },
              { internalType: "uint256", name: "clientId", type: "uint256" },
            ],
            internalType: "struct GsnTypes.RelayData",
            name: "relayData",
            type: "tuple",
          },
        ],
        internalType: "struct GsnTypes.RelayRequest",
        name: "relayRequest",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
      { internalType: "bytes", name: "approvalData", type: "bytes" },
      { internalType: "uint256", name: "externalGasLimit", type: "uint256" },
    ],
    name: "relayCall",
    outputs: [
      { internalType: "bool", name: "paymasterAccepted", type: "bool" },
      { internalType: "bytes", name: "returnValue", type: "bytes" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const relayRequestTypes = {
  RelayData: [
    { name: "gasPrice", type: "uint256" },
    { name: "pctRelayFee", type: "uint256" },
    { name: "baseRelayFee", type: "uint256" },
    { name: "relayWorker", type: "address" },
    { name: "paymaster", type: "address" },
    { name: "forwarder", type: "address" },
    { name: "paymasterData", type: "bytes" },
    { name: "clientId", type: "uint256" },
  ],
  RelayRequest: [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "value", type: "uint256" },
    { name: "gas", type: "uint256" },
    { name: "nonce", type: "uint256" },
    { name: "data", type: "bytes" },
    { name: "validUntil", type: "uint256" },
    { name: "relayData", type: "RelayData" },
  ],
} as const;

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export function deployGasRelayPaymaster(args: {
  comptrollerProxy: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "deployGasRelayPaymaster",
    address: args.comptrollerProxy,
  });
}

export function depositToGasRelayPaymaster(args: {
  comptrollerProxy: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "depositToGasRelayPaymaster",
    address: args.comptrollerProxy,
  });
}

export function shutdownGasRelayPaymaster(args: {
  comptrollerProxy: Address;
}) {
  return new Viem.PopulatedTransaction({
    abi: Abis.IComptrollerLib,
    functionName: "shutdownGasRelayPaymaster",
    address: args.comptrollerProxy,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function isRelayerEnabled(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  const address = await Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    address: args.comptrollerProxy,
    functionName: "getGasRelayPaymaster",
  });

  return !isAddressEqual(address, zeroAddress);
}

export async function getGasRelayPaymaster(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    comptrollerProxy: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IComptrollerLib,
    address: args.comptrollerProxy,
    functionName: "getGasRelayPaymaster",
  });
}

export function getRelayerBalance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    gasRelayPaymaster: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IGasRelayPaymasterLib,
    address: args.gasRelayPaymaster,
    functionName: "getRelayHubDeposit",
  });
}

export function getTrustedForwarder(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    gasRelayPaymaster: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis.IGasRelayPaymasterLib,
    address: args.gasRelayPaymaster,
    functionName: "trustedForwarder",
  });
}

export function getNonce(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    trustedForwarder: Address;
    sender: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getNonce(address sender) view returns (uint256)"]),
    address: args.trustedForwarder,
    functionName: "getNonce",
    args: [args.sender],
  });
}

export type RelayRequest = {
  request: {
    gas: bigint;
    nonce: bigint;
    validUntil: bigint;
    value: bigint;
    data: Hex;
    from: Address;
    to: Address;
  };
  relayData: {
    baseRelayFee: bigint;
    clientId: bigint;
    gasPrice: bigint;
    pctRelayFee: bigint;
    forwarder: Address;
    paymaster: Address;
    paymasterData: Hex;
    relayWorker: Address;
  };
};

export function encodeRelayCallData(args: {
  maxAcceptanceBudget: bigint;
  relayRequest: RelayRequest;
  signature: Hex;
  approvalData: Hex;
  gasLimit: bigint;
}) {
  return encodeFunctionData({
    abi: relayHubAbi,
    functionName: "relayCall",
    args: [args.maxAcceptanceBudget, args.relayRequest, args.signature, args.approvalData, args.gasLimit],
  });
}
