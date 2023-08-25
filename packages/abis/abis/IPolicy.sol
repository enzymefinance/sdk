// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface IPolicy {
    function activateForFund(address _comptrollerProxy) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function canDisable() external pure returns (bool canDisable_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (uint8[] memory implementedHooks_);
    function updateFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function validateRule(address _comptrollerProxy, uint8 _hook, bytes memory _encodedArgs)
        external
        returns (bool isValid_);
}
