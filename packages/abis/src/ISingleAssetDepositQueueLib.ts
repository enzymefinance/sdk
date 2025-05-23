export const ISingleAssetDepositQueueLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_addressListRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "_globalConfigProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_gsnTrustedForwardersAddressListId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ADDRESS_LIST_REGISTRY",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IAddressListRegistry",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "GLOBAL_CONFIG",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IGlobalConfig2",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addManagers",
    inputs: [
      {
        name: "_managers",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelRequest",
    inputs: [
      {
        name: "_id",
        type: "uint88",
        internalType: "uint88",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "depositFromQueue",
    inputs: [
      {
        name: "_endId",
        type: "uint88",
        internalType: "uint88",
      },
      {
        name: "_idsToBypass",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getDepositAsset",
    inputs: [],
    outputs: [
      {
        name: "asset_",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDepositorAllowlistId",
    inputs: [],
    outputs: [
      {
        name: "depositorAllowlistId_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMinDepositAssetAmount",
    inputs: [],
    outputs: [
      {
        name: "minDepositAssetAmount_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMinRequestTime",
    inputs: [],
    outputs: [
      {
        name: "minRequestTime_",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNextNewId",
    inputs: [],
    outputs: [
      {
        name: "id_",
        type: "uint88",
        internalType: "uint88",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNextQueuedId",
    inputs: [],
    outputs: [
      {
        name: "id_",
        type: "uint88",
        internalType: "uint88",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRequest",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "request_",
        type: "tuple",
        internalType: "struct ISingleAssetDepositQueue.Request",
        components: [
          {
            name: "user",
            type: "address",
            internalType: "address",
          },
          {
            name: "canCancelTime",
            type: "uint96",
            internalType: "uint96",
          },
          {
            name: "depositAssetAmount",
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
    name: "init",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_depositAsset",
        type: "address",
        internalType: "contract IERC20",
      },
      {
        name: "_managers",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_minDepositAssetAmount",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "_minRequestTime",
        type: "uint64",
        internalType: "uint64",
      },
      {
        name: "_depositorAllowlistId",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isManager",
    inputs: [
      {
        name: "_user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "isManager_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "queueIsShutdown",
    inputs: [],
    outputs: [
      {
        name: "isShutdown_",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeManagers",
    inputs: [
      {
        name: "_managers",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "requestDeposit",
    inputs: [
      {
        name: "_depositAssetAmount",
        type: "uint128",
        internalType: "uint128",
      },
    ],
    outputs: [
      {
        name: "id_",
        type: "uint88",
        internalType: "uint88",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDepositorAllowlistId",
    inputs: [
      {
        name: "_depositorAllowlistId",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMinDepositAssetAmount",
    inputs: [
      {
        name: "_minDepositAssetAmount",
        type: "uint128",
        internalType: "uint128",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setMinRequestTime",
    inputs: [
      {
        name: "_minRequestTime",
        type: "uint64",
        internalType: "uint64",
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
    name: "DepositRequestAdded",
    inputs: [
      {
        name: "id",
        type: "uint88",
        indexed: false,
        internalType: "uint88",
      },
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "depositAssetAmount",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
      {
        name: "canCancelTime",
        type: "uint96",
        indexed: false,
        internalType: "uint96",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Deposited",
    inputs: [
      {
        name: "id",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sharesAmountReceived",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DepositorAllowlistIdSet",
    inputs: [
      {
        name: "depositorAllowlistId",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "vaultProxy",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "depositAsset",
        type: "address",
        indexed: false,
        internalType: "contract IERC20",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ManagerAdded",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ManagerRemoved",
    inputs: [
      {
        name: "user",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MinDepositAssetAmountSet",
    inputs: [
      {
        name: "minDepositAssetAmount",
        type: "uint128",
        indexed: false,
        internalType: "uint128",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "MinRequestTimeSet",
    inputs: [
      {
        name: "minRequestTime",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RequestBypassed",
    inputs: [
      {
        name: "id",
        type: "uint88",
        indexed: false,
        internalType: "uint88",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RequestCanceled",
    inputs: [
      {
        name: "id",
        type: "uint88",
        indexed: false,
        internalType: "uint88",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Shutdown",
    inputs: [],
    anonymous: false,
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__AddManager__AlreadyManager",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__CancelRequest__MinRequestTimeNotElapsed",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__CancelRequest__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__DepositFromQueue__OutOfRange",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__Init__AlreadyInitialized",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__Init__UndefinedVaultProxy",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__NotShutdown__Shutdown",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__OnlyManagerOrOwner__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__OnlyOwner__Unauthorized",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__RemoveManager__NotManager",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__RequestDeposit__DepositAmountEqualsToZero",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__RequestDeposit__DepositorIsNotAllowlisted",
    inputs: [],
  },
  {
    type: "error",
    name: "SingleAssetDepositQueue__RequestDeposit__TooLowDepositAmount",
    inputs: [],
  },
] as const;
