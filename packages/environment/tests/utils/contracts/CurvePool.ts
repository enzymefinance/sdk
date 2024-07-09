import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getCoins(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ curvePool: Address; index: bigint }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function coins(uint256 arg0) view returns (address coin_)"]),
    functionName: "coins",
    address: args.curvePool,
    args: [args.index],
  });
}

export function getCoinsInt128(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ curvePool: Address; index: bigint }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function coins(int128 arg0) view returns (address coin_)"]),
    functionName: "coins",
    address: args.curvePool,
    args: [args.index],
  });
}

export function calcWithdrawOneCoin(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ curvePool: Address; amount: bigint; index: bigint }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function calc_withdraw_one_coin(uint256 _token_amount, int128 i) view returns (uint256)"]),
    functionName: "calc_withdraw_one_coin",
    address: args.curvePool,
    args: [args.amount, args.index],
  });
}
