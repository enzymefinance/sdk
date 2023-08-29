import type { Abi } from "abitype";
import {
  http,
  type Chain,
  type PublicClient,
  type Transport,
  createPublicClient,
  createTestClient,
  encodeFunctionData,
} from "viem";
import { localhost, mainnet, polygon } from "viem/chains";
import type { SimulateContractParameters, WriteContractParameters } from "viem/contract";
import { parseAccount } from "viem/utils";
import { approveSpend } from "./actions/approveSpend.js";
import { assertBalanceOf } from "./actions/assertBalanceOf.js";
import { buyShares } from "./actions/buyShares.js";
import { createTestVault } from "./actions/createTestVault.js";
import { deal } from "./actions/deal.js";
import { deployGasRelayPaymaster } from "./actions/deployGasRelayPaymaster.js";
import { getBalanceOf } from "./actions/getBalanceOf.js";
import { getGasRelayPaymaster } from "./actions/getGasRelayPaymaster.js";
import { getRecipientForFund } from "./actions/getRecipientForFund.js";
import { increaseTimeAndMine } from "./actions/increaseTimeAndMine.js";
import { isAssetManager, isAssetManagers } from "./actions/isAssetManager.js";
import { setFreelyTransferableShares } from "./actions/setFreelyTransferableShares.js";
import { setNominatedOwner } from "./actions/setNominatedOwner.js";
import { setRecipientForFund } from "./actions/setRecipientForFund.js";
import { overrideValueInterpreter } from "./actions/setStatelRateThreshold.js";
import { sharesAreFreelyTransferable } from "./actions/sharesAreFreelyTransferable.js";
import { transferToken } from "./actions/transferToken.js";
import { usesAutoProcolFeeSharesBuyBack } from "./actions/usesAutoProcolFeeSharesBuyBack.js";
import { wrapEther } from "./actions/wrapEther.js";

export const testActions = {
  createTestVault,
  deal,
  wrapEther,
  approveSpend,
  buyShares,
  getBalanceOf,
  increaseTimeAndMine,
  isAssetManagers,
  isAssetManager,
  assertBalanceOf,
  usesAutoProcolFeeSharesBuyBack,
  setNominatedOwner,
  overrideValueInterpreter,
  transferToken,
  setRecipientForFund,
  getRecipientForFund,
  setFreelyTransferableShares,
  sharesAreFreelyTransferable,
  deployGasRelayPaymaster,
  getGasRelayPaymaster,
};

export const anvilMainnet = {
  ...localhost,
  id: mainnet.id,
  contracts: mainnet.contracts,
} as const satisfies Chain;

export const poolId = Number(process.env.VITEST_POOL_ID ?? 1);

export const testClientMainnet = createTestClient({
  chain: anvilMainnet,
  mode: "anvil",
  transport: http(`http://127.0.0.1:8545/${1000 + poolId}`, {
    timeout: 150_000,
  }),
});

export const publicClientMainnet = createPublicClient({
  chain: anvilMainnet,
  transport: http(`http://127.0.0.1:8545/${1000 + poolId}`, {
    timeout: 150_000,
  }),
});

export const anvilPolygon = {
  ...localhost,
  id: polygon.id,
  contracts: polygon.contracts,
} as const satisfies Chain;

export const testClientPolygon = createTestClient({
  chain: anvilPolygon,
  mode: "anvil",
  transport: http(`http://127.0.0.1:8545/${2000 + poolId}`, {
    timeout: 150_000,
  }),
});

export const publicClientPolygon = createPublicClient({
  chain: anvilPolygon,
  transport: http(`http://127.0.0.1:8545/${2000 + poolId}`, {
    timeout: 150_000,
  }),
});

export async function sendTestTransaction<TAbi extends Abi | readonly unknown[], TFunctionName extends string = string>(
  args: SimulateContractParameters<TAbi, TFunctionName> & { network?: "mainnet" | "polygon" },
) {
  const publicClient = args.network === "polygon" ? publicClientPolygon : publicClientMainnet;
  const testClient = args.network === "polygon" ? testClientPolygon : testClientMainnet;

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
  const { request, result } = await publicClient.simulateContract(args as any);
  const account = parseAccount(request.account);
  const params = request as unknown as WriteContractParameters;

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
