export const IPendleV2PositionParser = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_wrappedNativeAssetAddress",
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
        name: "",
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
    stateMutability: "view",
  },
  {
    type: "function",
    name: "parseInitArgs",
    inputs: [
      {
        name: "_vaultProxy",
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
        name: "data_",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "pure",
  },
] as const;
