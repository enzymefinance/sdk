// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ICumulativeSlippageTolerancePolicy {
    type PolicyHook is uint8;

    struct PolicyInfo {
        uint64 tolerance;
        uint64 cumulativeSlippage;
        uint128 lastSlippageTimestamp;
    }

    event CumulativeSlippageUpdatedForFund(address indexed comptrollerProxy, uint256 nextCumulativeSlippage);
    event FundSettingsSet(address indexed comptrollerProxy, uint256 tolerance);
    event PricelessAssetBypassed(address indexed comptrollerProxy, address indexed asset);
    event PricelessAssetTimelockStarted(address indexed comptrollerProxy, address indexed asset);

    function activateForFund(address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function assetIsBypassableForFund(address _comptrollerProxy, address _asset)
        external
        view
        returns (bool isBypassable_);
    function canDisable() external pure returns (bool canDisable_);
    function getAddressListRegistry() external view returns (address addressListRegistry_);
    function getAssetBypassWindowStartForFund(address _comptrollerProxy, address _asset)
        external
        view
        returns (uint256 windowStart_);
    function getBypassableAdaptersListId() external view returns (uint256 bypassableAdaptersListId_);
    function getPolicyInfoForFund(address _comptrollerProxy) external view returns (PolicyInfo memory policyInfo_);
    function getPolicyManager() external view returns (address policyManager_);
    function getPricelessAssetBypassTimeLimit() external view returns (uint256 timeLimit_);
    function getPricelessAssetBypassTimelock() external view returns (uint256 timelock_);
    function getPricelessAssetBypassValueInterpreter() external view returns (address valueInterpreter_);
    function getPricelessAssetBypassWethToken() external view returns (address wethToken_);
    function getTolerancePeriodDuration() external view returns (uint256 tolerancePeriodDuration_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (PolicyHook[] memory implementedHooks_);
    function startAssetBypassTimelock(address _asset) external;
    function updateFundSettings(address, bytes memory) external;
    function validateRule(address _comptrollerProxy, PolicyHook, bytes memory _encodedArgs)
        external
        returns (bool isValid_);
}
