export const IVaultCore = [
  {
    inputs: [],
    name: "getAccessor",
    outputs: [
      {
        internalType: "address",
        name: "accessor_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCreator",
    outputs: [
      {
        internalType: "address",
        name: "creator_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMigrator",
    outputs: [
      {
        internalType: "address",
        name: "migrator_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
