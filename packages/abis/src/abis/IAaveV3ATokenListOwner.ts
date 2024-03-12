export const IAaveV3ATokenListOwner = [
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
        name: "_poolAddressProvider",
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
