export const IUniswapV3Adapter = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_integrationManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_router",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "CLAIM_REWARDS_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "LEND_AND_STAKE_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "LEND_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "REDEEM_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "STAKE_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "TAKE_MULTIPLE_ORDERS_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "TAKE_ORDER_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "UNSTAKE_AND_REDEEM_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "UNSTAKE_SELECTOR",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getIntegrationManager",
    inputs: [],
    outputs: [
      {
        name: "integrationManager_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUniswapV3Router",
    inputs: [],
    outputs: [
      {
        name: "router_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "parseAssetsForAction",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "_selector",
        type: "bytes4",
        internalType: "bytes4",
      },
      {
        name: "_actionData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "spendAssetsHandleType_",
        type: "uint8",
        internalType: "enum IIntegrationManager.SpendAssetsHandleType",
      },
      {
        name: "spendAssets_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "spendAssetAmounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "incomingAssets_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "minIncomingAssetAmounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "takeOrder",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_actionData",
        type: "bytes",
        internalType: "bytes",
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
] as const;
