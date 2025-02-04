// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMinMaxInvestmentPolicy {
    type PolicyHook is uint8;

    struct FundSettings {
        uint256 minInvestmentAmount;
        uint256 maxInvestmentAmount;
    }

    event FundSettingsSet(address indexed comptrollerProxy, uint256 minInvestmentAmount, uint256 maxInvestmentAmount);

    function activateForFund(address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function canDisable() external pure returns (bool canDisable_);
    function getFundSettings(address _comptrollerProxy) external view returns (FundSettings memory fundSettings_);
    function getPolicyManager() external view returns (address policyManager_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (PolicyHook[] memory implementedHooks_);
    function passesRule(address _comptrollerProxy, uint256 _investmentAmount) external view returns (bool isValid_);
    function updateFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function validateRule(address _comptrollerProxy, PolicyHook, bytes memory _encodedArgs)
        external
        returns (bool isValid_);
}
