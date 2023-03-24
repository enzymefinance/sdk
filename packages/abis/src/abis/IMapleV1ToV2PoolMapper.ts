export const IMapleV1ToV2PoolMapper = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_dispacher",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [],
    name: "MigrationAllowed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "poolTokenV1",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "poolTokenV2",
        type: "address",
      },
    ],
    name: "PoolMapped",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "SnapshotsFrozen",
    type: "event",
  },
  {
    inputs: [],
    name: "allowMigration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "freezeSnapshots",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_poolTokenV1",
        type: "address",
      },
    ],
    name: "getPoolTokenV2FromPoolTokenV1",
    outputs: [
      {
        internalType: "address",
        name: "poolTokenV2_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_poolTokensV1",
        type: "address[]",
      },
      {
        internalType: "address[]",
        name: "_poolTokensV2",
        type: "address[]",
      },
    ],
    name: "mapPools",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_proxies",
        type: "address[]",
      },
    ],
    name: "migrateExternalPositions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "migrationIsAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "allowed_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_proxies",
        type: "address[]",
      },
    ],
    name: "snapshotExternalPositions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "snapshotsAreAllowed",
    outputs: [
      {
        internalType: "bool",
        name: "allowed_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
