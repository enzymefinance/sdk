export const IStakeWiseV3StakingPositionParser = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_stakeWiseV3VaultsRegistryAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wethAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "STAKEWISE_V3_VAULT_REGISTRY",
    outputs: [
      {
        internalType: "contract IStakeWiseV3VaultsRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
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
        internalType: "uint256",
        name: "_actionId",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "_encodedActionArgs",
        type: "bytes",
      },
    ],
    name: "parseAssetsForAction",
    outputs: [
      {
        internalType: "address[]",
        name: "assetsToTransfer_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amountsToTransfer_",
        type: "uint256[]",
      },
      {
        internalType: "address[]",
        name: "assetsToReceive_",
        type: "address[]",
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
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "parseInitArgs",
    outputs: [
      {
        internalType: "bytes",
        name: "initArgs_",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
] as const;
