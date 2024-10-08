export const ITransferAssetsAdapter = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_integrationManager",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "parseAssetsForAction",
    inputs: [
      {
        name: "_vaultProxy",
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
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "transfer",
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
        name: "_assetData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "error",
    name: "TransferAssetsAdapter__ParseAssetsForAction__InvalidSelector",
    inputs: [],
  },
] as const;
