import { encodeFunctionData, TestClient, Chain, Transport, PublicClient, AbiItem } from "viem";
import { SimulateContractParameters, SimulateContractReturnType, WriteContractParameters } from "viem/contract";

export function createTestSender<TTransport extends Transport>(testClient: TestClient<TTransport>) {
  return async function sendTestTransaction<
    TTransport extends Transport,
    TChain extends Chain,
    TClient extends PublicClient<TTransport, TChain, true>,
    TAbi extends AbiItem[] | readonly unknown[] = AbiItem[],
    TFunctionName extends string = string,
    TChainOverride extends Chain | undefined = undefined,
  >(
    publicClient: TClient,
    args: SimulateContractParameters<TChain, TAbi, TFunctionName, TChainOverride>,
  ): Promise<SimulateContractReturnType<TChain, TAbi, TFunctionName>["result"]> {
    const { request, result } = await publicClient.simulateContract(args);
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    const params = request as any as WriteContractParameters;

    // We simply pretend that the simulation is always correct. This is not going to work outside of a pristine, isolated, test environment.
    await testClient.impersonateAccount(request.account);
    await testClient.sendUnsignedTransaction({
      from: params.account.address,
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

    return result;
  };
}
