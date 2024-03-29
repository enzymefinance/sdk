export const IProtocolFeeTracker = [
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
    name: "getFeeBpsDefault",
    inputs: [],
    outputs: [
      {
        name: "feeBpsDefault_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeeBpsForVault",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "feeBps_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeeBpsOverrideForVault",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "feeBpsOverride_",
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
    name: "getLastPaidForVault",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "lastPaid_",
        type: "uint256",
        internalType: "uint256",
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
    name: "initializeForVault",
    inputs: [
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
    name: "payFee",
    inputs: [],
    outputs: [
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
    name: "setFeeBpsDefault",
    inputs: [
      {
        name: "_nextFeeBpsDefault",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setFeeBpsOverrideForVault",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_nextFeeBpsOverride",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setLastPaidForVault",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_nextTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "FeeBpsDefaultSet",
    inputs: [
      {
        name: "nextFeeBpsDefault",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeeBpsOverrideSetForVault",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "nextFeeBpsOverride",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "FeePaidForVault",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sharesAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "secondsPaid",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "InitializedForVault",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LastPaidSetForVault",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "prevTimestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "nextTimestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
