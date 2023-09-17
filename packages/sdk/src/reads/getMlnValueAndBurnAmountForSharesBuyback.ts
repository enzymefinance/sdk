import { IComptrollerLib } from "../../../abis/src/abis/IComptrollerLib.js";
import { IValueInterpreter } from "../../../abis/src/abis/IValueInterpreter.js";
import { IVaultLib } from "../../../abis/src/abis/IVaultLib.js";
import { invariant } from "../utils/assertions.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import { getComptrollerProxy } from "./getComptrollerProxy.js";
import type { Address, PublicClient } from "viem";

export async function getMlnValueAndBurnAmountForSharesBuyback(
  client: PublicClient,
  args: ReadContractParameters<{
    denominationAsset: Address;
    buybackSharesAmount: bigint;
    mln: Address;
    valueInterpreter: Address;
    vaultProxy: Address;
    comptrollerProxy?: Address;
  }>,
) {
  const [sharesSupply, _comptrollerProxy] = await Promise.all([
    client.readContract({
      ...readContractParameters(args),
      abi: IVaultLib,
      functionName: "totalSupply",
      address: args.vaultProxy,
    }),
    ...(args.comptrollerProxy === undefined ? [getComptrollerProxy(client, { vaultProxy: args.vaultProxy })] : []),
  ]);

  const comptrollerProxy = args.comptrollerProxy ?? _comptrollerProxy;

  invariant(comptrollerProxy !== undefined, "Comptroller is undefined");

  const { result: gav } = await client.simulateContract({
    ...readContractParameters(args),
    abi: IComptrollerLib,
    functionName: "calcGav",
    address: comptrollerProxy,
  });

  const denominationValue = (gav * args.buybackSharesAmount) / sharesSupply;

  const { result: mlnValueOfBuyback } = await client.simulateContract({
    ...readContractParameters(args),
    abi: IValueInterpreter,
    functionName: "calcCanonicalAssetValue",
    address: args.valueInterpreter,
    args: [args.denominationAsset, denominationValue, args.mln],
  });

  // 50% discount
  const mlnAmountToBurn = mlnValueOfBuyback / 2n;

  return { mlnAmountToBurn, mlnValue: mlnValueOfBuyback };
}
