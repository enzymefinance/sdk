export const IHelperDataReader = [
  {
    inputs: [
      {
        internalType: "contract IFundValueCalculatorRouter",
        name: "_fundValueCalculatorRouter",
        type: "address",
      },
      {
        internalType: "contract IExternalPositionFactory",
        name: "_externalPositionFactory",
        type: "address",
      },
      {
        internalType: "contract IPolicyManagerExtended",
        name: "_policyManager",
        type: "address",
      },
      {
        internalType: "contract IFeeManagerExtended",
        name: "_feeManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
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
        name: "",
        type: "bytes",
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
    name: "getVaultActiveExternalPositionsDetailsDecoded",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "label",
            type: "string",
          },
          {
            internalType: "address",
            name: "id",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "typeId",
            type: "uint256",
          },
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct HelperDataReader.AssetAmount[]",
            name: "debtAssetsAmounts",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct HelperDataReader.AssetAmount[]",
            name: "managedAssetsAmounts",
            type: "tuple[]",
          },
        ],
        internalType: "struct HelperDataReader.ExternalPositionDetails[]",
        name: "",
        type: "tuple[]",
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
        name: "",
        type: "bytes",
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
    name: "getVaultDetailsDecoded",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "denominationAsset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "netShareValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "grossAssetValue",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "hasInvalidAum",
            type: "bool",
          },
        ],
        internalType: "struct HelperDataReader.VaultDetails",
        name: "",
        type: "tuple",
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
    name: "getVaultDetailsExtended",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
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
    name: "getVaultDetailsExtendedDecoded",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "symbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "totalSupply",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "denominationAsset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "netShareValue",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "grossAssetValue",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
          {
            internalType: "bool",
            name: "hasInvalidAum",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "address",
                name: "asset",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
            ],
            internalType: "struct HelperDataReader.AssetAmount[]",
            name: "trackedAssetsAmounts",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "label",
                type: "string",
              },
              {
                internalType: "address",
                name: "id",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "typeId",
                type: "uint256",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "asset",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                internalType: "struct HelperDataReader.AssetAmount[]",
                name: "debtAssetsAmounts",
                type: "tuple[]",
              },
              {
                components: [
                  {
                    internalType: "address",
                    name: "asset",
                    type: "address",
                  },
                  {
                    internalType: "uint256",
                    name: "amount",
                    type: "uint256",
                  },
                ],
                internalType: "struct HelperDataReader.AssetAmount[]",
                name: "managedAssetsAmounts",
                type: "tuple[]",
              },
            ],
            internalType: "struct HelperDataReader.ExternalPositionDetails[]",
            name: "activeExternalPositionsDetails",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "string",
                name: "identifier",
                type: "string",
              },
              {
                internalType: "address",
                name: "id",
                type: "address",
              },
            ],
            internalType: "struct HelperDataReader.PolicyDetails[]",
            name: "policiesDetails",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "address",
                name: "recipientForFund",
                type: "address",
              },
              {
                internalType: "address",
                name: "id",
                type: "address",
              },
            ],
            internalType: "struct HelperDataReader.FeeDetails[]",
            name: "feesDetails",
            type: "tuple[]",
          },
        ],
        internalType: "struct HelperDataReader.VaultDetailsExtended",
        name: "",
        type: "tuple",
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
        name: "",
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
    ],
    name: "getVaultFeesDetailsDecoded",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "recipientForFund",
            type: "address",
          },
          {
            internalType: "address",
            name: "id",
            type: "address",
          },
        ],
        internalType: "struct HelperDataReader.FeeDetails[]",
        name: "",
        type: "tuple[]",
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
    name: "getVaultPoliciesDetails",
    outputs: [
      {
        internalType: "bytes",
        name: "",
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
    ],
    name: "getVaultPoliciesDetailsDecoded",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "identifier",
            type: "string",
          },
          {
            internalType: "address",
            name: "id",
            type: "address",
          },
        ],
        internalType: "struct HelperDataReader.PolicyDetails[]",
        name: "",
        type: "tuple[]",
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
    name: "getVaultTrackedAssetsAmounts",
    outputs: [
      {
        internalType: "bytes",
        name: "",
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
    ],
    name: "getVaultTrackedAssetsAmountsDecoded",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "asset",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct HelperDataReader.AssetAmount[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;