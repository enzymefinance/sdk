export const IKilnStakingPositionParser = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_addressListRegistry",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_stakingContractsListId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_weth",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ADDRESS_LIST_REGISTRY_CONTRACT",
    outputs: [
      {
        internalType: "contract AddressListRegistry",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ETH_AMOUNT_PER_NODE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "STAKING_CONTRACTS_LIST_ID",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WETH_TOKEN",
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
        name: "_externalPosition",
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
    stateMutability: "nonpayable",
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
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
