export const IAaveV3DebtPositionLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_dataProvider",
        type: "address",
        internalType: "contract IAaveV3ProtocolDataProvider",
      },
      {
        name: "_lendingPoolAddressProvider",
        type: "address",
        internalType: "contract IAaveV3PoolAddressProvider",
      },
      {
        name: "_referralCode",
        type: "uint16",
        internalType: "uint16",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "assetIsBorrowed",
    inputs: [
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "isBorrowed_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "assetIsCollateral",
    inputs: [
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "isCollateral_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDebtAssets",
    inputs: [],
    outputs: [
      {
        name: "assets_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "amounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDebtTokenForBorrowedAsset",
    inputs: [
      {
        name: "_borrowedAsset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "debtToken_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getManagedAssets",
    inputs: [],
    outputs: [
      {
        name: "assets_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "amounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "init",
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
    type: "function",
    name: "receiveCallFromVault",
    inputs: [
      {
        name: "_actionData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BorrowedAssetAdded",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BorrowedAssetRemoved",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CollateralAssetAdded",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CollateralAssetRemoved",
    inputs: [
      {
        name: "asset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
