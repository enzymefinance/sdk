export const IAllowedRedeemersForSpecificAssetsPolicy = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_policyManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_addressListRegistry",
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
        name: "comptrollerProxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "listIds",
        type: "uint256[]",
      },
    ],
    name: "ListsSetForFund",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "activateForFund",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_comptrollerProxy",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_encodedSettings",
        type: "bytes",
      },
    ],
    name: "addFundSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "canDisable",
    outputs: [
      {
        internalType: "bool",
        name: "canDisable_",
        type: "bool",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getAddressListRegistry",
    outputs: [
      {
        internalType: "address",
        name: "addressListRegistry_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_comptrollerProxy",
        type: "address",
      },
    ],
    name: "getListIdsForFund",
    outputs: [
      {
        internalType: "uint256[]",
        name: "listIds_",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPolicyManager",
    outputs: [
      {
        internalType: "address",
        name: "policyManager_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "identifier",
    outputs: [
      {
        internalType: "string",
        name: "identifier_",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "implementedHooks",
    outputs: [
      {
        internalType: "enum IPolicyManager.PolicyHook[]",
        name: "implementedHooks_",
        type: "uint8[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "updateFundSettings",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_comptrollerProxy",
        type: "address",
      },
      {
        internalType: "enum IPolicyManager.PolicyHook",
        name: "",
        type: "uint8",
      },
      {
        internalType: "bytes",
        name: "_encodedArgs",
        type: "bytes",
      },
    ],
    name: "validateRule",
    outputs: [
      {
        internalType: "bool",
        name: "isValid_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
