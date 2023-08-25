export const IFundDataProviderRouter = [
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
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
    ],
    name: "getFundValueMetrics",
    outputs: [
      {
        internalType: "uint256",
        name: "timestamp_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "sharesSupply_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "gavInEth_",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "gavIsValid_",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "navInEth_",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "navIsValid_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
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
