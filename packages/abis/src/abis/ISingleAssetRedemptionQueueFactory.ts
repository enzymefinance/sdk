export const ISingleAssetRedemptionQueueFactory = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_libAddress",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deployProxy",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_redemptionAssetAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_bypassableSharesThreshold",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_managers",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [
      {
        name: "proxyAddress_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "ProxyDeployed",
    inputs: [
      {
        name: "deployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "proxyAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "vaultProxy",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
