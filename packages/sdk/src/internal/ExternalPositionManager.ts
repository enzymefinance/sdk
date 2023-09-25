import type { Types } from "@enzymefinance/sdk/Utils";
import { type PopulatedExtensionCall, callExtension } from "@enzymefinance/sdk/internal/Extensions";
import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type Action = typeof Action[keyof typeof Action];
export const Action = {
  CreateExternalPosition: 0n,
  CallOnExternalPosition: 1n,
  RemoveExternalPosition: 2n,
  ReactivateExternalPosition: 3n,
} as const;

export type UseParams<TArgs> = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `ExternalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The address of the external position proxy contract.
   */
  externalPositionProxy: Address;
  /**
   * The external position call parameters.
   */
  callArgs: TArgs;
};

export function makeUse(action: bigint): (args: UseParams<never>) => PopulatedExtensionCall;
export function makeUse<TArgs>(
  action: bigint,
  encoder: (args: TArgs) => Hex,
): (args: UseParams<TArgs>) => PopulatedExtensionCall;
export function makeUse<TArgs>(action: bigint, encoder?: (args: TArgs) => Hex) {
  return function useExternalPosition(args: UseParams<TArgs>) {
    return call({
      comptrollerProxy: args.comptrollerProxy,
      externalPositionManager: args.externalPositionManager,
      externalPositionProxy: args.externalPositionProxy,
      actionId: action,
      actionArgs: encoder !== undefined ? encoder(args.callArgs) : "0x",
    });
  };
}

export type CreateAndUseParams<TArgs> = {
  /**
   * The external position type id.
   */
  typeId: bigint;
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `ExternalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The data used to initialize the external position.
   */
  initializationData?: Hex | undefined;
  /**
   * The adapter call parameters (e.g. trade parameters).
   */
  callArgs: TArgs;
};

export function makeCreateAndUse(action: bigint): (args: CreateAndUseParams<never>) => PopulatedExtensionCall;
export function makeCreateAndUse<TArgs>(
  action: bigint,
  encoder: (args: TArgs) => Hex,
): (args: CreateAndUseParams<TArgs>) => PopulatedExtensionCall;
export function makeCreateAndUse<TArgs>(action: bigint, encoder?: (args: TArgs) => Hex) {
  return function createAndUse(args: CreateAndUseParams<TArgs>) {
    const encoded = encoder !== undefined ? encoder(args.callArgs) : "0x";

    return create({
      typeId: args.typeId,
      comptrollerProxy: args.comptrollerProxy,
      externalPositionManager: args.externalPositionManager,
      initializationData: args.initializationData,
      callArgs: encodeCall({
        actionId: action,
        actionArgs: encoded,
        externalPositionProxy: "0x",
      }),
    });
  };
}

//--------------------------------------------------------------------------------------------
// CALL ON EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

const callEncoding = [
  {
    type: "address",
    name: "externalPositionProxy",
  },
  {
    name: "actionId",
    type: "uint256",
  },
  {
    type: "bytes",
    name: "actionArgs",
  },
] as const;

export type CallArgs = {
  externalPositionProxy: Address;
  actionId: bigint;
  actionArgs?: Hex | undefined;
};

export function encodeCall(args: CallArgs): Hex {
  return encodeAbiParameters(callEncoding, [args.externalPositionProxy, args.actionId, args.actionArgs ?? "0x"]);
}

export function decodeCall(params: Hex): CallArgs {
  const [externalPositionProxy, actionId, actionArgs] = decodeAbiParameters(callEncoding, params);

  return {
    externalPositionProxy,
    actionId,
    actionArgs,
  };
}

export type CallParams = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `ExternalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The address of the external position proxy contract.
   */
  externalPositionProxy: Address;
  /**
   * The id of the action to invoke on the external position.
   */
  actionId: bigint;
  /**
   * The external position call parameters.
   */
  actionArgs: Hex;
};

export function call(args: CallParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    extensionManager: args.externalPositionManager,
    actionId: Action.CallOnExternalPosition,
    callArgs: encodeCall({
      externalPositionProxy: args.externalPositionProxy,
      actionId: args.actionId,
      actionArgs: args.actionArgs,
    }),
  });
}

//--------------------------------------------------------------------------------------------
// CREATE EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

const createEncoding = [
  {
    name: "typeId",
    type: "uint256",
  },
  {
    type: "bytes",
    name: "initializationData",
  },
  {
    type: "bytes",
    name: "callOnExternalPositionCallArgs",
  },
] as const;

export type CreateArgs = {
  typeId: bigint;
  initializationData?: Hex | undefined;
  callArgs?: Hex | undefined;
};

export function encodeCreate(args: CreateArgs): Hex {
  return encodeAbiParameters(createEncoding, [args.typeId, args.initializationData ?? "0x", args.callArgs ?? "0x"]);
}

export function decodeCreate(encoded: Hex): CreateArgs {
  const [typeId, initializationData, callArgs] = decodeAbiParameters(createEncoding, encoded);

  return {
    typeId,
    initializationData,
    callArgs,
  };
}

export type CreateParams = {
  /**
   * The external position type id.
   */
  typeId: bigint;
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `ExternalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The data used to initialize the external position.
   *
   * TODO: What exactly is this?
   */
  initializationData?: Hex | undefined;
  /**
   * The external position call parameters.
   */
  callArgs?: Hex | undefined;
};

export function create(args: CreateParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    extensionManager: args.externalPositionManager,
    actionId: Action.CreateExternalPosition,
    callArgs: encodeCreate({
      typeId: args.typeId,
      initializationData: args.initializationData,
      callArgs: args.callArgs ?? "0x",
    }),
  });
}

export function createOnly(args: Types.Prettify<Omit<CreateParams, "callArgs">>) {
  return create({ ...args, callArgs: "0x" });
}

//--------------------------------------------------------------------------------------------
// REACTIVATE EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

const reactivateEncoding = [
  {
    name: "externalPosition",
    type: "address",
  },
] as const;

export type ReactivateArgs = {
  externalPositionProxy: Address;
};

export function encodeReactivate(args: ReactivateArgs): Hex {
  return encodeAbiParameters(reactivateEncoding, [args.externalPositionProxy]);
}

export function decodeReactivate(callArgs: Hex): ReactivateArgs {
  const [externalPositionProxy] = decodeAbiParameters(reactivateEncoding, callArgs);

  return {
    externalPositionProxy,
  };
}

export type ReactivateParams = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `ExternalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The address of the external position proxy contract.
   */
  externalPositionProxy: Address;
};

export function reactivate(args: ReactivateParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    extensionManager: args.externalPositionManager,
    actionId: Action.ReactivateExternalPosition,
    callArgs: encodeReactivate({
      externalPositionProxy: args.externalPositionProxy,
    }),
  });
}

//--------------------------------------------------------------------------------------------
// REMOVE EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

const removeEncoding = [
  {
    name: "externalPosition",
    type: "address",
  },
] as const;

export type RemoveArgs = {
  externalPositionProxy: Address;
};

export function encodeRemove(args: RemoveArgs): Hex {
  return encodeAbiParameters(removeEncoding, [args.externalPositionProxy]);
}

export function decodeRemove(callArgs: Hex): RemoveArgs {
  const [externalPositionProxy] = decodeAbiParameters(removeEncoding, callArgs);

  return {
    externalPositionProxy,
  };
}

export type RemoveParams = {
  /**
   * The address of the vault's `ComptrollerProxy` contract.
   */
  comptrollerProxy: Address;
  /**
   * The address of the `ExternalPositionManager` contract.
   */
  externalPositionManager: Address;
  /**
   * The address of the external position proxy contract.
   */
  externalPositionProxy: Address;
};

export function remove(args: RemoveParams) {
  return callExtension({
    comptrollerProxy: args.comptrollerProxy,
    extensionManager: args.externalPositionManager,
    actionId: Action.RemoveExternalPosition,
    callArgs: encodeRemove({
      externalPositionProxy: args.externalPositionProxy,
    }),
  });
}
