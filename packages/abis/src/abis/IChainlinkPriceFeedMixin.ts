export const IChainlinkPriceFeedMixin = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_wethToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_staleRateThreshold",
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
