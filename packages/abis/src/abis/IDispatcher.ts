export const IDispatcher = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelMigration",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_bypassFailure",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deployVaultProxy",
    inputs: [
      {
        name: "_vaultLib",
        type: "address",
        internalType: "address",
      },
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_vaultAccessor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fundName",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
      {
        name: "vaultProxy_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeMigration",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_bypassFailure",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getCurrentFundDeployer",
    inputs: [],
    outputs: [
      {
        name: "currentFundDeployer_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFundDeployerForVaultProxy",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "fundDeployer_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMigrationRequestDetailsForVaultProxy",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "nextFundDeployer_",
        type: "address",
        internalType: "address",
      },
      {
        name: "nextVaultAccessor_",
        type: "address",
        internalType: "address",
      },
      {
        name: "nextVaultLib_",
        type: "address",
        internalType: "address",
      },
      {
        name: "executableTimestamp_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMigrationTimelock",
    inputs: [],
    outputs: [
      {
        name: "migrationTimelock_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNominatedOwner",
    inputs: [],
    outputs: [
      {
        name: "nominatedOwner_",
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
    name: "getSharesTokenSymbol",
    inputs: [],
    outputs: [
      {
        name: "sharesTokenSymbol_",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTimelockRemainingForMigrationRequest",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "secondsRemaining_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasExecutableMigrationRequest",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "hasExecutableRequest_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasMigrationRequest",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "hasMigrationRequest_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeNominatedOwner",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCurrentFundDeployer",
    inputs: [
      {
        name: "_nextFundDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMigrationTimelock",
    inputs: [
      {
        name: "_nextTimelock",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setNominatedOwner",
    inputs: [
      {
        name: "_nextNominatedOwner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSharesTokenSymbol",
    inputs: [
      {
        name: "_nextSymbol",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "signalMigration",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_nextVaultAccessor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_nextVaultLib",
        type: "address",
        internalType: "address",
      },
      {
        name: "_bypassFailure",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CurrentFundDeployerSet",
    inputs: [
      {
        name: "prevFundDeployer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "nextFundDeployer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MigrationCancelled",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "prevFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextVaultAccessor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "nextVaultLib",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "executableTimestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MigrationExecuted",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "prevFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextVaultAccessor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "nextVaultLib",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "executableTimestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MigrationInCancelHookFailed",
    inputs: [
      {
        name: "failureReturnData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "prevFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextVaultAccessor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "nextVaultLib",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MigrationOutHookFailed",
    inputs: [
      {
        name: "failureReturnData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "hook",
        type: "uint8",
        indexed: false,
        internalType: "enum IMigrationHookHandler.MigrationOutHook",
      },
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "prevFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextVaultAccessor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "nextVaultLib",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MigrationSignaled",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "prevFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextFundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextVaultAccessor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "nextVaultLib",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "executableTimestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MigrationTimelockSet",
    inputs: [
      {
        name: "prevTimelock",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "nextTimelock",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NominatedOwnerRemoved",
    inputs: [
      {
        name: "nominatedOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NominatedOwnerSet",
    inputs: [
      {
        name: "nominatedOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "prevOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesTokenSymbolSet",
    inputs: [
      {
        name: "_nextSymbol",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VaultProxyDeployed",
    inputs: [
      {
        name: "fundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "vaultProxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "vaultLib",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "vaultAccessor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "fundName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
] as const;
