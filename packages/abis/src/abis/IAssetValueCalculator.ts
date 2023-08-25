export const IAssetValueCalculator = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_valueInterpreter",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_baseAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_quoteAsset",
        type: "address",
      },
    ],
    name: "calcNormalizedAssetValue",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "valueIsValid_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getValueInterpreter",
    outputs: [
      {
        internalType: "address",
        name: "valueInterpreter_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
