// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IAllowedExternalPositionTypesPolicy {
    type PolicyHook is uint8;

    event AllowedExternalPositionTypeAddedForFund(
        address indexed comptrollerProxy, uint256 indexed externalPositionTypeId
    );

    function activateForFund(address _comptrollerProxy) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function canDisable() external pure returns (bool canDisable_);
    function externalPositionTypeIsAllowedForFund(address _comptrollerProxy, uint256 _externalPositionTypeId)
        external
        view
        returns (bool isAllowed_);
    function getPolicyManager() external view returns (address policyManager_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (PolicyHook[] memory implementedHooks_);
    function updateFundSettings(address, bytes memory) external;
    function validateRule(address _comptrollerProxy, PolicyHook _hook, bytes memory _encodedArgs)
        external
        returns (bool isValid_);
}
