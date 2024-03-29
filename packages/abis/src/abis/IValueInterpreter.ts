export const IValueInterpreter = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_fundDeployer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_wethToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_chainlinkStaleRateThreshold",
        type: "uint256",
        internalType: "uint256",
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
        name: "_priceFeeds",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addPrimitives",
    inputs: [
      {
        name: "_primitives",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_aggregators",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_rateAssets",
        type: "uint8[]",
        internalType: "enum IChainlinkPriceFeedMixin.RateAsset[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcCanonicalAssetValue",
    inputs: [
      {
        name: "_baseAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_quoteAsset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "value_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcCanonicalAssetsTotalValue",
    inputs: [
      {
        name: "_baseAssets",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_amounts",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_quoteAsset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "value_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getAggregatorForPrimitive",
    inputs: [
      {
        name: "_primitive",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "aggregator_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEthUsdAggregator",
    inputs: [],
    outputs: [
      {
        name: "ethUsdAggregator_",
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
    name: "getPriceFeedForDerivative",
    inputs: [
      {
        name: "_derivative",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "priceFeed_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRateAssetForPrimitive",
    inputs: [
      {
        name: "_primitive",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "rateAsset_",
        type: "uint8",
        internalType: "enum IChainlinkPriceFeedMixin.RateAsset",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getStaleRateThreshold",
    inputs: [],
    outputs: [
      {
        name: "staleRateThreshold_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUnitForPrimitive",
    inputs: [
      {
        name: "_primitive",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "unit_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getWethToken",
    inputs: [],
    outputs: [
      {
        name: "wethToken_",
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
    name: "isSupportedDerivativeAsset",
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
    name: "isSupportedPrimitiveAsset",
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
    name: "removePrimitives",
    inputs: [
      {
        name: "_primitives",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setEthUsdAggregator",
    inputs: [
      {
        name: "_nextEthUsdAggregator",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateDerivatives",
    inputs: [
      {
        name: "_derivatives",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_priceFeeds",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updatePrimitives",
    inputs: [
      {
        name: "_primitives",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_aggregators",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_rateAssets",
        type: "uint8[]",
        internalType: "enum IChainlinkPriceFeedMixin.RateAsset[]",
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
        name: "priceFeed",
        type: "address",
        indexed: false,
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
    name: "EthUsdAggregatorSet",
    inputs: [
      {
        name: "prevEthUsdAggregator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "nextEthUsdAggregator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PrimitiveAdded",
    inputs: [
      {
        name: "primitive",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "aggregator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "rateAsset",
        type: "uint8",
        indexed: false,
        internalType: "enum IChainlinkPriceFeedMixin.RateAsset",
      },
      {
        name: "unit",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PrimitiveRemoved",
    inputs: [
      {
        name: "primitive",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
