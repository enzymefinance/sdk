export const IArbitraryTokenPhasedSharesWrapperProxy = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_constructData",
        type: "bytes",
      },
      {
        internalType: "address",
        name: "_lib",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
] as const;
