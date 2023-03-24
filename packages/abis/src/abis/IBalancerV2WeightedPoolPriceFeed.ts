export const IBalancerV2WeightedPoolPriceFeed = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundDeployer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_valueInterpreter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_intermediaryAsset",
        type: "address",
      },
      {
        internalType: "address",
        name: "_balancerVault",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_poolFactories",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "poolFactory",
        type: "address",
      },
    ],
    name: "PoolFactoryAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "poolFactory",
        type: "address",
      },
    ],
    name: "PoolFactoryRemoved",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_poolFactories",
        type: "address[]",
      },
    ],
    name: "addPoolFactories",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
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
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFundDeployer",
    outputs: [
      {
        internalType: "address",
        name: "fundDeployer_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "owner_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPoolFactories",
    outputs: [
      {
        internalType: "address[]",
        name: "factories_",
        type: "address[]",
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
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_poolFactories",
        type: "address[]",
      },
    ],
    name: "removePoolFactories",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
