import { ContractFunctionExecutionError, ContractFunctionRevertedError } from "viem";

export function createTestRevert(message: string) {
  return new ContractFunctionExecutionError(
    new ContractFunctionRevertedError({
      abi: [],
      functionName: "",
      message,
    }),
    {
      abi: [],
      functionName: "",
    },
  );
}
