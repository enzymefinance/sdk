import type { AbiFunction } from "abitype";
import type { GetFunctionArgs } from "viem";

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
