export const IBalancerV2StablePoolPriceFeed = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundDeployer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wrappedNativeAsset",
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
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "invariantProxyAsset",
        type: "address",
      },
    ],
    name: "PoolAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
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
        indexed: true,
        internalType: "address",
        name: "poolFactory",
        type: "address",
      },
    ],
    name: "PoolFactoryRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "PoolRemoved",
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
        internalType: "address[]",
        name: "_pools",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_invariantProxyAssets",
        type: "address[]",
      },
    ],
    name: "addPools",
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
        name: "_pool",
        type: "address",
      },
    ],
    name: "getPoolInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "invariantProxyAsset",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "invariantProxyAssetDecimals",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "containsNativeAsset",
            type: "bool",
          },
        ],
        internalType: "struct BalancerV2StablePoolPriceFeed.PoolInfo",
        name: "poolInfo_",
        type: "tuple",
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
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_pools",
        type: "address[]",
      },
    ],
    name: "removePools",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
