export const IFundValueCalculatorRouter = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_dispatcher",
        type: "address",
        internalType: "address",
      },
      {
        name: "_fundDeployers",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_fundValueCalculators",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcGav",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "denominationAsset_",
        type: "address",
        internalType: "address",
      },
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
    name: "calcGavInAsset",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_quoteAsset",
        type: "address",
        internalType: "address",
      },
    ],
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
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "denominationAsset_",
        type: "address",
        internalType: "address",
      },
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
    name: "calcGrossShareValueInAsset",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_quoteAsset",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "calcNav",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "denominationAsset_",
        type: "address",
        internalType: "address",
      },
      {
        name: "nav_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcNavInAsset",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_quoteAsset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "nav_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcNetShareValue",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "denominationAsset_",
        type: "address",
        internalType: "address",
      },
      {
        name: "netShareValue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcNetShareValueInAsset",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_quoteAsset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "netShareValue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcNetValueForSharesHolder",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_sharesHolder",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "denominationAsset_",
        type: "address",
        internalType: "address",
      },
      {
        name: "netValue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "calcNetValueForSharesHolderInAsset",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
      {
        name: "_sharesHolder",
        type: "address",
        internalType: "address",
      },
      {
        name: "_quoteAsset",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "netValue_",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "getFundValueCalculatorForFundDeployer",
    inputs: [
      {
        name: "_fundDeployer",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "fundValueCalculator_",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getFundValueCalculatorForVault",
    inputs: [
      {
        name: "_vaultProxy",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "fundValueCalculatorContract_",
        type: "address",
        internalType: "contract IFundValueCalculator",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setFundValueCalculators",
    inputs: [
      {
        name: "_fundDeployers",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_fundValueCalculators",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "FundValueCalculatorUpdated",
    inputs: [
      {
        name: "fundDeployer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "fundValueCalculator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
