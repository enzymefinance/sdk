export const ISharePriceThrottledAssetManagerLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_addressListRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "_gsnTrustedForwardersAddressListId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_fundValueCalculatorRouter",
        type: "address",
        internalType: "contract IFundValueCalculator",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "executeCalls",
    inputs: [
      {
        name: "_calls",
        type: "tuple[]",
        internalType: "struct IMultiCallAccountMixin.Call[]",
        components: [
          {
            name: "target",
            type: "address",
            internalType: "address",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getLossTolerance",
    inputs: [],
    outputs: [
      {
        name: "lossTolerance_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLossTolerancePeriodDuration",
    inputs: [],
    outputs: [
      {
        name: "lossTolerancePeriodDuration_",
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
    name: "getShutdowner",
    inputs: [],
    outputs: [
      {
        name: "shutdowner_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getThrottle",
    inputs: [],
    outputs: [
      {
        name: "throttle_",
        type: "tuple",
        internalType: "struct ISharePriceThrottledAssetManagerLib.Throttle",
        components: [
          {
            name: "cumulativeLoss",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "lastLossTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVaultProxyAddress",
    inputs: [],
    outputs: [
      {
        name: "vaultProxyAddress_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "init",
    inputs: [
      {
        name: "_owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "_vaultProxyAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_lossTolerance",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_lossTolerancePeriodDuration",
        type: "uint32",
        internalType: "uint32",
      },
      {
        name: "_shutdowner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "shutdown",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "lossTolerance",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
      {
        name: "lossTolerancePeriodDuration",
        type: "uint32",
        indexed: false,
        internalType: "uint32",
      },
      {
        name: "shutDowner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OwnerSet",
    inputs: [
      {
        name: "nextOwner",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ThrottleUpdated",
    inputs: [
      {
        name: "nextCumulativeLoss",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AlreadyInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "ExceedsOneHundredPercent",
    inputs: [],
  },
  {
    type: "error",
    name: "ToleranceExceeded",
    inputs: [
      {
        name: "cumulativeLoss",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "Unauthorized",
    inputs: [],
  },
] as const;
