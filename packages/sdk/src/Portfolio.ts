export * as ExternalPositions from "@enzymefinance/sdk/internal/Extensions/ExternalPositions";
export * as IntegrationAdapters from "@enzymefinance/sdk/internal/Extensions/IntegrationAdapters";

export {
  call as callIntegration,
  type CallParams as CallOnIntegrationParams,
  addTrackedAssets,
  type AddTracketAssetsParams,
  removeTracketAssets,
  type RemoveTrackedAssetsParams,
} from "@enzymefinance/sdk/internal/IntegrationManager";

export {
  call as callExternalPosition,
  type CallParams as CallOnExternalPositionParams,
  create as createExternalPosition,
  type CreateParams as CreateExternalPositionParams,
  remove as removeExternalPosition,
  type RemoveParams as RemoveExternalPositionParams,
  reactivate as reactivateExternalPosition,
  type ReactivateParams as ReactivateExternalPositionParams,
} from "@enzymefinance/sdk/internal/ExternalPositionManager";
