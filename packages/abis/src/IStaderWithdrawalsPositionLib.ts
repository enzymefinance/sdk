export const IStaderWithdrawalsPositionLib = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_userWithdrawalManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_ethxAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_wethAddress",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "ETHX_ADDRESS",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "USER_WITHDRAWAL_MANAGER",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IStaderUserWithdrawalManager",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "WETH_ADDRESS",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
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
    type: "error",
    name: "StaderWithdrawalsPositionLib__ReceiveCallFromVault__InvalidActionId",
    inputs: [],
  },
] as const;
