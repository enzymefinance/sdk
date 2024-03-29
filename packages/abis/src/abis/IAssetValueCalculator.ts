export const IAssetValueCalculator = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_valueInterpreter",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcNormalizedAssetValue",
    inputs: [
      {
        name: "_baseAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_quoteAsset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "timestamp_",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "value_",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "valueIsValid_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getValueInterpreter",
    inputs: [],
    outputs: [
      {
        name: "valueInterpreter_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
] as const;
