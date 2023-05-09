// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IMinAssetBalancesPostRedemptionPolicy {
    event MinAssetBalanceAddedForFund(address indexed comptrollerProxy, address indexed asset, uint256 minBalance);

    function activateForFund(address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function canDisable() external pure returns (bool canDisable_);
    function getMinAssetBalanceForFund(address _comptrollerProxy, address _asset)
        external
        view
        returns (uint256 minBalance_);
    function getPolicyManager() external view returns (address policyManager_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (uint8[] memory implementedHooks_);
    function updateFundSettings(address, bytes memory) external;
    function validateRule(address _comptrollerProxy, uint8, bytes memory _encodedArgs)
        external
        returns (bool isValid_);
}
