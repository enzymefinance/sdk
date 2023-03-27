import { encodeFunctionData, TestClient } from "viem";
import { SimulateContractReturnType } from "viem/contract";

export async function sendSimulatedTransactionUnsafe<TSimulation extends SimulateContractReturnType>(
  client: TestClient,
  simulation: TSimulation,
): Promise<TSimulation["result"]> {
  const { request, result } = simulation;

  // We simply pretend that the simulation is always correct. This is not going to work outside of a pristine, isolated, test environment.
  await client.impersonateAccount(simulation.request.account);
  await client.sendUnsignedTransaction({
    from: request.account.address,
    to: request.address,
    data: encodeFunctionData(request),
    ...(request.value === undefined ? {} : { value: request.value }),
    ...(request.nonce === undefined ? {} : { nonce: request.nonce }),
    ...(request.gas === undefined ? {} : { gas: request.gas }),
    ...(request.gasPrice === undefined ? {} : { gas: request.gasPrice }),
    ...(request.accessList === undefined ? {} : { accessList: request.accessList }),
    ...(request.maxFeePerGas === undefined ? {} : { maxFeePerGas: request.maxFeePerGas }),
    ...(request.maxPriorityFeePerGas === undefined ? {} : { maxPriorityFeePerGas: request.maxPriorityFeePerGas }),
  });

  return result;
}
