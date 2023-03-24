export const ICurvePriceFeed = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundDeployer",
        type: "address",
      },
      {
        internalType: "address",
        name: "_addressProvider",
        type: "address",
      },
      {
        internalType: "address",
        name: "_poolOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_virtualPriceDeviationThreshold",
        type: "uint256",
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
        name: "poolOwner",
        type: "address",
      },
    ],
    name: "CurvePoolOwnerSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "derivative",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "DerivativeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "derivative",
        type: "address",
      },
    ],
    name: "DerivativeRemoved",
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
      {
        indexed: true,
        internalType: "address",
        name: "invariantProxyAsset",
        type: "address",
      },
    ],
    name: "InvariantProxyAssetForPoolSet",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "pool",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "virtualPrice",
        type: "uint256",
      },
    ],
    name: "ValidatedVirtualPriceForPoolUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_gaugeTokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_pools",
        type: "address[]",
      },
    ],
    name: "addGaugeTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_gaugeTokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_pools",
        type: "address[]",
      },
    ],
    name: "addGaugeTokensWithoutValidation",
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
      {
        internalType: "bool[]",
        name: "_reentrantVirtualPrices",
        type: "bool[]",
      },
      {
        internalType: "address[]",
        name: "_lpTokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_gaugeTokens",
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
        internalType: "address[]",
        name: "_pools",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_invariantProxyAssets",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "_reentrantVirtualPrices",
        type: "bool[]",
      },
      {
        internalType: "address[]",
        name: "_lpTokens",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_gaugeTokens",
        type: "address[]",
      },
    ],
    name: "addPoolsWithoutValidation",
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
    name: "getCurvePoolOwner",
    outputs: [
      {
        internalType: "address",
        name: "poolOwner_",
        type: "address",
      },
    ],
    stateMutability: "view",
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
    inputs: [
      {
        internalType: "address",
        name: "_pool",
        type: "address",
      },
    ],
    name: "getLpTokenForPool",
    outputs: [
      {
        internalType: "address",
        name: "lpToken_",
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
    inputs: [
      {
        internalType: "address",
        name: "_derivative",
        type: "address",
      },
    ],
    name: "getPoolForDerivative",
    outputs: [
      {
        internalType: "address",
        name: "pool_",
        type: "address",
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
            internalType: "uint88",
            name: "lastValidatedVirtualPrice",
            type: "uint88",
          },
        ],
        internalType: "struct CurvePriceFeed.PoolInfo",
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
        name: "_derivatives",
        type: "address[]",
      },
    ],
    name: "removeDerivatives",
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
  {
    inputs: [
      {
        internalType: "address",
        name: "_nextPoolOwner",
        type: "address",
      },
    ],
    name: "setCurvePoolOwner",
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
      {
        internalType: "bool[]",
        name: "_reentrantVirtualPrices",
        type: "bool[]",
      },
    ],
    name: "updatePoolInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
