// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IHelperDataReader {
    struct AssetAmount {
        address asset;
        uint256 amount;
    }

    struct ExternalPositionDetails {
        string label;
        address id;
        uint256 typeId;
        AssetAmount[] debtAssetsAmounts;
        AssetAmount[] managedAssetsAmounts;
    }

    struct FeeDetails {
        address recipientForFund;
        address id;
    }

    struct PolicyDetails {
        string identifier;
        address id;
    }

    struct VaultDetails {
        string name;
        string symbol;
        uint256 totalSupply;
        address denominationAsset;
        uint256 netShareValue;
        uint256 grossAssetValue;
        address owner;
        bool hasInvalidAum;
    }

    struct VaultDetailsExtended {
        string name;
        string symbol;
        uint256 totalSupply;
        address denominationAsset;
        uint256 netShareValue;
        uint256 grossAssetValue;
        address owner;
        bool hasInvalidAum;
        AssetAmount[] trackedAssetsAmounts;
        ExternalPositionDetails[] activeExternalPositionsDetails;
        PolicyDetails[] policiesDetails;
        FeeDetails[] feesDetails;
    }

    function getVaultActiveExternalPositionsDetails(address _vaultProxy) external returns (bytes memory);
    function getVaultActiveExternalPositionsDetailsDecoded(address _vaultProxy)
        external
        returns (ExternalPositionDetails[] memory);
    function getVaultDetails(address _vaultProxy) external returns (bytes memory);
    function getVaultDetailsDecoded(address _vaultProxy) external returns (VaultDetails memory);
    function getVaultDetailsExtended(address _vaultProxy) external returns (bytes memory);
    function getVaultDetailsExtendedDecoded(address _vaultProxy) external returns (VaultDetailsExtended memory);
    function getVaultFeesDetails(address _vaultProxy) external view returns (bytes memory);
    function getVaultFeesDetailsDecoded(address _vaultProxy) external view returns (FeeDetails[] memory);
    function getVaultPoliciesDetails(address _vaultProxy) external view returns (bytes memory);
    function getVaultPoliciesDetailsDecoded(address _vaultProxy) external view returns (PolicyDetails[] memory);
    function getVaultTrackedAssetsAmounts(address _vaultProxy) external view returns (bytes memory);
    function getVaultTrackedAssetsAmountsDecoded(address _vaultProxy) external view returns (AssetAmount[] memory);
}
