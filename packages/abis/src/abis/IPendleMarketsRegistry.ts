export const IPendleMarketsRegistry = [
  {
    type: "function",
    name: "addAllowedMarkets",
    inputs: [
      {
        name: "_marketAddresses",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_durations",
        type: "uint32[]",
        internalType: "uint32[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getMarketDuration",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_marketAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "duration_",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeAllowedMarkets",
    inputs: [
      {
        name: "_marketAddresses",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "MarketAdded",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "marketAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "duration",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MarketRemoved",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "marketAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AlreadyRegistered",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidDuration",
    inputs: [],
  },
  {
    type: "error",
    name: "NotRegistered",
    inputs: [],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "UnequalLengths",
    inputs: [],
  },
] as const;
