export const IAuraBalancerV2LpStakingWrapperFactory = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_dispatcher",
        type: "address",
        internalType: "address",
      },
      {
        name: "_implementation",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deploy",
    inputs: [
      {
        name: "_pid",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "wrapperProxy_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getCurveLpTokenForWrapper",
    inputs: [
      {
        name: "_wrapper",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "lpToken_",
        type: "address",
        internalType: "address",
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
    name: "getWrapperForConvexPool",
    inputs: [
      {
        name: "_pid",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "wrapper_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "implementation",
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
    name: "pauseWrappers",
    inputs: [
      {
        name: "_wrappers",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setImplementation",
    inputs: [
      {
        name: "_nextImplementation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unpauseWrappers",
    inputs: [
      {
        name: "_wrappers",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ImplementationSet",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ProxyDeployed",
    inputs: [
      {
        name: "proxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "WrapperDeployed",
    inputs: [
      {
        name: "pid",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "wrapperProxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "curveLpToken",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
