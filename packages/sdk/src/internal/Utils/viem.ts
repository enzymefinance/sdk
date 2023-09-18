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
  Transport,
} from "viem";
import { readContract as viemReadContract, simulateContract as viemSimulateContract } from "viem/actions";

export type PopulatedTransactionParams<TFunctionName extends string, TAbi extends Abi> = ContractFunctionConfig<
  TAbi,
  TFunctionName,
  "payable" | "nonpayable"
> &
  GetValue<TAbi, TFunctionName, bigint>;

export type PopulatedTransactionSimulateParams<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain,
> = {
  chain?: TChainOverride;
  dataSuffix?: Hex;
  // TODO: Why is this not required by viem already? It's required for `estimateContractGas` ...
  account: Account | Address;
} & Omit<CallParameters<TChainOverride extends Chain ? TChainOverride : TChain>, "batch" | "to" | "data" | "value">;

export type PopulatedTransactionEstimateParams<
  TChain extends Chain | undefined = Chain,
  TChainOverride extends Chain | undefined = Chain,
> = {
  chain?: TChainOverride;
  dataSuffix?: Hex;
} & Omit<EstimateGasParameters<TChain>, "data" | "to" | "value">;

export class PopulatedTransaction<TFunctionName extends string, TAbi extends Abi> {
  constructor(public readonly params: PopulatedTransactionParams<TFunctionName, TAbi>) {}

  async simulate<TChain extends Chain | undefined = Chain, TChainOverride extends Chain | undefined = Chain>(
    client: PublicClient<Transport, TChain>,
    args: PopulatedTransactionSimulateParams<TChain, TChainOverride>,
  ): Promise<SimulateContractReturnType<TAbi, TFunctionName, TChain, TChainOverride>> {
    return client.simulateContract<TAbi, TFunctionName, TChainOverride>({
      ...args,
      abi: this.params.abi,
      functionName: this.params.functionName,
      address: this.params.address,
      args: this.params.args ?? [],
      value: this.params.value ?? 0n,
    } as any);
  }

  async estimate<TChain extends Chain | undefined = Chain, TChainOverride extends Chain | undefined = Chain>(
    client: PublicClient<Transport, TChain>,
    args: PopulatedTransactionEstimateParams<TChain, TChainOverride>,
  ): Promise<EstimateContractGasReturnType> {
    return client.estimateContractGas<TChain, TAbi, TFunctionName>({
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

export function readContract<TAbi extends Abi, TFunctionName extends string>(
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

export function simulateContract<TAbi extends Abi, TFunctionName extends string>(
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
