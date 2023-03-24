export const IProtocolFeeTracker = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundDeployer",
        type: "address",
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
        name: "nextFeeBpsDefault",
        type: "uint256",
      },
    ],
    name: "FeeBpsDefaultSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vaultProxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nextFeeBpsOverride",
        type: "uint256",
      },
    ],
    name: "FeeBpsOverrideSetForVault",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vaultProxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sharesAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "secondsPaid",
        type: "uint256",
      },
    ],
    name: "FeePaidForVault",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "vaultProxy",
        type: "address",
      },
    ],
    name: "InitializedForVault",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vaultProxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prevTimestamp",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "nextTimestamp",
        type: "uint256",
      },
    ],
    name: "LastPaidSetForVault",
    type: "event",
  },
  {
    inputs: [],
    name: "getFeeBpsDefault",
    outputs: [
      {
        internalType: "uint256",
        name: "feeBpsDefault_",
        type: "uint256",
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
    ],
    name: "getFeeBpsForVault",
    outputs: [
      {
        internalType: "uint256",
        name: "feeBps_",
        type: "uint256",
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
    ],
    name: "getFeeBpsOverrideForVault",
    outputs: [
      {
        internalType: "uint256",
        name: "feeBpsOverride_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFundDeployer",
    outputs: [
      {
        internalType: "address",
        name: "fundDeployer_",
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
        name: "_vaultProxy",
        type: "address",
      },
    ],
    name: "getLastPaidForVault",
    outputs: [
      {
        internalType: "uint256",
        name: "lastPaid_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOwner",
    outputs: [
      {
        internalType: "address",
        name: "owner_",
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
        name: "_vaultProxy",
        type: "address",
      },
    ],
    name: "initializeForVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "payFee",
    outputs: [
      {
        internalType: "uint256",
        name: "sharesDue_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_nextFeeBpsDefault",
        type: "uint256",
      },
    ],
    name: "setFeeBpsDefault",
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
        internalType: "uint256",
        name: "_nextFeeBpsOverride",
        type: "uint256",
      },
    ],
    name: "setFeeBpsOverrideForVault",
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
        internalType: "uint256",
        name: "_nextTimestamp",
        type: "uint256",
      },
    ],
    name: "setLastPaidForVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
