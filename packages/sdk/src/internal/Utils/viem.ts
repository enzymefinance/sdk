import type { AbiFunction } from "abitype";
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
  GetFunctionArgs,
  GetValue,
  Hex,
  PublicClient,
  SimulateContractReturnType,
  Transport,
} from "viem";

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

export type PrepareFunctionParamsArgs<TFunction extends AbiFunction,> = {
  abi: TFunction;
} & GetFunctionArgs<[TFunction], TFunction["name"]>;

export type PrepareFunctionParamsReturnType<TFunction extends AbiFunction> = {
  functionName: TFunction["name"];
  abi: [TFunction];
} & GetFunctionArgs<[TFunction], TFunction["name"]>;

export function prepareFunctionParams<TFunction extends AbiFunction>({
  abi,
  args,
}: PrepareFunctionParamsArgs<TFunction>): PrepareFunctionParamsReturnType<TFunction> {
  return {
    functionName: abi.name,
    abi: [abi],
    ...(args !== undefined ? { args } : {}),
  } as PrepareFunctionParamsReturnType<TFunction>;
}

export function readContractParameters(args: ReadContractParameters) {
  if ("blockTag" in args) {
    return { blockTag: args.blockTag };
  }

  if ("blockNumber" in args) {
    return { blockNumber: args.blockNumber };
  }

  return undefined;
}

export type ReadContractParameters<
  T extends {
    [key: string]: any;
    // rome-ignore lint/nursery/noBannedTypes: <explanation>
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
