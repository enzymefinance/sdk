export const IHelperDataReaderRouter = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_dispatcher",
        type: "address",
      },
      {
        internalType: "address[]",
        name: "_fundDeployers",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "contract IHelperDataReader",
            name: "helperDataReader",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
        ],
        internalType: "struct HelperDataReaderRouter.HelperDataReaderInfo[]",
        name: "_helperDataReadersInfo",
        type: "tuple[]",
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
        name: "fundDeployer",
        type: "address",
      },
      {
        components: [
          {
            internalType: "contract IHelperDataReader",
            name: "helperDataReader",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
        ],
        indexed: false,
        internalType: "struct HelperDataReaderRouter.HelperDataReaderInfo",
        name: "HelperDataReader",
        type: "tuple",
      },
    ],
    name: "HelperDataReaderUpdated",
    type: "event",
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
    inputs: [
      {
        internalType: "address",
        name: "_vaultProxy",
        type: "address",
      },
    ],
    name: "getHelperDataReaderForVault",
    outputs: [
      {
        components: [
          {
            internalType: "contract IHelperDataReader",
            name: "helperDataReader",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
        ],
        internalType: "struct HelperDataReaderRouter.HelperDataReaderInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_fundDeployer",
        type: "address",
      },
    ],
    name: "getHelperDataReaderInfoForFundDeployer",
    outputs: [
      {
        components: [
          {
            internalType: "contract IHelperDataReader",
            name: "helperDataReader",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
        ],
        internalType: "struct HelperDataReaderRouter.HelperDataReaderInfo",
        name: "helperDataReader_",
        type: "tuple",
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
    ],
    name: "getVaultActiveExternalPositionsDetails",
    outputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
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
    ],
    name: "getVaultDetails",
    outputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
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
    ],
    name: "getVaultFeesDetails",
    outputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
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
    ],
    name: "getVaultPoliciesDetails",
    outputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
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
    ],
    name: "getVaultTrackedAssetsAmounts",
    outputs: [
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
      {
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_fundDeployers",
        type: "address[]",
      },
      {
        components: [
          {
            internalType: "contract IHelperDataReader",
            name: "helperDataReader",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "version",
            type: "uint8",
          },
        ],
        internalType: "struct HelperDataReaderRouter.HelperDataReaderInfo[]",
        name: "_helperDataReadersInfo",
        type: "tuple[]",
      },
    ],
    name: "setHelperDataReaders",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;