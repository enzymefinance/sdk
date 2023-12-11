import * as Abis from "@enzymefinance/abis";
import {
  type Address,
  Chain,
  ContractFunctionExecutionError,
  type Hex,
  type PublicClient,
  Transport,
  decodeAbiParameters,
  encodeAbiParameters,
  parseAbi,
  parseUnits,
} from "viem";
import { Viem } from "../../Utils.js";
import * as IntegrationManager from "../../_internal/IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// LEND
//--------------------------------------------------------------------------------------------

export const lend = IntegrationManager.makeUse(IntegrationManager.Selector.Lend, lendEncode);

const lendEncoding = [
  {
    name: "idleToken",
    type: "address",
  },
  {
    name: "depositAmount",
    type: "uint256",
  },
  {
    name: "minIncomingIdleTokenAmount",
    type: "uint256",
  },
] as const;

export type LendArgs = {
  idleToken: Address;
  depositAmount: bigint;
  minIncomingIdleTokenAmount: bigint;
};

export function lendEncode(args: LendArgs): Hex {
  return encodeAbiParameters(lendEncoding, [args.idleToken, args.depositAmount, args.minIncomingIdleTokenAmount]);
}

export function lendDecode(encoded: Hex): LendArgs {
  const [idleToken, depositAmount, minIncomingIdleTokenAmount] = decodeAbiParameters(lendEncoding, encoded);

  return {
    idleToken,
    depositAmount,
    minIncomingIdleTokenAmount,
  };
}

//--------------------------------------------------------------------------------------------
// REDEEM
//--------------------------------------------------------------------------------------------

export const redeem = IntegrationManager.makeUse(IntegrationManager.Selector.Redeem, redeemEncode);

const redeemEncoding = [
  {
    type: "address",
    name: "idleToken",
  },
  {
    name: "outgoingIdleTokenAmount",
    type: "uint256",
  },
  {
    name: "minIncomingUnderlyingAmount",
    type: "uint256",
  },
] as const;

export type RedeemArgs = {
  idleToken: Address;
  outgoingIdleTokenAmount: bigint;
  minIncomingUnderlyingAmount: bigint;
};

export function redeemEncode(args: RedeemArgs): Hex {
  return encodeAbiParameters(redeemEncoding, [
    args.idleToken,
    args.outgoingIdleTokenAmount,
    args.minIncomingUnderlyingAmount,
  ]);
}

export function redeemDecode(encoded: Hex): RedeemArgs {
  const [idleToken, outgoingIdleTokenAmount, minIncomingUnderlyingAmount] = decodeAbiParameters(
    redeemEncoding,
    encoded,
  );

  return { idleToken, outgoingIdleTokenAmount, minIncomingUnderlyingAmount };
}

//--------------------------------------------------------------------------------------------
// CLAIM REWARDS
//--------------------------------------------------------------------------------------------

export const claimRewards = IntegrationManager.makeUse(IntegrationManager.Selector.ClaimRewards, claimRewardsEncode);

const claimRewardsEncoding = [
  {
    type: "address",
    name: "idleToken",
  },
] as const;

export type ClaimRewardsArgs = {
  idleToken: Address;
};

export function claimRewardsEncode(args: ClaimRewardsArgs): Hex {
  return encodeAbiParameters(claimRewardsEncoding, [args.idleToken]);
}

export function claimRewardsDecode(encoded: Hex): ClaimRewardsArgs {
  const [idleToken] = decodeAbiParameters(claimRewardsEncoding, encoded);

  return { idleToken };
}

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export async function getRate<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    priceFeed: Address;
    poolToken: Address;
    poolTokenDecimals: number;
  }>,
) {
  try {
    const {
      result: [underlyings, amounts],
    } = await Viem.simulateContract(client, args, {
      abi: Abis.IIdlePriceFeed,
      functionName: "calcUnderlyingValues",
      address: args.priceFeed,
      args: [args.poolToken, parseUnits("1", args.poolTokenDecimals)],
    });

    const output: Record<Address, bigint> = {};
    for (let i = 0; i < underlyings.length; i++) {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const underlying = underlyings[i]!;
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      const amount = amounts[i]!;

      output[underlying] = amount;
    }

    return output;
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}

//--------------------------------------------------------------------------------------------
// EXTERNAL READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function getGovTokensAmounts<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    pool: Address;
    tokensOwner: Address;
  }>,
) {
  const amounts = await Viem.readContract(client, args, {
    abi: parseAbi(["function getGovTokensAmounts(address _usr) view returns (uint256[] _amounts)"]),
    functionName: "getGovTokensAmounts",
    address: args.pool,
    args: [args.tokensOwner],
  });

  const govTokensAbi = parseAbi(["function govTokens(uint256) view returns (address)"]);

  const tokensAmounts = await Promise.all(
    amounts.map(async (amount, index) => {
      const token = await Viem.readContract(client, args, {
        abi: govTokensAbi,
        functionName: "govTokens",
        address: args.pool,
        args: [BigInt(index)],
      });

      return {
        amount,
        token,
      };
    }),
  );

  const tokensAmountsMap: Record<Address, bigint> = {};
  for (const { token, amount } of tokensAmounts) {
    tokensAmountsMap[token] = amount;
  }

  return tokensAmountsMap;
}

export function getSpeeds<TChain extends Chain | undefined = Chain>(
  client: PublicClient<Transport, TChain>,
  args: Viem.ContractCallParameters<{
    idleController: Address;
    idlePool: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function idleSpeeds(address) view returns (uint256)"]),
    functionName: "idleSpeeds",
    address: args.idleController,
    args: [args.idlePool],
  });
}
