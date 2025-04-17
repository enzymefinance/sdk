import { type Address, type Client, type Hex, decodeAbiParameters, encodeAbiParameters, parseAbi } from "viem";
import { readContract } from "viem/actions";
import { Viem } from "../../Utils.js";
import * as ExternalPositionManager from "../../_internal/ExternalPositionManager.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  CreateEscrowByTakingQuote: 0n,
  CreateEscrowByStartingAuction: 1n,
  CloseAndSweepEscrows: 2n,
  WithdrawTokensFromEscrows: 3n,
  Sweep: 4n,
} as const;

export const create = ExternalPositionManager.createOnly;

export type RFQInitialization = {
  optionInfo: {
    underlyingToken: Address;
    expiry: number;
    settlementToken: Address;
    earliestExercise: number;
    notional: bigint;
    strike: bigint;
    advancedSettings: {
      borrowCap: bigint;
      oracle: Address;
      premiumTokenIsUnderlying: boolean;
      votingDelegationAllowed: boolean;
      allowedDelegateRegistry: Address;
    };
  };
  rfqQuote: {
    premium: bigint;
    validUntil: bigint;
    signature: Hex;
    eip1271Maker: Address;
  };
};

export type AuctionInitialization = {
  underlyingToken: Address;
  settlementToken: Address;
  notional: bigint;
  auctionParams: {
    relStrike: bigint;
    tenor: number;
    earliestExerciseTenor: number;
    decayStartTime: number;
    decayDuration: number;
    relPremiumStart: bigint;
    relPremiumFloor: bigint;
    minSpot: bigint;
    maxSpot: bigint;
  };
  advancedSettings: {
    borrowCap: bigint;
    oracle: Address;
    premiumTokenIsUnderlying: boolean;
    votingDelegationAllowed: boolean;
    allowedDelegateRegistry: Address;
  };
};

export type CreateEscrowByTakingQuoteArgs = {
  rfqInitialization: RFQInitialization;
  distPartner: Address;
};

export type CreateEscrowByStartingAuctionArgs = {
  auctionInitialization: AuctionInitialization;
  distPartner: Address;
};

export type CloseAndSweepEscrowsArgs = {
  escrowIdxs: ReadonlyArray<number>;
  skipWithdrawFromEscrow: boolean;
};

export type WithdrawTokensFromEscrowsArgs = {
  escrows: ReadonlyArray<Address>;
  tokens: ReadonlyArray<Address>;
};

export type SweepArgs = {
  tokens: ReadonlyArray<Address>;
};

//------------------------------------------------------------------------------
// CREATE ESCROW BY TAKING QUOTE
//------------------------------------------------------------------------------

const createEscrowByTakingQuoteEncoding = [
  {
    type: "tuple",
    name: "createEscrowByTakingQuoteArgs",
    components: [
      {
        type: "tuple",
        name: "rfqInitialization",
        components: [
          {
            type: "tuple",
            name: "optionInfo",
            components: [
              { type: "address", name: "underlyingToken" },
              { type: "uint48", name: "expiry" },
              { type: "address", name: "settlementToken" },
              { type: "uint48", name: "earliestExercise" },
              { type: "uint128", name: "notional" },
              { type: "uint128", name: "strike" },
              {
                type: "tuple",
                name: "advancedSettings",
                components: [
                  { type: "uint64", name: "borrowCap" },
                  { type: "address", name: "oracle" },
                  { type: "bool", name: "premiumTokenIsUnderlying" },
                  { type: "bool", name: "votingDelegationAllowed" },
                  { type: "address", name: "allowedDelegateRegistry" },
                ],
              },
            ],
          },
          {
            type: "tuple",
            name: "rfqQuote",
            components: [
              { type: "uint128", name: "premium" },
              { type: "uint256", name: "validUntil" },
              { type: "bytes", name: "signature" },
              { type: "address", name: "eip1271Maker" },
            ],
          },
        ],
      },
      {
        type: "address",
        name: "distPartner",
      },
    ],
  },
] as const;

export function createEscrowByTakingQuoteEncode(args: CreateEscrowByTakingQuoteArgs): Hex {
  return encodeAbiParameters(createEscrowByTakingQuoteEncoding, [args]);
}

export function createEscrowByTakingQuoteDecode(encoded: Hex): CreateEscrowByTakingQuoteArgs {
  const [{ rfqInitialization, distPartner }] = decodeAbiParameters(createEscrowByTakingQuoteEncoding, encoded);
  return { rfqInitialization, distPartner };
}

//------------------------------------------------------------------------------
// CREATE ESCROW BY STARTING AUCTION
//------------------------------------------------------------------------------

const createEscrowByStartingAuctionEncoding = [
  {
    type: "tuple",
    name: "createEscrowByStartingAuctionArgs",
    components: [
      {
        type: "tuple",
        name: "auctionInitialization",
        components: [
          { type: "address", name: "underlyingToken" },
          { type: "address", name: "settlementToken" },
          { type: "uint128", name: "notional" },
          {
            type: "tuple",
            name: "auctionParams",
            components: [
              { type: "uint128", name: "relStrike" },
              { type: "uint48", name: "tenor" },
              { type: "uint48", name: "earliestExerciseTenor" },
              { type: "uint32", name: "decayStartTime" },
              { type: "uint32", name: "decayDuration" },
              { type: "uint64", name: "relPremiumStart" },
              { type: "uint64", name: "relPremiumFloor" },
              { type: "uint128", name: "minSpot" },
              { type: "uint128", name: "maxSpot" },
            ],
          },
          {
            type: "tuple",
            name: "advancedSettings",
            components: [
              { type: "uint64", name: "borrowCap" },
              { type: "address", name: "oracle" },
              { type: "bool", name: "premiumTokenIsUnderlying" },
              { type: "bool", name: "votingDelegationAllowed" },
              { type: "address", name: "allowedDelegateRegistry" },
            ],
          },
        ],
      },
      {
        type: "address",
        name: "distPartner",
      },
    ],
  },
] as const;

export function createEscrowByStartingAuctionEncode(args: CreateEscrowByStartingAuctionArgs): Hex {
  return encodeAbiParameters(createEscrowByStartingAuctionEncoding, [args]);
}

export function createEscrowByStartingAuctionDecode(encoded: Hex): CreateEscrowByStartingAuctionArgs {
  const [{ auctionInitialization, distPartner }] = decodeAbiParameters(createEscrowByStartingAuctionEncoding, encoded);
  return { auctionInitialization, distPartner };
}

//------------------------------------------------------------------------------
// CLOSE AND SWEEP ESCROWS
//------------------------------------------------------------------------------

const closeAndSweepEscrowsEncoding = [
  {
    type: "tuple",
    name: "closeAndSweepEscrowsArgs",
    components: [
      {
        type: "uint32[]",
        name: "escrowIdxs",
      },
      {
        type: "bool",
        name: "skipWithdrawFromEscrow",
      },
    ],
  },
] as const;

export function closeAndSweepEscrowsEncode(args: CloseAndSweepEscrowsArgs): Hex {
  return encodeAbiParameters(closeAndSweepEscrowsEncoding, [args]);
}

export function closeAndSweepEscrowsDecode(encoded: Hex): CloseAndSweepEscrowsArgs {
  const [{ escrowIdxs, skipWithdrawFromEscrow }] = decodeAbiParameters(closeAndSweepEscrowsEncoding, encoded);
  return { escrowIdxs, skipWithdrawFromEscrow };
}

//------------------------------------------------------------------------------
// WITHDRAW TOKENS FROM ESCROWS
//------------------------------------------------------------------------------

const withdrawTokensFromEscrowsEncoding = [
  {
    type: "tuple",
    name: "withdrawTokensFromEscrowsArgs",
    components: [
      {
        type: "address[]",
        name: "escrows",
      },
      {
        type: "address[]",
        name: "tokens",
      },
    ],
  },
] as const;

export function withdrawTokensFromEscrowsEncode(args: WithdrawTokensFromEscrowsArgs): Hex {
  return encodeAbiParameters(withdrawTokensFromEscrowsEncoding, [args]);
}

export function withdrawTokensFromEscrowsDecode(encoded: Hex): WithdrawTokensFromEscrowsArgs {
  const [{ escrows, tokens }] = decodeAbiParameters(withdrawTokensFromEscrowsEncoding, encoded);
  return { escrows, tokens };
}

//------------------------------------------------------------------------------
// SWEEP
//------------------------------------------------------------------------------

const sweepEncoding = [
  {
    type: "tuple",
    name: "sweepArgs",
    components: [
      {
        type: "address[]",
        name: "tokens",
      },
    ],
  },
] as const;

export function sweepEncode(args: SweepArgs): Hex {
  return encodeAbiParameters(sweepEncoding, [args]);
}

export function sweepDecode(encoded: Hex): SweepArgs {
  const [{ tokens }] = decodeAbiParameters(sweepEncoding, encoded);
  return { tokens } as const;
}

//------------------------------------------------------------------------------
// ACTION FUNCTIONS
//------------------------------------------------------------------------------
export const createEscrowByTakingQuote = ExternalPositionManager.makeUse(
  Action.CreateEscrowByTakingQuote,
  createEscrowByTakingQuoteEncode,
);

export const createEscrowByStartingAuction = ExternalPositionManager.makeUse(
  Action.CreateEscrowByStartingAuction,
  createEscrowByStartingAuctionEncode,
);

export const closeAndSweepEscrows = ExternalPositionManager.makeUse(
  Action.CloseAndSweepEscrows,
  closeAndSweepEscrowsEncode,
);

export const withdrawTokensFromEscrows = ExternalPositionManager.makeUse(
  Action.WithdrawTokensFromEscrows,
  withdrawTokensFromEscrowsEncode,
);

export const sweep = ExternalPositionManager.makeUse(Action.Sweep, sweepEncode);

//------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//------------------------------------------------------------------------------
export function getManagedAssets(client: Client, args: Viem.ContractCallParameters<{ position: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getManagedAssets() view returns (address[] assets_, uint256[] amounts_)"]),
    functionName: "getManagedAssets",
    address: args.position,
    args: [],
  });
}

export function getDebtAssets(client: Client, args: Viem.ContractCallParameters<{ position: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getDebtAssets() view returns (address[] assets_, uint256[] amounts_)"]),
    functionName: "getDebtAssets",
    address: args.position,
    args: [],
  });
}

export function getNumOpenEscrows(client: Client, args: Viem.ContractCallParameters<{ position: Address }>) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getNumOpenEscrows() view returns (uint256 numOpenEscrows_)"]),
    functionName: "getNumOpenEscrows",
    address: args.position,
    args: [],
  });
}

export function getEscrowIdxs(
  client: Client,
  args: Viem.ContractCallParameters<{
    position: Address;
    from: bigint;
    numElements: bigint;
  }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function getEscrowIdxs(uint256 _from, uint256 _numElements) view returns (uint32[] openEscrowsIdxs_)",
    ]),
    functionName: "getEscrowIdxs",
    address: args.position,
    args: [args.from, args.numElements],
  });
}

export async function getEscrowAddress(
  client: Client,
  args: Viem.ContractCallParameters<{
    mysoRouter: Address;
    escrowId: bigint;
  }>,
) {
  const escrowAddresses = await readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi([
      "function getEscrows(uint256 from, uint256 numElements) view returns (address[] memory escrowArray)",
    ]),
    functionName: "getEscrows",
    address: args.mysoRouter,
    args: [args.escrowId, 1n],
  });

  return escrowAddresses[0];
}
