export const IComptrollerLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_dispatcher",
        type: "address",
        internalType: "address",
      },
      {
        name: "_protocolFeeReserve",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fundDeployer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_valueInterpreter",
        type: "address",
        internalType: "address",
      },
      {
        name: "_externalPositionManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_feeManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_integrationManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_policyManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_gasRelayPaymasterFactory",
        type: "address",
        internalType: "address",
      },
      {
        name: "_mlnToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_wethToken",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "activate",
    inputs: [
      {
        name: "_isMigration",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buyBackProtocolFeeShares",
    inputs: [
      {
        name: "_sharesAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buyShares",
    inputs: [
      {
        name: "_investmentAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minSharesQuantity",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "sharesReceived_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "buySharesOnBehalf",
    inputs: [
      {
        name: "_buyer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_investmentAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minSharesQuantity",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "sharesReceived_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcGav",
    inputs: [],
    outputs: [
      {
        name: "gav_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcGrossShareValue",
    inputs: [],
    outputs: [
      {
        name: "grossShareValue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "callOnExtension",
    inputs: [
      {
        name: "_extension",
        type: "address",
        internalType: "address",
      },
      {
        name: "_actionId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_callArgs",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deployGasRelayPaymaster",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "depositToGasRelayPaymaster",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "destructActivated",
    inputs: [
      {
        name: "_deactivateFeeManagerGasLimit",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_payProtocolFeeGasLimit",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "destructUnactivated",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "doesAutoProtocolFeeSharesBuyback",
    inputs: [],
    outputs: [
      {
        name: "doesAutoBuyback_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDenominationAsset",
    inputs: [],
    outputs: [
      {
        name: "denominationAsset_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDispatcher",
    inputs: [],
    outputs: [
      {
        name: "dispatcher_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getExternalPositionManager",
    inputs: [],
    outputs: [
      {
        name: "externalPositionManager_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFeeManager",
    inputs: [],
    outputs: [
      {
        name: "feeManager_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFundDeployer",
    inputs: [],
    outputs: [
      {
        name: "fundDeployer_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGasRelayPaymaster",
    inputs: [],
    outputs: [
      {
        name: "gasRelayPaymaster_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGasRelayPaymasterFactory",
    inputs: [],
    outputs: [
      {
        name: "gasRelayPaymasterFactory_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getGasRelayTrustedForwarder",
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
    name: "getIntegrationManager",
    inputs: [],
    outputs: [
      {
        name: "integrationManager_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLastSharesBoughtTimestampForAccount",
    inputs: [
      {
        name: "_who",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "lastSharesBoughtTimestamp_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMlnToken",
    inputs: [],
    outputs: [
      {
        name: "mlnToken_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPolicyManager",
    inputs: [],
    outputs: [
      {
        name: "policyManager_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getProtocolFeeReserve",
    inputs: [],
    outputs: [
      {
        name: "protocolFeeReserve_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSharesActionTimelock",
    inputs: [],
    outputs: [
      {
        name: "sharesActionTimelock_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getValueInterpreter",
    inputs: [],
    outputs: [
      {
        name: "valueInterpreter_",
        type: "address",
        internalType: "address",
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
        name: "_denominationAsset",
        type: "address",
        internalType: "address",
      },
      {
        name: "_sharesActionTimelock",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "permissionedVaultAction",
    inputs: [
      {
        name: "_action",
        type: "uint8",
        internalType: "enum IVault.VaultAction",
      },
      {
        name: "_actionData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "preTransferSharesHook",
    inputs: [
      {
        name: "_sender",
        type: "address",
        internalType: "address",
      },
      {
        name: "_recipient",
        type: "address",
        internalType: "address",
      },
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "preTransferSharesHookFreelyTransferable",
    inputs: [
      {
        name: "_sender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "pullWethForGasRelayer",
    inputs: [
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeemSharesForSpecificAssets",
    inputs: [
      {
        name: "_recipient",
        type: "address",
        internalType: "address",
      },
      {
        name: "_sharesQuantity",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_payoutAssets",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_payoutAssetPercentages",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        name: "payoutAmounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeemSharesInKind",
    inputs: [
      {
        name: "_recipient",
        type: "address",
        internalType: "address",
      },
      {
        name: "_sharesQuantity",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_additionalAssets",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_assetsToSkip",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [
      {
        name: "payoutAssets_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "payoutAmounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAutoProtocolFeeSharesBuyback",
    inputs: [
      {
        name: "_nextAutoProtocolFeeSharesBuyback",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGasRelayPaymaster",
    inputs: [
      {
        name: "_nextGasRelayPaymaster",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setVaultProxy",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "shutdownGasRelayPaymaster",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "vaultCallOnContract",
    inputs: [
      {
        name: "_contract",
        type: "address",
        internalType: "address",
      },
      {
        name: "_selector",
        type: "bytes4",
        internalType: "bytes4",
      },
      {
        name: "_encodedArgs",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "returnData_",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AutoProtocolFeeSharesBuybackSet",
    inputs: [
      {
        name: "autoProtocolFeeSharesBuyback",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BuyBackMaxProtocolFeeSharesFailed",
    inputs: [
      {
        name: "failureReturnData",
        type: "bytes",
        indexed: true,
        internalType: "bytes",
      },
      {
        name: "sharesAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "buybackValueInMln",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "gav",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DeactivateFeeManagerFailed",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "GasRelayPaymasterSet",
    inputs: [
      {
        name: "gasRelayPaymaster",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MigratedSharesDuePaid",
    inputs: [
      {
        name: "sharesDue",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PayProtocolFeeDuringDestructFailed",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "PreRedeemSharesHookFailed",
    inputs: [
      {
        name: "failureReturnData",
        type: "bytes",
        indexed: true,
        internalType: "bytes",
      },
      {
        name: "redeemer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sharesAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RedeemSharesInKindCalcGavFailed",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesBought",
    inputs: [
      {
        name: "buyer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "investmentAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sharesIssued",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sharesReceived",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SharesRedeemed",
    inputs: [
      {
        name: "redeemer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "recipient",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sharesAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "receivedAssets",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "receivedAssetAmounts",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "VaultProxySet",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
