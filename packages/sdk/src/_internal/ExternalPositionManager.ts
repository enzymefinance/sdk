import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters, zeroAddress } from "viem";
import type { Types } from "../Utils.js";
import { type PopulatedExtensionCall, callExtension } from "./Extensions.js";

export type Action = (typeof Action)[keyof typeof Action];
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

export function makeUse(action: bigint): (args: Omit<UseParams<never>, "callArgs">) => PopulatedExtensionCall;
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
      callArgs: callEncode({
        actionId: action,
        actionArgs: encoded,
        externalPositionProxy: zeroAddress,
      }),
    });
  };
}

//--------------------------------------------------------------------------------------------
// CALL ON EXTERNAL POSITION
//--------------------------------------------------------------------------------------------

const callEncoding = [
  {
    name: "externalPositionProxy",
    type: "address",
  },
  {
    name: "actionId",
    type: "uint256",
  },
  {
    name: "actionArgs",
    type: "bytes",
  },
] as const;

export type CallArgs = {
  externalPositionProxy: Address;
  actionId: bigint;
  actionArgs?: Hex | undefined;
};

export function callEncode(args: CallArgs): Hex {
  return encodeAbiParameters(callEncoding, [args.externalPositionProxy, args.actionId, args.actionArgs ?? "0x"]);
}

export function callDecode(params: Hex): CallArgs {
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
    callArgs: callEncode({
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

export function createEncode(args: CreateArgs): Hex {
  return encodeAbiParameters(createEncoding, [args.typeId, args.initializationData ?? "0x", args.callArgs ?? "0x"]);
}

export function createDecode(encoded: Hex): CreateArgs {
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
    callArgs: createEncode({
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

export function reactivateEncode(args: ReactivateArgs): Hex {
  return encodeAbiParameters(reactivateEncoding, [args.externalPositionProxy]);
}

export function reactivateDecode(callArgs: Hex): ReactivateArgs {
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
    callArgs: reactivateEncode({
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

export function removeEncode(args: RemoveArgs): Hex {
  return encodeAbiParameters(removeEncoding, [args.externalPositionProxy]);
}

export function removeDecode(callArgs: Hex): RemoveArgs {
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
    callArgs: removeEncode({
      externalPositionProxy: args.externalPositionProxy,
    }),
  });
}
