import type { Abi } from "abitype";
import { encodeFunctionData, createTestClient, createPublicClient, type Chain, http } from "viem";
import { localhost, mainnet } from "viem/chains";
import { parseAccount } from "viem/utils";
import type { SimulateContractParameters, WriteContractParameters } from "viem/contract";
import { approveSpend } from "./actions/approveSpend.js";
import { buyShares } from "./actions/buyShares.js";
import { createTestVault } from "./actions/createTestVault.js";
import { wrapEther } from "./actions/wrapEther.js";
import { getBalanceOf } from "./actions/getBalanceOf.js";
import { increaseTimeAndMine } from "./actions/increaseTimeAndMine.js";
import { assertBalanceOf } from "./actions/assertBalanceOf.js";
import { usesAutoProcolFeeSharesBuyBack } from "./actions/doesAutoProtocolFeeSharesBuyback.js";

export const testActions = {
  createTestVault,
  wrapEther,
  approveSpend,
  buyShares,
  getBalanceOf,
  increaseTimeAndMine,
  assertBalanceOf,
  usesAutoProcolFeeSharesBuyBack,
};

export const anvil = {
  ...localhost,
  id: 1,
  contracts: mainnet.contracts,
} as const satisfies Chain;

export const testClient = createTestClient({
  chain: anvil,
  mode: "anvil",
  transport: http(`http://127.0.0.1:8545/${process.env.VITEST_POOL_ID ?? 1}`),
});

export const publicClient = createPublicClient({
  chain: anvil,
  transport: http(`http://127.0.0.1:8545/${process.env.VITEST_POOL_ID ?? 1}`),
});

export async function sendTestTransaction<TAbi extends Abi | readonly unknown[], TFunctionName extends string = string>(
  args: SimulateContractParameters<TAbi, TFunctionName, typeof anvil>,
) {
  const { request, result } = await publicClient.simulateContract(args);
  const account = parseAccount(request.account);

  // rome-ignore lint/suspicious/noExplicitAny: expand the generic type to include all the optional parameters.
  const params = request as any as WriteContractParameters<TAbi, TFunctionName, typeof anvil> & {
    value?: bigint;
  };

  // We simply pretend that the simulation is always correct. This is not going to work outside of a pristine, isolated, test environment.
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
}
