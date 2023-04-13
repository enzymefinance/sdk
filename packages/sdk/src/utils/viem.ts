import type { Abi, Narrow } from "abitype";
import type { ExtractAbiFunctionNames } from "abitype";
import type { GetFunctionArgs } from "viem";

export type PrepareFunctionParamsArgs<TAbi extends Abi, TFunctionName extends ExtractAbiFunctionNames<TAbi>> = {
  abi: Narrow<TAbi>;
  functionName: TFunctionName;
} & GetFunctionArgs<TAbi, TFunctionName>;

export function prepareFunctionParams<TAbi extends Abi, TFunctionName extends string>({
  abi,
  args,
  functionName,
}: PrepareFunctionParamsArgs<TAbi, TFunctionName>) {
  const output: {
    abi: Narrow<TAbi>;
    functionName: TFunctionName;
  } & GetFunctionArgs<TAbi, TFunctionName> = {
    functionName: functionName as TFunctionName,
    abi,
    ...((args !== undefined ? { args } : {}) as GetFunctionArgs<TAbi, TFunctionName>),
  };

  return output;
}
