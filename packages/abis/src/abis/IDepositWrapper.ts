export const IDepositWrapper = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_comptrollerProxy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_minSharesQuantity",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_exchange",
        type: "address",
      },
      {
        internalType: "address",
        name: "_exchangeApproveTarget",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_exchangeData",
        type: "bytes",
      },
      {
        internalType: "uint256",
        name: "_minInvestmentAmount",
        type: "uint256",
      },
    ],
    name: "exchangeEthAndBuyShares",
    outputs: [
      {
        internalType: "uint256",
        name: "sharesReceived_",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
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
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
