export const ILiquityDebtPositionParser = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_liquityTroveManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_lusdToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_wethToken",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
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
