export const ICompoundDebtPositionParser = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_compoundPriceFeed",
        type: "address",
        internalType: "address",
      },
      {
        name: "_compToken",
        type: "address",
        internalType: "address",
      },
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
    name: "getCompToken",
    inputs: [],
    outputs: [
      {
        name: "compToken_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCompoundPriceFeed",
    inputs: [],
    outputs: [
      {
        name: "compoundPriceFeed_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
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
  {
    type: "function",
    name: "parseAssetsForAction",
    inputs: [
      {
        name: "_externalPosition",
        type: "address",
        internalType: "address",
      },
      {
        name: "_actionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_encodedActionArgs",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "assetsToTransfer_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "amountsToTransfer_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "assetsToReceive_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "parseInitArgs",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "initArgs_",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "nonpayable",
  },
] as const;
