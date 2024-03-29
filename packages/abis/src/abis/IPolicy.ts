export const IPolicy = [
  {
    type: "function",
    name: "activateForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addFundSettings",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_encodedSettings",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "canDisable",
    inputs: [],
    outputs: [
      {
        name: "canDisable_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "identifier",
    inputs: [],
    outputs: [
      {
        name: "identifier_",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "implementedHooks",
    inputs: [],
    outputs: [
      {
        name: "implementedHooks_",
        type: "uint8[]",
        internalType: "enum IPolicyManager.PolicyHook[]",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "updateFundSettings",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_encodedSettings",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "validateRule",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_hook",
        type: "uint8",
        internalType: "enum IPolicyManager.PolicyHook",
      },
      {
        name: "_encodedArgs",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "isValid_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
] as const;
