import type {
  Abi,
  Account,
  Address,
  BlockNumber,
  BlockTag,
  CallParameters,
  Chain,
  ContractFunctionConfig,
  EstimateContractGasReturnType,
  EstimateGasParameters,
  GetValue,
  Hex,
  PublicClient,
  ReadContractParameters,
  ReadContractReturnType,
  SimulateContractParameters,
  SimulateContractReturnType,
} from "viem";
import { readContract as viemReadContract, simulateContract as viemSimulateContract } from "viem/actions";

export type PopulatedTransactionParams<TAbi extends Abi, TFunctionName extends string> = ContractFunctionConfig<
  TAbi,
  TFunctionName,
  "payable" | "nonpayable"
> &
  GetValue<TAbi, TFunctionName, bigint>;

export type PopulatedTransactionSimulateParams = {
  chain?: Chain;
  dataSuffix?: Hex;
  account: Account | Address;
} & Omit<CallParameters, "batch" | "to" | "data" | "value">;

export type PopulatedTransactionEstimateParams = {
  chain?: Chain;
  dataSuffix?: Hex;
} & Omit<EstimateGasParameters, "data" | "to" | "value">;

export class PopulatedTransaction<TAbi extends Abi, TFunctionName extends string> {
  constructor(public readonly params: PopulatedTransactionParams<TAbi, TFunctionName>) {}

  async simulate(
    client: PublicClient,
    args: PopulatedTransactionSimulateParams,
  ): Promise<SimulateContractReturnType<TAbi, TFunctionName>> {
    return client.simulateContract({
      ...args,
      abi: this.params.abi,
      functionName: this.params.functionName,
      address: this.params.address,
      args: this.params.args ?? [],
      value: this.params.value ?? 0n,
    } as any);
  }

  async estimate(
    client: PublicClient,
    args: PopulatedTransactionEstimateParams,
  ): Promise<EstimateContractGasReturnType> {
    return client.estimateContractGas({
      ...args,
      abi: this.params.abi,
      functionName: this.params.functionName,
      address: this.params.address,
      args: this.params.args ?? [],
      value: this.params.value ?? 0n,
    } as any);
  }
}

export type ContractCallParameters<
  T extends {
    [key: string]: any;
  } = {},
> = T &
  (
    | {
        blockTag?: BlockTag;
        blockNumber?: never;
      }
    | {
        blockNumber?: BlockNumber;
        blockTag?: never;
      }
  );

export function readContract<TAbi extends Abi = Abi, TFunctionName extends string = string>(
  client: PublicClient,
  args: ContractCallParameters,
  params: ReadContractParameters<TAbi, TFunctionName>,
): Promise<ReadContractReturnType<TAbi, TFunctionName>> {
  return viemReadContract(
    client,
    Object.assign({}, params, {
      ...(args.blockNumber !== undefined ? { blockNumber: args.blockNumber } : {}),
      ...(args.blockTag !== undefined ? { blockTag: args.blockTag } : {}),
    }) as ReadContractParameters<TAbi, TFunctionName>,
  );
}

export function simulateContract<TAbi extends Abi = Abi, TFunctionName extends string = string>(
  client: PublicClient,
  args: ContractCallParameters,
  params: SimulateContractParameters<TAbi, TFunctionName>,
): Promise<SimulateContractReturnType<TAbi, TFunctionName>> {
  return viemSimulateContract(
    client,
    Object.assign({}, params, {
      ...(args.blockNumber !== undefined ? { blockNumber: args.blockNumber } : {}),
      ...(args.blockTag !== undefined ? { blockTag: args.blockTag } : {}),
    }) as SimulateContractParameters<TAbi, TFunctionName>,
  );
}
