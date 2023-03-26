export const IFundValueCalculatorUsdWrapper = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundValueCalculatorRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wethToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_ethUsdAggregator",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_staleRateThreshold",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
    ],
    name: "calcGav",
    outputs: [
      {
        internalType: "uint256",
        name: "gav_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
    ],
    name: "calcGrossShareValue",
    outputs: [
      {
        internalType: "uint256",
        name: "grossShareValue_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
    ],
    name: "calcNav",
    outputs: [
      {
        internalType: "uint256",
        name: "nav_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
    ],
    name: "calcNetShareValue",
    outputs: [
      {
        internalType: "uint256",
        name: "netShareValue_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_sharesHolder",
        type: "address",
      },
    ],
    name: "calcNetValueForSharesHolder",
    outputs: [
      {
        internalType: "uint256",
        name: "netValue_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEthUsdAggregatorContract",
    outputs: [
      {
        internalType: "contract IChainlinkAggregatorFundValueCalculatorUsdWrapper",
        name: "ethUsdAggregatorContract_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFundValueCalculatorRouter",
    outputs: [
      {
        internalType: "address",
        name: "fundValueCalculatorRouter_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getStaleRateThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "staleRateThreshold_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWethToken",
    outputs: [
      {
        internalType: "address",
        name: "wethToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
