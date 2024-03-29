export const IBalancerV2WeightedPoolPriceFeed = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_fundDeployer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_valueInterpreter",
        type: "address",
        internalType: "address",
      },
      {
        name: "_intermediaryAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_balancerVault",
        type: "address",
        internalType: "address",
      },
      {
        name: "_poolFactories",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addPoolFactories",
    inputs: [
      {
        name: "_poolFactories",
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
    name: "getPoolFactories",
    inputs: [],
    outputs: [
      {
        name: "factories_",
        type: "address[]",
        internalType: "address[]",
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
    name: "removePoolFactories",
    inputs: [
      {
        name: "_poolFactories",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "PoolFactoryAdded",
    inputs: [
      {
        name: "poolFactory",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PoolFactoryRemoved",
    inputs: [
      {
        name: "poolFactory",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
