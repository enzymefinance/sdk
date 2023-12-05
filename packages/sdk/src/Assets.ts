import * as Abis from "@enzymefinance/abis";
import { type Address, ContractFunctionExecutionError, type PublicClient, hexToString, parseAbi } from "viem";
import { Viem } from "./Utils.js";

//--------------------------------------------------------------------------------------------
// TRANSACTIONS
//--------------------------------------------------------------------------------------------

export type ApproveParams = {
  asset: Address;
  spender: Address;
  amount: bigint;
};

export function approve(args: ApproveParams) {
  return new Viem.PopulatedTransaction({
    abi: parseAbi(["function approve(address spender, uint256 amount)"]),
    functionName: "approve",
    args: [args.spender, args.amount],
    address: args.asset,
  });
}

//--------------------------------------------------------------------------------------------
// READ FUNCTIONS
//--------------------------------------------------------------------------------------------

export async function getInfo(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  const [name, symbol, decimals] = await Promise.all([
    getName(client, args),
    getSymbol(client, args),
    getDecimals(client, args),
  ]);

  return { name, symbol, decimals };
}

export async function getName(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  try {
    const name = await Viem.readContract(client, args, {
      abi: parseAbi(["function name() view returns (string)"]),
      functionName: "name",
      address: args.asset,
    });

    return name;
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      // TODO: Once `viem` exports the `SliceOutOfBoundsError` class, we should use that here too (`error.cause`).
      const name = await Viem.readContract(client, args, {
        abi: parseAbi(["function name() view returns (bytes32)"]),
        functionName: "name",
        address: args.asset,
      });

      return hexToString(name);
    }

    throw error;
  }
}

export async function getSymbol(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  try {
    const symbol = await Viem.readContract(client, args, {
      abi: parseAbi(["function symbol() view returns (string)"]),
      functionName: "symbol",
      address: args.asset,
    });

    return symbol;
  } catch (error) {
    if (error instanceof ContractFunctionExecutionError) {
      // TODO: Once `viem` exports the `SliceOutOfBoundsError` class, we should use that here too (`error.cause`).
      const symbol = await Viem.readContract(client, args, {
        abi: parseAbi(["function symbol() view returns (bytes32)"]),
        functionName: "symbol",
        address: args.asset,
      });

      return hexToString(symbol);
    }

    throw error;
  }
}

export function getBalanceOf(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    owner: Address;
    asset: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function balanceOf(address account) view returns (uint256)"]),
    functionName: "balanceOf",
    address: args.asset,
    args: [args.owner],
  });
}

export async function getBalancesOf(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    owner: Address;
    assets: Address[];
  }>,
) {
  return Promise.all(
    args.assets.map(async (asset) => {
      const amount = await getBalanceOf(client, {
        ...args,
        asset,
      });

      return { asset, amount };
    }),
  );
}

export function getAllowance(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
    owner: Address;
    spender: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function allowance(address, address) view returns (uint256)"]),
    functionName: "allowance",
    address: args.asset,
    args: [args.owner, args.spender],
  });
}

export function getDecimals(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function decimals() view returns (uint)"]),
    functionName: "decimals",
    address: args.asset,
  });
}

export function getTotalSupply(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    asset: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function totalSupply() view returns (uint)"]),
    functionName: "totalSupply",
    address: args.asset,
  });
}

export async function getCanonicalValue(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    baseAsset: Address;
    quoteAsset: Address;
    amount: bigint;
  }>,
) {
  const { result } = await Viem.simulateContract(client, args, {
    abi: Abis.IValueInterpreter,
    functionName: "calcCanonicalAssetValue",
    address: args.valueInterpreter,
    args: [args.baseAsset, args.amount, args.quoteAsset],
  });

  return result;
}

export async function getCanonicalAssetValue(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    baseAsset: Address;
    amount: bigint;
    quoteAsset: Address;
  }>,
) {
  try {
    const { result } = await Viem.simulateContract(client, args, {
      abi: Abis.IValueInterpreter,
      functionName: "calcCanonicalAssetValue",
      address: args.valueInterpreter,
      args: [args.baseAsset, args.amount, args.quoteAsset],
    });

    return result;
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}

export async function calcCanonicalAssetsTotalValue(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    valueInterpreter: Address;
    baseAssets: Address[];
    amounts: bigint[];
    quoteAsset: Address;
  }>,
) {
  try {
    const { result } = await Viem.simulateContract(client, args, {
      abi: Abis.IValueInterpreter,
      functionName: "calcCanonicalAssetsTotalValue",
      address: args.valueInterpreter,
      args: [args.baseAssets, args.amounts, args.quoteAsset],
    });

    return result;
  } catch (error) {
    // TODO: More selectively catch this error here.
    if (error instanceof ContractFunctionExecutionError) {
      return undefined;
    }

    throw error;
  }
}
