export const IOnlyUntrackDustOrPricelessAssetsPolicy = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_policyManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fundDeployer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_valueInterpreter",
        type: "address",
        internalType: "address",
      },
      {
        name: "_wethToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_pricelessAssetBypassTimelock",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_pricelessAssetBypassTimeLimit",
        type: "uint256",
        internalType: "uint256",
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
        name: "",
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
    name: "assetIsBypassableForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "isBypassable_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
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
    name: "getAssetBypassWindowStartForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "windowStart_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDustToleranceInWeth",
    inputs: [],
    outputs: [
      {
        name: "dustToleranceInWeth_",
        type: "uint256",
        internalType: "uint256",
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
    name: "getPricelessAssetBypassTimeLimit",
    inputs: [],
    outputs: [
      {
        name: "timeLimit_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPricelessAssetBypassTimelock",
    inputs: [],
    outputs: [
      {
        name: "timelock_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPricelessAssetBypassValueInterpreter",
    inputs: [],
    outputs: [
      {
        name: "valueInterpreter_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPricelessAssetBypassWethToken",
    inputs: [],
    outputs: [
      {
        name: "wethToken_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
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
    name: "setDustToleranceInWeth",
    inputs: [
      {
        name: "_nextDustToleranceInWeth",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "startAssetBypassTimelock",
    inputs: [
      {
        name: "_asset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateFundSettings",
    inputs: [
      {
        name: "",
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
    name: "validateRule",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
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
  {
    type: "event",
    name: "DustToleranceInWethSet",
    inputs: [
      {
        name: "nextDustToleranceInWeth",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PricelessAssetBypassed",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
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
    name: "PricelessAssetTimelockStarted",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
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
