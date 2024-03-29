export const ISharesSplitterLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_globalConfigProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_initializer",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimToken",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "claimedAmount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "claimTokenAmountTo",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "claimedAmount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getSplitPercentageForUser",
    inputs: [
      {
        name: "_user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "splitPercentage_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenBalClaimableForUser",
    inputs: [
      {
        name: "_user",
        type: "address",
        internalType: "address",
      },
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "balClaimable_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTokenBalClaimedForUser",
    inputs: [
      {
        name: "_user",
        type: "address",
        internalType: "address",
      },
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "balClaimed_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getTotalTokenBalClaimed",
    inputs: [
      {
        name: "_token",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "totalBalClaimed_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "init",
    inputs: [
      {
        name: "_users",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_splitPercentages",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeemShares",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_redeemContract",
        type: "address",
        internalType: "address",
      },
      {
        name: "_redeemSelector",
        type: "bytes4",
        internalType: "bytes4",
      },
      {
        name: "_redeemData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "sharesRedeemed_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "SplitPercentageSet",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "percentage",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenClaimed",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "token",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
