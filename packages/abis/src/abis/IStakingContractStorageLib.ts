export const IStakingContractStorageLib = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "_publicKeyRoot",
        type: "bytes32",
      },
    ],
    name: "getExitRequestedFromRoot",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
