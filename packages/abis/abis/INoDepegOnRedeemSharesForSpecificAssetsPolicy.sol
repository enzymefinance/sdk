// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface INoDepegOnRedeemSharesForSpecificAssetsPolicy {
    event FundSettingsUpdated(address indexed comptrollerProxy, AssetConfig[] assetConfigs);

    struct AssetConfig {
        address asset;
        address referenceAsset;
        uint16 deviationToleranceInBps;
    }

    function activateForFund(address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function canDisable() external pure returns (bool canDisable_);
    function getAssetConfigsForFund(address _comptrollerProxy)
        external
        view
        returns (AssetConfig[] memory assetConfigs_);
    function getPolicyManager() external view returns (address policyManager_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (uint8[] memory implementedHooks_);
    function updateFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function validateRule(address _comptrollerProxy, uint8, bytes memory) external returns (bool isValid_);
}
