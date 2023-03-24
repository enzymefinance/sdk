export const IAaveV2ATokenListOwner = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_addressListRegistry",
        type: "address",
      },
      {
        internalType: "string",
        name: "_listDescription",
        type: "string",
      },
      {
        internalType: "address",
        name: "_lendingPoolAddressProvider",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_items",
        type: "address[]",
      },
    ],
    name: "addValidatedItemsToList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
