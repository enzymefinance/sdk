import type {
  Abi,
  Account,
  Address,
  BlockNumber,
  BlockTag,
  CallParameters,
  Chain,
  ContractFunctionName,
  ContractFunctionParameters,
  EstimateContractGasReturnType,
  EstimateGasParameters,
  GetValue,
  Hex,
  PublicClient,
  SimulateContractReturnType,
} from "viem";

export type PopulatedTransactionParams<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, "payable" | "nonpayable"> = ContractFunctionName<
    TAbi,
    "payable" | "nonpayable"
  >,
> = ContractFunctionParameters<TAbi, "payable" | "nonpayable", TFunctionName> & GetValue<TAbi, TFunctionName, bigint>;

export type PopulatedTransactionSimulateParams = {
  chain?: Chain;
  dataSuffix?: Hex;
  account: Account | Address;
} & Omit<CallParameters, "batch" | "to" | "data" | "value">;

export type PopulatedTransactionEstimateParams = {
  chain?: Chain;
  dataSuffix?: Hex;
} & Omit<EstimateGasParameters, "data" | "to" | "value">;

export class PopulatedTransaction<
  TAbi extends Abi,
  TFunctionName extends ContractFunctionName<TAbi, "payable" | "nonpayable"> = ContractFunctionName<
    TAbi,
    "payable" | "nonpayable"
  >,
> {
  constructor(public readonly params: PopulatedTransactionParams<TAbi, TFunctionName>) {}

  simulate(
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

  estimate(client: PublicClient, args: PopulatedTransactionEstimateParams): Promise<EstimateContractGasReturnType> {
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

export type BlockParameters =
  | {
      blockTag?: BlockTag;
      blockNumber?: never;
    }
  | {
      blockNumber?: BlockNumber;
      blockTag?: never;
    };

export function extractBlockParameters(args: BlockParameters): BlockParameters {
  return {
    ...(args.blockNumber !== undefined ? { blockNumber: args.blockNumber } : {}),
    ...(args.blockTag !== undefined ? { blockTag: args.blockTag } : {}),
  } as BlockParameters;
}
