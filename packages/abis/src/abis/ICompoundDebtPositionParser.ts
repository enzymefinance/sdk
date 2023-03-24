export const ICompoundDebtPositionParser = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_compoundPriceFeed",
        type: "address",
      },
      {
        internalType: "address",
        name: "_compToken",
        type: "address",
      },
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
    inputs: [],
    name: "getCompToken",
    outputs: [
      {
        internalType: "address",
        name: "compToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCompoundPriceFeed",
    outputs: [
      {
        internalType: "address",
        name: "compoundPriceFeed_",
        type: "address",
      },
    ],
    stateMutability: "view",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_externalPosition",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_actionId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedActionArgs",
        type: "bytes",
      },
    ],
    name: "parseAssetsForAction",
    outputs: [
      {
        internalType: "address[]",
        name: "assetsToTransfer_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amountsToTransfer_",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "assetsToReceive_",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "parseInitArgs",
    outputs: [
      {
        internalType: "bytes",
        name: "initArgs_",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
