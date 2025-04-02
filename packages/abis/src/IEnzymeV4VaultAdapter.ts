export const IEnzymeV4VaultAdapter = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_integrationManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fundDeployerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_dispatcher",
        type: "address",
        internalType: "contract IDispatcher",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "DISPATCHER",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IDispatcher",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "FUND_DEPLOYER_ADDRESS",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "action",
    inputs: [
      {
        name: "_vaultProxyAddress",
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
    type: "error",
    name: "EnzymeV4VaultAdapter__InvalidAction",
    inputs: [],
  },
  {
    type: "error",
    name: "EnzymeV4VaultAdapter__InvalidVaultProxy",
    inputs: [],
  },
] as const;
