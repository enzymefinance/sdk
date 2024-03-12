// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface INoDepegOnRedeemSharesForSpecificAssetsPolicy {
    type PolicyHook is uint8;

    struct AssetConfig {
        address asset;
        address referenceAsset;
        uint16 deviationToleranceInBps;
    }

    event FundSettingsUpdated(address indexed comptrollerProxy, AssetConfig[] assetConfigs);

    function activateForFund(address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function canDisable() external pure returns (bool canDisable_);
    function getAssetConfigsForFund(address _comptrollerProxy)
        external
        view
        returns (AssetConfig[] memory assetConfigs_);
    function getPolicyManager() external view returns (address policyManager_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (PolicyHook[] memory implementedHooks_);
    function updateFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function validateRule(address _comptrollerProxy, PolicyHook, bytes memory) external returns (bool isValid_);
}
