export const IProtocolFeeReserveLib = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "MlnTokenBalanceWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nextProtocolFeeReserveLib",
        type: "address",
      },
    ],
    name: "ProtocolFeeReserveLibSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "vaultProxy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sharesAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mlnValue",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mlnBurned",
        type: "uint256",
      },
    ],
    name: "SharesBoughtBack",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_sharesAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_mlnValue",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "buyBackSharesViaTrustedVaultProxy",
    outputs: [
      {
        internalType: "uint256",
        name: "mlnAmountToBurn_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_contract",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_callData",
        type: "bytes",
      },
    ],
    name: "callOnContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getDispatcher",
    outputs: [
      {
        internalType: "address",
        name: "dispatcher_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getProtocolFeeReserveLib",
    outputs: [
      {
        internalType: "address",
        name: "protocolFeeReserveLib_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_dispatcher",
        type: "address",
      },
    ],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "uuid_",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_nextProtocolFeeReserveLib",
        type: "address",
      },
    ],
    name: "setProtocolFeeReserveLib",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
