import type { AbiFunction } from "abitype";
import type { BlockNumber, BlockTag, GetFunctionArgs } from "viem";

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
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
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
