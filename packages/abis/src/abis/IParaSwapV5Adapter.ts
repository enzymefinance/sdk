export const IParaSwapV5Adapter = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_integrationManager",
        type: "address",
      },
      {
        internalType: "address",
        name: "_augustusSwapper",
        type: "address",
      },
      {
        internalType: "address",
        name: "_tokenTransferProxy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_feePartner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_feePercent",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "reason",
        type: "bytes",
      },
    ],
    name: "MultipleOrdersItemFailed",
    type: "event",
  },
  {
    inputs: [],
    name: "CLAIM_REWARDS_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LEND_AND_STAKE_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LEND_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "REDEEM_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKE_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TAKE_MULTIPLE_ORDERS_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TAKE_ORDER_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKE_AND_REDEEM_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "UNSTAKE_SELECTOR",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getIntegrationManager",
    outputs: [
      {
        internalType: "address",
        name: "integrationManager_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getParaSwapV5AugustusSwapper",
    outputs: [
      {
        internalType: "address",
        name: "augustusSwapper_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getParaSwapV5TokenTransferProxy",
    outputs: [
      {
        internalType: "address",
        name: "tokenTransferProxy_",
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
        name: "",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_selector",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "_actionData",
        type: "bytes",
      },
    ],
    name: "parseAssetsForAction",
    outputs: [
      {
        internalType: "enum IIntegrationManager.SpendAssetsHandleType",
        name: "spendAssetsHandleType_",
        type: "uint8",
      },
      {
        internalType: "address[]",
        name: "spendAssets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "spendAssetAmounts_",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "incomingAssets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "minIncomingAssetAmounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_actionData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "_assetData",
        type: "bytes",
      },
    ],
    name: "takeMultipleOrders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_actionData",
        type: "bytes",
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "takeOrder",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_orderData",
        type: "bytes",
      },
    ],
    name: "takeOrderAndValidateIncoming",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
