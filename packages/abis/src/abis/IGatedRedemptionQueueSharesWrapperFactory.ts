export const IGatedRedemptionQueueSharesWrapperFactory = [
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
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_managers",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_redemptionAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_useDepositApprovals",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_useRedemptionApprovals",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_useTransferApprovals",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_depositMode",
        type: "uint8",
        internalType: "enum GatedRedemptionQueueSharesWrapperLibBase1.DepositMode",
      },
      {
        name: "_windowConfig",
        type: "tuple",
        internalType: "struct GatedRedemptionQueueSharesWrapperLibBase1.RedemptionWindowConfig",
        components: [
          {
            name: "firstWindowStart",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "frequency",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "duration",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "relativeSharesCap",
            type: "uint64",
            internalType: "uint64",
          },
        ],
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
        name: "caller",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "proxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
