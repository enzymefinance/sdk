export const IBalancerV2StablePoolPriceFeed = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_fundDeployer",
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
    name: "addPools",
    inputs: [
      {
        name: "_pools",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_invariantProxyAssets",
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
    name: "getPoolInfo",
    inputs: [
      {
        name: "_pool",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "poolInfo_",
        type: "tuple",
        internalType: "struct BalancerV2StablePoolPriceFeed.PoolInfo",
        components: [
          {
            name: "invariantProxyAsset",
            type: "address",
            internalType: "address",
          },
          {
            name: "invariantProxyAssetDecimals",
            type: "uint8",
            internalType: "uint8",
          },
        ],
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
    type: "function",
    name: "removePools",
    inputs: [
      {
        name: "_pools",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "PoolAdded",
    inputs: [
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "invariantProxyAsset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PoolFactoryAdded",
    inputs: [
      {
        name: "poolFactory",
        type: "address",
        indexed: true,
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
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PoolRemoved",
    inputs: [
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
