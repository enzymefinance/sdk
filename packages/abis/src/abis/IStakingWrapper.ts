export const IStakingWrapper = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_for",
        type: "address",
      },
    ],
    name: "claimRewardsFor",
    outputs: [
      {
        internalType: "address[]",
        name: "rewardTokens_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "claimedAmounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_for",
        type: "address",
      },
    ],
    name: "claimRewardsForWithoutCheckpoint",
    outputs: [
      {
        internalType: "address[]",
        name: "rewardTokens_",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "claimedAmounts_",
        type: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "depositTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "getRewardTokenAtIndex",
    outputs: [
      {
        internalType: "address",
        name: "rewardToken_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardTokenCount",
    outputs: [
      {
        internalType: "uint256",
        name: "count_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardTokens",
    outputs: [
      {
        internalType: "address[]",
        name: "rewardTokens_",
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
        name: "_rewardToken",
        type: "address",
      },
    ],
    name: "getTotalHarvestDataForRewardToken",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "integral",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "lastCheckpointBalance",
            type: "uint128",
          },
        ],
        internalType: "struct IStakingWrapper.TotalHarvestData",
        name: "totalHarvestData_",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardToken",
        type: "address",
      },
    ],
    name: "getUserHarvestDataForRewardToken",
    outputs: [
      {
        components: [
          {
            internalType: "uint128",
            name: "integral",
            type: "uint128",
          },
          {
            internalType: "uint128",
            name: "claimableReward",
            type: "uint128",
          },
        ],
        internalType: "struct IStakingWrapper.UserHarvestData",
        name: "userHarvestData_",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isPaused",
    outputs: [
      {
        internalType: "bool",
        name: "isPaused_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bool",
        name: "_isPaused",
        type: "bool",
      },
    ],
    name: "togglePause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_onBehalf",
        type: "address",
      },
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawToOnBehalf",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "withdrawToWithoutCheckpoint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
