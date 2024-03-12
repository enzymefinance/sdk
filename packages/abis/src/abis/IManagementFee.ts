export const IManagementFee = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_feeManager",
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
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
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
    name: "addFundSettings",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_settingsData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getFeeInfoForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "feeInfo_",
        type: "tuple",
        internalType: "struct ManagementFee.FeeInfo",
        components: [
          {
            name: "scaledPerSecondRate",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "lastSettled",
            type: "uint128",
            internalType: "uint128",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeeManager",
    inputs: [],
    outputs: [
      {
        name: "feeManager_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRecipientForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "recipient_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "payout",
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
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRecipientForFund",
    inputs: [
      {
        name: "_comptrollerProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_recipient",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "settle",
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
        type: "uint8",
        internalType: "enum IFeeManager.FeeHook",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "settlementType_",
        type: "uint8",
        internalType: "enum IFeeManager.SettlementType",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "sharesDue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "settlesOnHook",
    inputs: [
      {
        name: "_hook",
        type: "uint8",
        internalType: "enum IFeeManager.FeeHook",
      },
    ],
    outputs: [
      {
        name: "settles_",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "usesGav_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "update",
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
        name: "",
        type: "uint8",
        internalType: "enum IFeeManager.FeeHook",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updatesOnHook",
    inputs: [
      {
        name: "",
        type: "uint8",
        internalType: "enum IFeeManager.FeeHook",
      },
    ],
    outputs: [
      {
        name: "updates_",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "usesGav_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "ActivatedForMigratedFund",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FundSettingsAdded",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "scaledPerSecondRate",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RecipientSetForFund",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Settled",
    inputs: [
      {
        name: "comptrollerProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sharesQuantity",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "secondsSinceSettlement",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
