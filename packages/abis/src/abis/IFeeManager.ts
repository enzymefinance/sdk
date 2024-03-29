export const IFeeManager = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_fundDeployer",
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
    name: "getEnabledFeesForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "enabledFees_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeeSharesOutstandingForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fee",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "sharesOutstanding_",
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
    name: "invokeHook",
    inputs: [
      {
        name: "_hook",
        type: "uint8",
        internalType: "enum IFeeManager.FeeHook",
      },
      {
        name: "_settlementData",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_gav",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "receiveCallFromComptroller",
    inputs: [
      {
        name: "",
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
        name: "_configData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "FeeEnabledForFund",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "fee",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "settingsData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeeSettledForFund",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "fee",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "settlementType",
        type: "uint8",
        indexed: true,
        internalType: "enum IFeeManager.SettlementType",
      },
      {
        name: "payer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "payee",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "sharesDue",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesOutstandingPaidForFund",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "fee",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "payee",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sharesDue",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
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
