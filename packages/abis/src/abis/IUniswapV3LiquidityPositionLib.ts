export const IUniswapV3LiquidityPositionLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_nonFungibleTokenManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_valueInterpreter",
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
    stateMutability: "pure",
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
    name: "getNftIds",
    inputs: [],
    outputs: [
      {
        name: "nftIds_",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getNonFungibleTokenManager",
    inputs: [],
    outputs: [
      {
        name: "nonFungibleTokenManager_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPairForNft",
    inputs: [
      {
        name: "_nftId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "token0_",
        type: "address",
        internalType: "address",
      },
      {
        name: "token1_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getToken0ForNft",
    inputs: [
      {
        name: "_nftId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "token0_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getToken1ForNft",
    inputs: [
      {
        name: "_nftId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "token1_",
        type: "address",
        internalType: "address",
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
    name: "NFTPositionAdded",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "NFTPositionRemoved",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
] as const;
