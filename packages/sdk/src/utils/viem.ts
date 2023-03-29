import type { Abi, Narrow } from "abitype";
import type { ExtractArgsFromAbi, ExtractFunctionNameFromAbi } from "viem";

export type FunctionParams<TAbi extends Abi | readonly unknown[] = Abi, TFunctionName extends string = string> = {
  abi: Narrow<TAbi>;
  functionName: ExtractFunctionNameFromAbi<TAbi, TFunctionName>;
} & ExtractArgsFromAbi<TAbi, TFunctionName>;

export function prepareFunctionParams<TAbi extends Abi | readonly unknown[], TFunctionName extends string>({
  abi,
  args,
  functionName,
}: FunctionParams<TAbi, TFunctionName>) {
  const output: {
    abi: Narrow<TAbi>;
    args: ExtractArgsFromAbi<TAbi, TFunctionName>["args"];
    functionName: TFunctionName;
  } = {
    functionName: functionName as TFunctionName,
    abi,
    args,
  };

  return output;
}
