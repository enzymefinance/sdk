export const IGlobalConfigLib = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundDeployerV4",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "nextGlobalConfigLib",
        type: "address",
      },
    ],
    name: "GlobalConfigLibSet",
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
        name: "_depositAsset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_depositAssetAmount",
        type: "uint256",
      },
    ],
    name: "formatDepositCall",
    outputs: [
      {
        internalType: "address",
        name: "target_",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "payload_",
        type: "bytes",
      },
    ],
    stateMutability: "view",
    type: "function",
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
        name: "_recipient",
        type: "address",
      },
      {
        internalType: "address",
        name: "_asset",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_amountIsShares",
        type: "bool",
      },
    ],
    name: "formatSingleAssetRedemptionCall",
    outputs: [
      {
        internalType: "address",
        name: "target_",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "payload_",
        type: "bytes",
      },
    ],
    stateMutability: "view",
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
    name: "getGlobalConfigLib",
    outputs: [
      {
        internalType: "address",
        name: "globalConfigLib_",
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
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
      {
        internalType: "address",
        name: "_recipientToValidate",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_sharesAmountToValidate",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_redeemContract",
        type: "address",
      },
      {
        internalType: "bytes4",
        name: "_redeemSelector",
        type: "bytes4",
      },
      {
        internalType: "bytes",
        name: "_redeemData",
        type: "bytes",
      },
    ],
    name: "isValidRedeemSharesCall",
    outputs: [
      {
        internalType: "bool",
        name: "isValid_",
        type: "bool",
      },
    ],
    stateMutability: "view",
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
        name: "_nextGlobalConfigLib",
        type: "address",
      },
    ],
    name: "setGlobalConfigLib",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;
