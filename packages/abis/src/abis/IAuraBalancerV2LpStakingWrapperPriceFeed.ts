export const IAuraBalancerV2LpStakingWrapperPriceFeed = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_wrapperFactory",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcUnderlyingValues",
    inputs: [
      {
        name: "_derivative",
        type: "address",
        internalType: "address",
      },
      {
        name: "_derivativeAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "underlyings_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "underlyingAmounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isSupportedAsset",
    inputs: [
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "isSupported_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
] as const;
