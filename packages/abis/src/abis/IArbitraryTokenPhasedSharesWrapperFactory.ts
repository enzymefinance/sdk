export const IArbitraryTokenPhasedSharesWrapperFactory = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_dispatcher",
        type: "address",
      },
      {
        internalType: "address",
        name: "_addressListRegistry",
        type: "address",
      },
      {
        internalType: "address",
        name: "_fundDeployerV4",
        type: "address",
      },
      {
        internalType: "address",
        name: "_protocolFeeRecipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_protocolFeeBps",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "proxy",
        type: "address",
      },
    ],
    name: "ProxyDeployed",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_depositToken",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "_allowedDepositorListId",
        type: "uint128",
      },
      {
        internalType: "bool",
        name: "_transfersAllowed",
        type: "bool",
      },
      {
        internalType: "uint128",
        name: "_totalDepositMax",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "_feeRecipient",
        type: "address",
      },
      {
        internalType: "uint16",
        name: "_feeBps",
        type: "uint16",
      },
      {
        internalType: "bool",
        name: "_feeExcludesDepositTokenPrincipal",
        type: "bool",
      },
      {
        internalType: "address",
        name: "_manager",
        type: "address",
      },
    ],
    name: "deploy",
    outputs: [
      {
        internalType: "address",
        name: "wrapperProxy_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
