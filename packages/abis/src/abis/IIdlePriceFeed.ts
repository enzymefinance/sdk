export const IIdlePriceFeed = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_fundDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addDerivatives",
    inputs: [
      {
        name: "_derivatives",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_underlyings",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
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
    name: "getFundDeployer",
    inputs: [],
    outputs: [
      {
        name: "fundDeployer_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOwner",
    inputs: [],
    outputs: [
      {
        name: "owner_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUnderlyingForDerivative",
    inputs: [
      {
        name: "_derivative",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "underlying_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
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
  {
    type: "function",
    name: "removeDerivatives",
    inputs: [
      {
        name: "_derivatives",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "DerivativeAdded",
    inputs: [
      {
        name: "derivative",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "underlying",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DerivativeRemoved",
    inputs: [
      {
        name: "derivative",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
