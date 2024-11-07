import { Viem } from "@enzymefinance/sdk/Utils";
import { type Address, type PublicClient, parseAbi } from "viem";
import { readContract } from "viem/actions";

export function getPoolGauge(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ gaugeFactory: Address; pool: Address }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function getPoolGauge(address _pool) view returns (address gauge_)"]),
    functionName: "getPoolGauge",
    address: args.gaugeFactory,
    args: [args.pool],
  });
}

export function isGaugeFromFactory(
  client: PublicClient,
  args: Viem.ContractCallParameters<{ gaugeFactory: Address; gauge: Address }>,
) {
  return readContract(client, {
    ...Viem.extractBlockParameters(args),
    abi: parseAbi(["function isGaugeFromFactory(address _gauge) view returns (bool isGauge_)"]),
    functionName: "isGaugeFromFactory",
    address: args.gaugeFactory,
    args: [args.gauge],
  });
}
