export const IMorphoBlueFlashLoanAssetManager = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_morphoBlueAddress",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "flashLoan",
    inputs: [
      {
        name: "_assetAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_calls",
        type: "tuple[]",
        internalType: "struct IMorphoBlueFlashLoanAssetManager.Call[]",
        components: [
          {
            name: "target",
            type: "address",
            internalType: "address",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
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
    type: "function",
    name: "onMorphoFlashLoan",
    inputs: [
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_data",
        type: "bytes",
        internalType: "bytes",
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
    name: "MorphoBlueFlashLoanAssetManager__FlashLoan__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "MorphoBlueFlashLoanAssetManager__Init__AlreadyInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "MorphoBlueFlashLoanAssetManager__OnMorphoFlashLoan__UnauthorizedCaller",
    inputs: [],
  },
  {
    type: "error",
    name: "MorphoBlueFlashLoanAssetManager__OnMorphoFlashLoan__UnauthorizedInitiator",
    inputs: [],
  },
] as const;
