export const IKilnStakingPositionParser = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_addressListRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "_stakingContractsListId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_weth",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ADDRESS_LIST_REGISTRY_CONTRACT",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IAddressListRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "ETH_AMOUNT_PER_NODE",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "STAKING_CONTRACTS_LIST_ID",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "WETH_TOKEN",
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
    name: "parseAssetsForAction",
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
        name: "_encodedActionArgs",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "assetsToTransfer_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "amountsToTransfer_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "assetsToReceive_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "parseInitArgs",
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
    outputs: [
      {
        name: "initArgs_",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "pure",
  },
] as const;
