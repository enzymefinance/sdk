export const IArbitraryValueOracle = [
  {
    inputs: [],
    name: "getLastUpdated",
    outputs: [
      {
        internalType: "uint256",
        name: "lastUpdated_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValue",
    outputs: [
      {
        internalType: "int256",
        name: "value_",
        type: "int256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValueWithTimestamp",
    outputs: [
      {
        internalType: "int256",
        name: "value_",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "lastUpdated_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
