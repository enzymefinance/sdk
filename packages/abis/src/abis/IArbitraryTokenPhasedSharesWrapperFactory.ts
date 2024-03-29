export const IArbitraryTokenPhasedSharesWrapperFactory = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_dispatcher",
        type: "address",
        internalType: "address",
      },
      {
        name: "_addressListRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fundDeployerV4",
        type: "address",
        internalType: "address",
      },
      {
        name: "_protocolFeeRecipient",
        type: "address",
        internalType: "address",
      },
      {
        name: "_protocolFeeBps",
        type: "uint256",
        internalType: "uint256",
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
        name: "_depositToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_allowedDepositorListId",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "_transfersAllowed",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_totalDepositMax",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "_feeRecipient",
        type: "address",
        internalType: "address",
      },
      {
        name: "_feeBps",
        type: "uint16",
        internalType: "uint16",
      },
      {
        name: "_feeExcludesDepositTokenPrincipal",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "_manager",
        type: "address",
        internalType: "address",
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
