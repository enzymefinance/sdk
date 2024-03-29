export const ICompoundV3CTokenListOwner = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_addressListRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "_listDescription",
        type: "string",
        internalType: "string",
      },
      {
        name: "_compoundV3Configurator",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addValidatedItemsToList",
    inputs: [
      {
        name: "_items",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;
