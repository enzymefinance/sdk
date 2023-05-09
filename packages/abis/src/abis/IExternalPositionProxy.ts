export const IExternalPositionProxy = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_typeId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_constructLib",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_constructData",
        type: "bytes",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    stateMutability: "payable",
    type: "fallback",
  },
  {
    inputs: [],
    name: "getExternalPositionType",
    outputs: [
      {
        internalType: "uint256",
        name: "externalPositionType_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getVaultProxy",
    outputs: [
      {
        internalType: "address",
        name: "vaultProxy_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "_data",
        type: "bytes",
      },
    ],
    name: "receiveCallFromVault",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;
