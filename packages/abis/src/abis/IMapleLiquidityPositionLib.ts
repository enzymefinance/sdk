export const IMapleLiquidityPositionLib = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_mapleV1ToV2PoolMapper",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lendingPoolV1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "PoolTokenV1PreMigrationValueSnapshotted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lendingPool",
        type: "address",
      },
    ],
    name: "UsedLendingPoolAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lendingPool",
        type: "address",
      },
    ],
    name: "UsedLendingPoolRemoved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lendingPoolV2",
        type: "address",
      },
    ],
    name: "UsedLendingPoolV2Added",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "lendingPoolV2",
        type: "address",
      },
    ],
    name: "UsedLendingPoolV2Removed",
    type: "event",
  },
  {
    inputs: [],
    name: "getDebtAssets",
    outputs: [
      {
        internalType: "address[]",
        name: "assets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getManagedAssets",
    outputs: [
      {
        internalType: "address[]",
        name: "assets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_poolV1",
        type: "address",
      },
    ],
    name: "getPreMigrationValueSnapshotOfPoolTokenV1",
    outputs: [
      {
        internalType: "uint256",
        name: "valueSnapshot_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUsedLendingPoolsV1",
    outputs: [
      {
        internalType: "address[]",
        name: "poolsV1_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUsedLendingPoolsV2",
    outputs: [
      {
        internalType: "address[]",
        name: "poolsV2_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_poolV2",
        type: "address",
      },
    ],
    name: "isUsedLendingPoolV2",
    outputs: [
      {
        internalType: "bool",
        name: "isUsed_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "migratePoolsV1ToV2",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_actionData",
        type: "bytes",
      },
    ],
    name: "receiveCallFromVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "snapshotPoolTokenV1BalanceValues",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
