import { IVault } from "@enzymefinance/abis/IVault";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { getAbiItem, type Address, type Hex, decodeFunctionData } from "viem";

export type PrepareSetNominatedOwnerParams = {
  /**
   * The address of the to-be owner of the vault.
   *
   * @remarks
   *
   * After a new owner of the vault has been nominated, the to-be owner must accept the
   * nomination before the ownership will be transferred. This is a safe-guard mechanism
   * to prevent accidental ownership transfers or ownership transfers to addresses that
   * the new owner has lost control of or otherwise is unable to transact with.
   */
  nominatedOwner: Address;
};

/**
 * Prepare the parameters for the `setNominatedOwner` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareSetNominatedOwnerParams({ nominatedOwner }: PrepareSetNominatedOwnerParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IVault, name: "setNominatedOwner" }),
    args: [nominatedOwner],
  });
}

/**
 * Decodes the parameters for the `setNominatedOwner` function.
 *
 * @returns The decoded parameters.
 */
export function decodeSetNominatedOwnerParams(params: Hex): PrepareSetNominatedOwnerParams {
  const abi = getAbiItem({
    abi: IVault,
    name: "setNominatedOwner",
  });

  const decoded = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  const [nominatedOwner] = decoded.args;

  return {
    nominatedOwner,
  };
}
