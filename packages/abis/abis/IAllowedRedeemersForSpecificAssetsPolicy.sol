pragma solidity >=0.6.0 <0.9.0;

interface IAllowedRedeemersForSpecificAssetsPolicy {
    event ListsSetForFund(address indexed comptrollerProxy, uint256[] listIds);

    function activateForFund(address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _encodedSettings) external;
    function canDisable() external pure returns (bool canDisable_);
    function getAddressListRegistry() external view returns (address addressListRegistry_);
    function getListIdsForFund(address _comptrollerProxy) external view returns (uint256[] memory listIds_);
    function getPolicyManager() external view returns (address policyManager_);
    function identifier() external pure returns (string memory identifier_);
    function implementedHooks() external pure returns (uint8[] memory implementedHooks_);
    function updateFundSettings(address, bytes memory) external;
    function validateRule(address _comptrollerProxy, uint8, bytes memory _encodedArgs)
        external
        view
        returns (bool isValid_);
}
