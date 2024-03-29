export const ICurvePriceFeed = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_fundDeployer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_addressProvider",
        type: "address",
        internalType: "address",
      },
      {
        name: "_poolOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_virtualPriceDeviationThreshold",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addGaugeTokens",
    inputs: [
      {
        name: "_gaugeTokens",
        type: "address[]",
        internalType: "address[]",
      },
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
    type: "function",
    name: "addGaugeTokensWithoutValidation",
    inputs: [
      {
        name: "_gaugeTokens",
        type: "address[]",
        internalType: "address[]",
      },
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
      {
        name: "_reentrantVirtualPrices",
        type: "bool[]",
        internalType: "bool[]",
      },
      {
        name: "_lpTokens",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_gaugeTokens",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addPoolsWithoutValidation",
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
      {
        name: "_reentrantVirtualPrices",
        type: "bool[]",
        internalType: "bool[]",
      },
      {
        name: "_lpTokens",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_gaugeTokens",
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
    name: "getCurvePoolOwner",
    inputs: [],
    outputs: [
      {
        name: "poolOwner_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
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
    name: "getLpTokenForPool",
    inputs: [
      {
        name: "_pool",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "lpToken_",
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
    name: "getPoolForDerivative",
    inputs: [
      {
        name: "_derivative",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "pool_",
        type: "address",
        internalType: "address",
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
        internalType: "struct CurvePriceFeed.PoolInfo",
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
          {
            name: "lastValidatedVirtualPrice",
            type: "uint88",
            internalType: "uint88",
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
    type: "function",
    name: "setCurvePoolOwner",
    inputs: [
      {
        name: "_nextPoolOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updatePoolInfo",
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
      {
        name: "_reentrantVirtualPrices",
        type: "bool[]",
        internalType: "bool[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CurvePoolOwnerSet",
    inputs: [
      {
        name: "poolOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
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
        name: "pool",
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
  {
    type: "event",
    name: "InvariantProxyAssetForPoolSet",
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
  {
    type: "event",
    name: "ValidatedVirtualPriceForPoolUpdated",
    inputs: [
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "virtualPrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
