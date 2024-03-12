export const IExternalPositionManager = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_fundDeployer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_externalPositionFactory",
        type: "address",
        internalType: "address",
      },
      {
        name: "_policyManager",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "activateForFund",
    inputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deactivateForFund",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getExternalPositionFactory",
    inputs: [],
    outputs: [
      {
        name: "externalPositionFactory_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getExternalPositionLibForType",
    inputs: [
      {
        name: "_typeId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "lib_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getExternalPositionParserForType",
    inputs: [
      {
        name: "_typeId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "parser_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFundDeployer",
    inputs: [],
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
    name: "getPolicyManager",
    inputs: [],
    outputs: [
      {
        name: "policyManager_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVaultProxyForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "vaultProxy_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "receiveCallFromComptroller",
    inputs: [
      {
        name: "_caller",
        type: "address",
        internalType: "address",
      },
      {
        name: "_actionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_callArgs",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setConfigForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
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
    name: "updateExternalPositionTypesInfo",
    inputs: [
      {
        name: "_typeIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "_libs",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_parsers",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CallOnExternalPositionExecutedForFund",
    inputs: [
      {
        name: "caller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "externalPosition",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "actionId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "actionArgs",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "assetsToTransfer",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "amountsToTransfer",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
      {
        name: "assetsToReceive",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ExternalPositionDeployedForFund",
    inputs: [
      {
        name: "comptrollerProxy",
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
        name: "externalPosition",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "externalPositionTypeId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "data",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ExternalPositionTypeInfoUpdated",
    inputs: [
      {
        name: "typeId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "lib",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "parser",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ValidatedVaultProxySetForFund",
    inputs: [
      {
        name: "comptrollerProxy",
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
    ],
    anonymous: false,
  },
] as const;
