export const IFundDataProviderRouter = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_fundValueCalculatorRouter",
        type: "address",
        internalType: "address",
      },
      {
        name: "_wethToken",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getFundValueCalculatorRouter",
    inputs: [],
    outputs: [
      {
        name: "fundValueCalculatorRouter_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFundValueMetrics",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "timestamp_",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sharesSupply_",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "gavInEth_",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "gavIsValid_",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "navInEth_",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "navIsValid_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
] as const;
