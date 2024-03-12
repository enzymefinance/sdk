// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IOnlyUntrackDustOrPricelessAssetsPolicy {
    type PolicyHook is uint8;

    event DustToleranceInWethSet(uint256 nextDustToleranceInWeth);
    event PricelessAssetBypassed(address indexed comptrollerProxy, address indexed asset);
    event PricelessAssetTimelockStarted(address indexed comptrollerProxy, address indexed asset);

    function activateForFund(address) external;
    function addFundSettings(address, bytes memory) external;
    function assetIsBypassableForFund(address _comptrollerProxy, address _asset)
        external
        view
        returns (bool isBypassable_);
    function canDisable() external pure returns (bool canDisable_);
    function getAssetBypassWindowStartForFund(address _comptrollerProxy, address _asset)
        external
        view
        returns (uint256 windowStart_);
    function getDustToleranceInWeth() external view returns (uint256 dustToleranceInWeth_);
    function getFundDeployer() external view returns (address fundDeployer_);
    function getOwner() external view returns (address owner_);
    function getPolicyManager() external view returns (address policyManager_);
    function getPricelessAssetBypassTimeLimit() external view returns (uint256 timeLimit_);
    function getPricelessAssetBypassTimelock() external view returns (uint256 timelock_);
    function getPricelessAssetBypassValueInterpreter() external view returns (address valueInterpreter_);
    function getPricelessAssetBypassWethToken() external view returns (address wethToken_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (PolicyHook[] memory implementedHooks_);
    function setDustToleranceInWeth(uint256 _nextDustToleranceInWeth) external;
    function startAssetBypassTimelock(address _asset) external;
    function updateFundSettings(address, bytes memory) external;
    function validateRule(address _comptrollerProxy, PolicyHook, bytes memory _encodedArgs)
        external
        returns (bool isValid_);
}
