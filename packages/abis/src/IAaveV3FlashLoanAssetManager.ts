export const IAaveV3FlashLoanAssetManager = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_aavePoolAddressProviderAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_aaveReferralCode",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "AAVE_REFERRAL_CODE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ADDRESSES_PROVIDER",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "POOL",
    inputs: [],
    outputs: [
      {
        name: "poolAddress_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "executeOperation",
    inputs: [
      {
        name: "_assets",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_amounts",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_premiums",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_initiator",
        type: "address",
        internalType: "address",
      },
      {
        name: "_params",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "success_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "flashLoan",
    inputs: [
      {
        name: "_assets",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_amounts",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_encodedCalls",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getBorrowedAssetsRecipient",
    inputs: [],
    outputs: [
      {
        name: "borrowedAssetsRecipient_",
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
    name: "init",
    inputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_borrowedAssetsRecipient",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BorrowedAssetsRecipientSet",
    inputs: [
      {
        name: "borrowedAssetsRecipient",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnerSet",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AaveV3FlashLoanAssetManager__ExecuteOperation__BalanceExceedsRepayment",
    inputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "AaveV3FlashLoanAssetManager__ExecuteOperation__UnauthorizedCaller",
    inputs: [],
  },
  {
    type: "error",
    name: "AaveV3FlashLoanAssetManager__ExecuteOperation__UnauthorizedInitiator",
    inputs: [],
  },
  {
    type: "error",
    name: "AaveV3FlashLoanAssetManager__FlashLoan__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "AaveV3FlashLoanAssetManager__Init__AlreadyInitialized",
    inputs: [],
  },
] as const;