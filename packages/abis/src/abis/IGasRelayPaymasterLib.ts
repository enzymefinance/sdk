export const IGasRelayPaymasterLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_wethToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_relayHub",
        type: "address",
        internalType: "address",
      },
      {
        name: "_trustedForwarder",
        type: "address",
        internalType: "address",
      },
      {
        name: "_depositCooldown",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_depositMaxTotal",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_relayFeeMaxBase",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_relayFeeMaxPercent",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deposit",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getGasAndDataLimits",
    inputs: [],
    outputs: [
      {
        name: "limits_",
        type: "tuple",
        internalType: "struct IGsnPaymaster.GasAndDataLimits",
        components: [
          {
            name: "acceptanceBudget",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "preRelayedCallGasLimit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "postRelayedCallGasLimit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "calldataSizeLimit",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getHubAddr",
    inputs: [],
    outputs: [
      {
        name: "relayHub_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastDepositTimestamp",
    inputs: [],
    outputs: [
      {
        name: "lastDepositTimestamp_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getParentComptroller",
    inputs: [],
    outputs: [
      {
        name: "parentComptroller_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getParentVault",
    inputs: [],
    outputs: [
      {
        name: "parentVault_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRelayHubDeposit",
    inputs: [],
    outputs: [
      {
        name: "depositBalance_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getWethToken",
    inputs: [],
    outputs: [
      {
        name: "wethToken_",
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
        name: "_vault",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "postRelayedCall",
    inputs: [
      {
        name: "_context",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_success",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_relayData",
        type: "tuple",
        internalType: "struct IGsnTypes.RelayData",
        components: [
          {
            name: "gasPrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "pctRelayFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "baseRelayFee",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "relayWorker",
            type: "address",
            internalType: "address",
          },
          {
            name: "paymaster",
            type: "address",
            internalType: "address",
          },
          {
            name: "forwarder",
            type: "address",
            internalType: "address",
          },
          {
            name: "paymasterData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "clientId",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "preRelayedCall",
    inputs: [
      {
        name: "_relayRequest",
        type: "tuple",
        internalType: "struct IGsnTypes.RelayRequest",
        components: [
          {
            name: "request",
            type: "tuple",
            internalType: "struct IGsnForwarder.ForwardRequest",
            components: [
              {
                name: "from",
                type: "address",
                internalType: "address",
              },
              {
                name: "to",
                type: "address",
                internalType: "address",
              },
              {
                name: "value",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "gas",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "nonce",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "data",
                type: "bytes",
                internalType: "bytes",
              },
              {
                name: "validUntil",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
          {
            name: "relayData",
            type: "tuple",
            internalType: "struct IGsnTypes.RelayData",
            components: [
              {
                name: "gasPrice",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "pctRelayFee",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "baseRelayFee",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "relayWorker",
                type: "address",
                internalType: "address",
              },
              {
                name: "paymaster",
                type: "address",
                internalType: "address",
              },
              {
                name: "forwarder",
                type: "address",
                internalType: "address",
              },
              {
                name: "paymasterData",
                type: "bytes",
                internalType: "bytes",
              },
              {
                name: "clientId",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "context_",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "rejectOnRecipientRevert_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "trustedForwarder",
    inputs: [],
    outputs: [
      {
        name: "trustedForwarder_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "versionPaymaster",
    inputs: [],
    outputs: [
      {
        name: "versionString_",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdrawBalance",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "Deposited",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TransactionRelayed",
    inputs: [
      {
        name: "authorizer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "invokedSelector",
        type: "bytes4",
        indexed: false,
        internalType: "bytes4",
      },
      {
        name: "successful",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Withdrawn",
    inputs: [
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
