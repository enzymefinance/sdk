export const IFundDeployer = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_dispatcher",
        type: "address",
        internalType: "address",
      },
      {
        name: "_gasRelayPaymasterFactory",
        type: "address",
        internalType: "address",
      },
    ],
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
        name: "_bypassPrevReleaseFailure",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelReconfiguration",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createMigrationRequest",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_denominationAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_sharesActionTimelock",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_feeManagerConfigData",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_policyManagerConfigData",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_bypassPrevReleaseFailure",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [
      {
        name: "comptrollerProxy_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createNewFund",
    inputs: [
      {
        name: "_fundOwner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fundName",
        type: "string",
        internalType: "string",
      },
      {
        name: "_fundSymbol",
        type: "string",
        internalType: "string",
      },
      {
        name: "_denominationAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_sharesActionTimelock",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_feeManagerConfigData",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_policyManagerConfigData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "comptrollerProxy_",
        type: "address",
        internalType: "address",
      },
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
    name: "createReconfigurationRequest",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_denominationAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_sharesActionTimelock",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_feeManagerConfigData",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_policyManagerConfigData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "comptrollerProxy_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deregisterBuySharesOnBehalfCallers",
    inputs: [
      {
        name: "_callers",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deregisterVaultCalls",
    inputs: [
      {
        name: "_contracts",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_selectors",
        type: "bytes4[]",
        internalType: "bytes4[]",
      },
      {
        name: "_dataHashes",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
    ],
    outputs: [],
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
        name: "_bypassPrevReleaseFailure",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeReconfiguration",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getComptrollerLib",
    inputs: [],
    outputs: [
      {
        name: "comptrollerLib_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCreator",
    inputs: [],
    outputs: [
      {
        name: "creator_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDispatcher",
    inputs: [],
    outputs: [
      {
        name: "dispatcher_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGasLimitsForDestructCall",
    inputs: [],
    outputs: [
      {
        name: "deactivateFeeManagerGasLimit_",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "payProtocolFeeGasLimit_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGasRelayPaymasterFactory",
    inputs: [],
    outputs: [
      {
        name: "gasRelayPaymasterFactory_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGasRelayTrustedForwarder",
    inputs: [],
    outputs: [
      {
        name: "trustedForwarder_",
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
    name: "getProtocolFeeTracker",
    inputs: [],
    outputs: [
      {
        name: "protocolFeeTracker_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getReconfigurationRequestForVaultProxy",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "reconfigurationRequest_",
        type: "tuple",
        internalType: "struct IFundDeployer.ReconfigurationRequest",
        components: [
          {
            name: "nextComptrollerProxy",
            type: "address",
            internalType: "address",
          },
          {
            name: "executableTimestamp",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getReconfigurationTimelock",
    inputs: [],
    outputs: [
      {
        name: "reconfigurationTimelock_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVaultLib",
    inputs: [],
    outputs: [
      {
        name: "vaultLib_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "hasReconfigurationRequest",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "hasReconfigurationRequest_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "invokeMigrationInCancelHook",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "_nextComptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "invokeMigrationOutHook",
    inputs: [
      {
        name: "_hook",
        type: "uint8",
        internalType: "enum IMigrationHookHandler.MigrationOutHook",
      },
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isAllowedBuySharesOnBehalfCaller",
    inputs: [
      {
        name: "_who",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "isAllowed_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isAllowedVaultCall",
    inputs: [
      {
        name: "_contract",
        type: "address",
        internalType: "address",
      },
      {
        name: "_selector",
        type: "bytes4",
        internalType: "bytes4",
      },
      {
        name: "_dataHash",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "isAllowed_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isRegisteredVaultCall",
    inputs: [
      {
        name: "_contract",
        type: "address",
        internalType: "address",
      },
      {
        name: "_selector",
        type: "bytes4",
        internalType: "bytes4",
      },
      {
        name: "_dataHash",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "isRegistered_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "registerBuySharesOnBehalfCallers",
    inputs: [
      {
        name: "_callers",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "registerVaultCalls",
    inputs: [
      {
        name: "_contracts",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_selectors",
        type: "bytes4[]",
        internalType: "bytes4[]",
      },
      {
        name: "_dataHashes",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "releaseIsLive",
    inputs: [],
    outputs: [
      {
        name: "isLive_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setComptrollerLib",
    inputs: [
      {
        name: "_comptrollerLib",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGasLimitsForDestructCall",
    inputs: [
      {
        name: "_nextDeactivateFeeManagerGasLimit",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_nextPayProtocolFeeGasLimit",
        type: "uint32",
        internalType: "uint32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setProtocolFeeTracker",
    inputs: [
      {
        name: "_protocolFeeTracker",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setReconfigurationTimelock",
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
    name: "setReleaseLive",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setVaultLib",
    inputs: [
      {
        name: "_vaultLib",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BuySharesOnBehalfCallerDeregistered",
    inputs: [
      {
        name: "caller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BuySharesOnBehalfCallerRegistered",
    inputs: [
      {
        name: "caller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ComptrollerLibSet",
    inputs: [
      {
        name: "comptrollerLib",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ComptrollerProxyDeployed",
    inputs: [
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "denominationAsset",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sharesActionTimelock",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GasLimitsForDestructCallSet",
    inputs: [
      {
        name: "nextDeactivateFeeManagerGasLimit",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "nextPayProtocolFeeGasLimit",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MigrationRequestCreated",
    inputs: [
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NewFundCreated",
    inputs: [
      {
        name: "creator",
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
        name: "comptrollerProxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProtocolFeeTrackerSet",
    inputs: [
      {
        name: "protocolFeeTracker",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ReconfigurationRequestCancelled",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextComptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ReconfigurationRequestCreated",
    inputs: [
      {
        name: "creator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "comptrollerProxy",
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
    name: "ReconfigurationRequestExecuted",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "prevComptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextComptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ReconfigurationTimelockSet",
    inputs: [
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
    name: "ReleaseIsLive",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "VaultCallDeregistered",
    inputs: [
      {
        name: "contractAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "selector",
        type: "bytes4",
        indexed: false,
        internalType: "bytes4",
      },
      {
        name: "dataHash",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VaultCallRegistered",
    inputs: [
      {
        name: "contractAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "selector",
        type: "bytes4",
        indexed: false,
        internalType: "bytes4",
      },
      {
        name: "dataHash",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VaultLibSet",
    inputs: [
      {
        name: "vaultLib",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
