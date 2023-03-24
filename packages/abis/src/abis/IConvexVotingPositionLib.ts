export const IConvexVotingPositionLib = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_vlCvx",
        type: "address",
      },
      {
        internalType: "address",
        name: "_vlCvxExtraRewards",
        type: "address",
      },
      {
        internalType: "address",
        name: "_cvxCrvStaking",
        type: "address",
      },
      {
        internalType: "address",
        name: "_cvxToken",
        type: "address",
      },
      {
        internalType: "address",
        name: "_snapshotDelegateRegistry",
        type: "address",
      },
      {
        internalType: "address",
        name: "_votiumMultiMerkleStash",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
    stateMutability: "nonpayable",
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
    stateMutability: "nonpayable",
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
