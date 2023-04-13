import type { Abi } from "abitype";
import { parseAccount } from "viem/utils";
import { encodeFunctionData, type TestClient, type Chain, type Transport, type PublicClient } from "viem";
import type { SimulateContractParameters, WriteContractParameters } from "viem/contract";

export function createTestSender<TTransport extends Transport, TChain extends Chain | undefined = undefined>(
  testClient: TestClient<"anvil", TTransport, TChain, true>,
  publicClient: PublicClient<TTransport, TChain, true>,
) {
  return async function sendTestTransaction<
    TAbi extends Abi | readonly unknown[],
    TFunctionName extends string = string,
    TChainOverride extends Chain | undefined = undefined,
  >(args: SimulateContractParameters<TAbi, TFunctionName, TChain, TChainOverride>) {
    const { request, result } = await publicClient.simulateContract(args);
    const account = parseAccount(request.account);

    // rome-ignore lint/suspicious/noExplicitAny: expand the generic type to include all the optional parameters.
    const params = request as any as WriteContractParameters<TAbi, TFunctionName, TChain> & {
      value?: bigint;
    };

    // We simply pretend that the simulation is always correct. This is not going to work outside of a pristine, isolated, test environment.
    await testClient.impersonateAccount(account);

    const hash = await testClient.sendUnsignedTransaction({
      from: account.address,
      to: params.address,
      data: encodeFunctionData(params),
      ...(params.value === undefined ? {} : { value: params.value }),
      ...(params.nonce === undefined ? {} : { nonce: params.nonce }),
      ...(params.gas === undefined ? {} : { gas: params.gas }),
      ...(params.gasPrice === undefined ? {} : { gas: params.gasPrice }),
      ...(params.accessList === undefined ? {} : { accessList: params.accessList }),
      ...(params.maxFeePerGas === undefined ? {} : { maxFeePerGas: params.maxFeePerGas }),
      ...(params.maxPriorityFeePerGas === undefined ? {} : { maxPriorityFeePerGas: params.maxPriorityFeePerGas }),
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    return { request, result, receipt, hash };
  };
}
