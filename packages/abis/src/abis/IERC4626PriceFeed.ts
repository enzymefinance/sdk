export const IERC4626PriceFeed = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_derivative",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_derivativeAmount",
        type: "uint256",
      },
    ],
    name: "calcUnderlyingValues",
    outputs: [
      {
        internalType: "address[]",
        name: "underlyings_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "underlyingAmounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
    ],
    name: "isSupportedAsset",
    outputs: [
      {
        internalType: "bool",
        name: "isSupported_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;