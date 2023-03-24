export const ISolvV2BondBuyerPositionParser = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_initialBondOfferingMarket",
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
        name: "",
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
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
