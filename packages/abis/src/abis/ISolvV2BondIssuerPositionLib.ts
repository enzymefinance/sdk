export const ISolvV2BondIssuerPositionLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_initialBondOfferingMarket",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getDebtAssets",
    inputs: [],
    outputs: [
      {
        name: "assets_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "amounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getIssuedVouchers",
    inputs: [],
    outputs: [
      {
        name: "vouchers_",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getManagedAssets",
    inputs: [],
    outputs: [
      {
        name: "assets_",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "amounts_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getOffers",
    inputs: [],
    outputs: [
      {
        name: "offers_",
        type: "uint24[]",
        internalType: "uint24[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "init",
    inputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "receiveCallFromVault",
    inputs: [
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
    type: "event",
    name: "IssuedVoucherAdded",
    inputs: [
      {
        name: "voucher",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "IssuedVoucherRemoved",
    inputs: [
      {
        name: "voucher",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfferAdded",
    inputs: [
      {
        name: "offerId",
        type: "uint24",
        indexed: true,
        internalType: "uint24",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfferRemoved",
    inputs: [
      {
        name: "offerId",
        type: "uint24",
        indexed: true,
        internalType: "uint24",
      },
    ],
    anonymous: false,
  },
] as const;
