import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Action } from "../Portfolio/IntegrationAdapter.js";
import { callExtension } from "./Extensions.js";

export type UseParams<TArgs> = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `IntegrationManager` contract.
   */
  integrationManager: Address;
  /**
   * The address of the integration adapter contract.
   */
  integrationAdapter: Address;
  /**
   * The adapter call parameters (e.g. trade parameters).
   */
  callArgs: TArgs;
};

export function makeUse<TArgs>(selector: Hex, encode: (args: TArgs) => Hex) {
  return function useIntegration(args: UseParams<TArgs>) {
    return call({
      comptrollerProxy: args.comptrollerProxy,
      integrationManager: args.integrationManager,
      functionSelector: selector,
      integrationAdapter: args.integrationAdapter,
      callArgs: encode(args.callArgs),
    });
  };
}

//--------------------------------------------------------------------------------------------
// CALL ON INTEGRATION
//--------------------------------------------------------------------------------------------

const callEncoding = [
  {
    type: "address",
    name: "adapter",
  },
  {
    type: "bytes4",
    name: "selector",
  },
  {
    type: "bytes",
    name: "integrationData",
  },
] as const;

export type CallArgs = {
  functionSelector: Hex;
  integrationAdapter: Address;
  callArgs?: Hex | undefined;
};

export function encodeCall(args: CallArgs): Hex {
  return encodeAbiParameters(callEncoding, [args.integrationAdapter, args.functionSelector, args.callArgs ?? "0x"]);
}

export function decodeCall(encoded: Hex): CallArgs {
  const [integrationAdapter, functionSelector, callArgs] = decodeAbiParameters(callEncoding, encoded);

  return {
    integrationAdapter,
    functionSelector,
    callArgs,
  };
}

export type CallParams = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `IntegrationManager` contract.
   */
  integrationManager: Address;
  /**
   * The address of the integration adapter contract.
   */
  integrationAdapter: Address;
  /**
   * The selector of the function to call on the integration adapter.
   */
  functionSelector: Hex;
  /**
   * The adapter call parameters (e.g. trade parameters).
   */
  callArgs?: Hex | undefined;
};

export function call(args: CallParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    extensionManager: args.integrationManager,
    actionId: Action.CallOnIntegration,
    callArgs: encodeCall({
      functionSelector: args.functionSelector,
      integrationAdapter: args.integrationAdapter,
      callArgs: args.callArgs ?? "0x",
    }),
  });
}

//--------------------------------------------------------------------------------------------
// ADD TRACKED ASSET
//--------------------------------------------------------------------------------------------

const addTrackedAssetsEncoding = [
  {
    type: "address[]",
    name: "assets",
  },
] as const;

export type AddTracketAssetsArgs = {
  addAssets: ReadonlyArray<Address>;
};

export function addTrackedAssetsEncode(args: AddTracketAssetsArgs): Hex {
  return encodeAbiParameters(addTrackedAssetsEncoding, [args.addAssets]);
}

export function addTracketAssetsDecode(encoded: Hex): AddTracketAssetsArgs {
  const [addAssets] = decodeAbiParameters(addTrackedAssetsEncoding, encoded);

  return {
    addAssets,
  };
}

export type AddTracketAssetsParams = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `IntegrationManager` contract.
   */
  integrationManager: Address;
  /**
   * The adapter call parameters (e.g. trade parameters).
   */
  addAssets: ReadonlyArray<Address>;
};

export function addTrackedAssets(args: AddTracketAssetsParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    extensionManager: args.integrationManager,
    actionId: Action.AddTrackedAssets,
    callArgs: addTrackedAssetsEncode({
      addAssets: args.addAssets,
    }),
  });
}

//--------------------------------------------------------------------------------------------
// REMOVE TRACKED ASSET
//--------------------------------------------------------------------------------------------

const removeTracketAssetsEncoding = [
  {
    type: "address[]",
    name: "assets",
  },
] as const;

export type RemoveTrackedAssetsArgs = {
  removeAssets: ReadonlyArray<Address>;
};

export function encodeRemoveTrackedAssets(args: RemoveTrackedAssetsArgs): Hex {
  return encodeAbiParameters(removeTracketAssetsEncoding, [args.removeAssets]);
}

export function decodeRemoveTrackedAssets(encoded: Hex): RemoveTrackedAssetsArgs {
  const [removeAssets] = decodeAbiParameters(removeTracketAssetsEncoding, encoded);

  return {
    removeAssets,
  };
}

export type RemoveTrackedAssetsParams = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `IntegrationManager` contract.
   */
  integrationManager: Address;
  /**
   * The adapter call parameters (e.g. trade parameters).
   */
  removeAssets: ReadonlyArray<Address>;
};

export function removeTracketAssets(args: RemoveTrackedAssetsParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    extensionManager: args.integrationManager,
    actionId: Action.RemoveTrackedAssets,
    callArgs: encodeRemoveTrackedAssets({
      removeAssets: args.removeAssets,
    }),
  });
}
