export const IKilnStakingPositionLib = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_wethToken",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_exitedValidatorEthThreshold",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [],
    name: "PositionValuePaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [],
    name: "PositionValueUnpaused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "stakingContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "validatorAmount",
        type: "uint256",
      },
    ],
    name: "ValidatorsAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "stakingContractAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "validatorAmount",
        type: "uint256",
      },
    ],
    name: "ValidatorsRemoved",
    type: "event",
  },
  {
    inputs: [],
    name: "getDebtAssets",
    outputs: [
      {
        internalType: "address[]",
        name: "assets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getManagedAssets",
    outputs: [
      {
        internalType: "address[]",
        name: "assets_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getValidatorCount",
    outputs: [
      {
        internalType: "uint256",
        name: "validatorCount_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "positionValueIsPaused",
    outputs: [
      {
        internalType: "bool",
        name: "paused_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_actionData",
        type: "bytes",
      },
    ],
    name: "receiveCallFromVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
