export const IArbitraryValueOracle = [
  {
    type: "function",
    name: "getLastUpdated",
    inputs: [],
    outputs: [
      {
        name: "lastUpdated_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getValue",
    inputs: [],
    outputs: [
      {
        name: "value_",
        type: "int256",
        internalType: "int256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getValueWithTimestamp",
    inputs: [],
    outputs: [
      {
        name: "value_",
        type: "int256",
        internalType: "int256",
      },
      {
        name: "lastUpdated_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
] as const;
