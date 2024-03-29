export const IArbitraryLoanTotalNominalDeltaOracleModule = [
  {
    type: "function",
    name: "calcFaceValue",
    inputs: [
      {
        name: "_totalBorrowed",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_totalRepaid",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "faceValue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "configure",
    inputs: [
      {
        name: "_configData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getOracleInfoForLoan",
    inputs: [
      {
        name: "_loan",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "oracleInfo_",
        type: "tuple",
        internalType: "struct ArbitraryLoanTotalNominalDeltaOracleModule.OracleInfo",
        components: [
          {
            name: "oracle",
            type: "address",
            internalType: "address",
          },
          {
            name: "stalenessThreshold",
            type: "uint32",
            internalType: "uint32",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "preBorrow",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "preClose",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "preReconcile",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_repayableLoanAssetAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [
      {
        name: "repayAmount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "preRepay",
    inputs: [
      {
        name: "_totalBorrowed",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_prevTotalRepaid",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_repayAmountInput",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "repayAmount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "receiveCallFromLoan",
    inputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "OracleSetForLoan",
    inputs: [
      {
        name: "loan",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oracle",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "stalenessThreshold",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
    ],
    anonymous: false,
  },
] as const;
