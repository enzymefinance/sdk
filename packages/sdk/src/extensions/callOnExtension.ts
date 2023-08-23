import { prepareFunctionParams } from "../utils/viem.js";
import { IComptroller } from "@enzymefinance/abis/IComptroller";
import { type Address, type Hex, decodeFunctionData, getAbiItem } from "viem";

export type CallOnExtensionParams = {
  /**
   * The address of the extension to call.
   */
  extension: Address;
  /**
   * The action ID of the extension to call.
   */
  actionId: ExternalPositionManagerActionId;
  /**
   * The encoded arguments to pass to the extension.
   */
  callArgs: Hex;
};

/**
 * Prepare the parameters for the `callOnExtension` function.
 *
 * @returns The prepared parameters to be encoded.
 */
export function prepareCallOnExtensionParams({ extension, actionId, callArgs }: CallOnExtensionParams) {
  return prepareFunctionParams({
    abi: getAbiItem({ abi: IComptroller, name: "callOnExtension" }),
    args: [extension, actionId, callArgs],
  });
}

type ExternalPositionManagerActionIdValue =
  typeof ExternalPositionManagerActionId[keyof typeof ExternalPositionManagerActionId];

function assertExternalPositionManagerActionIdValue(
  value: bigint,
): asserts value is ExternalPositionManagerActionIdValue {
  if (!Object.values(ExternalPositionManagerActionId).includes(value as ExternalPositionManagerActionIdValue)) {
    throw new Error(`Invalid ExternalPositionManagerActionId: ${value}`);
  }
}

/**
 * Decodes the parameters for the `callOnExtension` function.
 *
 * @param params The encoded parameters.
 * @returns The decoded parameters.
 */
export function decodeCallOnExtensionParams(params: Hex): CallOnExtensionParams {
  const abi = getAbiItem({ abi: IComptroller, name: "callOnExtension" });
  const {
    args: [extension, actionId, callArgs],
  } = decodeFunctionData({
    abi: [abi],
    data: params,
  });

  assertExternalPositionManagerActionIdValue(actionId);

  return {
    extension,
    actionId,
    callArgs,
  };
}

export type ExternalPositionManagerActionId =
  typeof ExternalPositionManagerActionId[keyof typeof ExternalPositionManagerActionId];
export const ExternalPositionManagerActionId = {
  CreateExternalPosition: 0n,
  CallOnExternalPosition: 1n,
  RemoveExternalPosition: 2n,
  ReactivateExternalPosition: 3n,
} as const;

export type IntegrationManagerActionId = typeof IntegrationManagerActionId[keyof typeof IntegrationManagerActionId];
export const IntegrationManagerActionId = {
  CallOnIntegration: 0n,
  AddTrackedAssetsToVault: 1n,
  RemoveTrackedAssetsFromVault: 2n,
} as const;
