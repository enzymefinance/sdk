import type { Abi, Narrow } from "abitype";
import type { ExtractAbiFunctionNames } from "abitype";
import { GetFunctionArgs, Hex, decodeFunctionData as decodeFunctionDataViem } from "viem";

export type FunctionParams<TAbi extends Abi, TFunctionName extends ExtractAbiFunctionNames<TAbi>> = {
  abi: Narrow<TAbi>;
  functionName: TFunctionName;
} & GetFunctionArgs<TAbi, TFunctionName>;

export function prepareFunctionParams<TAbi extends Abi, TFunctionName extends string>({
  abi,
  args,
  functionName,
}: FunctionParams<TAbi, TFunctionName>) {
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

export type DecodeFunctionDataParameters<TAbi extends Abi | readonly unknown[]> = {
  abi: TAbi;
  data: Hex;
};

export type DecodeFunctionDataReturnType<
  TAbi extends Abi | readonly unknown[],
  _FunctionNames extends string = TAbi extends Abi
    ? Abi extends TAbi
      ? string
      : ExtractAbiFunctionNames<TAbi>
    : string,
> = {
  [TName in _FunctionNames]: {
    args: GetFunctionArgs<TAbi, TName>["args"];
    functionName: TName;
  };
}[_FunctionNames];

export function decodeFunctionData<TAbi extends Abi>({
  data,
  abi,
}: {
  data: Hex;
  abi: TAbi;
}) {
  return decodeFunctionDataViem({
    abi,
    data,
  }) as DecodeFunctionDataReturnType<TAbi>;
}
