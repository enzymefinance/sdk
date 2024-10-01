import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";
import { callExtension } from "./Extensions.js";

export type Action = (typeof Action)[keyof typeof Action];
export const Action = {
  CallOnIntegration: 0n,
  AddTrackedAssets: 1n,
  RemoveTrackedAssets: 2n,
} as const;

export type Selector = (typeof Selector)[keyof typeof Selector];
export const Selector = {
  ClaimRewards: "0xb9dfbacc", // claimRewards(address,bytes,bytes)
  Lend: "0x099f7515", // lend(address,bytes,bytes)
  LendAndStake: "0x29fa046e", // lendAndStake(address,bytes,bytes)
  Redeem: "0xc29fa9dd", // redeem(address,bytes,bytes)
  Stake: "0xfa7dd04d", // stake(address,bytes,bytes)
  TakeMultipleOrders: "0x0e7f692d", // takeMultipleOrders(address,bytes,bytes)
  TakeOrder: "0x03e38a2b", // takeOrder(address,bytes,bytes)
  Transfer: "0x3461917c", // transfer(address,bytes,bytes)
  Unstake: "0x68e30677", // unstake(address,bytes,bytes)
  UnstakeAndRedeem: "0x8334eb99", // unstakeAndRedeem(address,bytes,bytes)
} as const;

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

export function callEncode(args: CallArgs): Hex {
  return encodeAbiParameters(callEncoding, [args.integrationAdapter, args.functionSelector, args.callArgs ?? "0x"]);
}

export function callDecode(encoded: Hex): CallArgs {
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
    callArgs: callEncode({
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

export function removeTrackedAssetsEncode(args: RemoveTrackedAssetsArgs): Hex {
  return encodeAbiParameters(removeTracketAssetsEncoding, [args.removeAssets]);
}

export function removeTrackedAssetsDecode(encoded: Hex): RemoveTrackedAssetsArgs {
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
    callArgs: removeTrackedAssetsEncode({
      removeAssets: args.removeAssets,
    }),
  });
}
