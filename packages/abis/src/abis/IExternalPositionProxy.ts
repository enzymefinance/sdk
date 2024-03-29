export const IExternalPositionProxy = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_typeId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_constructLib",
        type: "address",
        internalType: "address",
      },
      {
        name: "_constructData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "fallback",
    stateMutability: "payable",
  },
  {
    type: "receive",
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "getExternalPositionType",
    inputs: [],
    outputs: [
      {
        name: "externalPositionType_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getVaultProxy",
    inputs: [],
    outputs: [
      {
        name: "vaultProxy_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "receiveCallFromVault",
    inputs: [
      {
        name: "_data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
] as const;
