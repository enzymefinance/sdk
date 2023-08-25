// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface IManagementFee {
    event ActivatedForMigratedFund(address indexed comptrollerProxy);
    event FundSettingsAdded(address indexed comptrollerProxy, uint128 scaledPerSecondRate);
    event RecipientSetForFund(address indexed comptrollerProxy, address indexed recipient);
    event Settled(address indexed comptrollerProxy, uint256 sharesQuantity, uint256 secondsSinceSettlement);

    struct FeeInfo {
        uint128 scaledPerSecondRate;
        uint128 lastSettled;
    }

    function activateForFund(address _comptrollerProxy, address _vaultProxy) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _settingsData) external;
    function getFeeInfoForFund(address _comptrollerProxy) external view returns (FeeInfo memory feeInfo_);
    function getFeeManager() external view returns (address feeManager_);
    function getRecipientForFund(address _comptrollerProxy) external view returns (address recipient_);
    function payout(address, address) external returns (bool);
    function setRecipientForFund(address _comptrollerProxy, address _recipient) external;
    function settle(address _comptrollerProxy, address _vaultProxy, uint8, bytes memory, uint256)
        external
        returns (uint8 settlementType_, address, uint256 sharesDue_);
    function settlesOnHook(uint8 _hook) external view returns (bool settles_, bool usesGav_);
    function update(address, address, uint8, bytes memory, uint256) external;
    function updatesOnHook(uint8) external view returns (bool updates_, bool usesGav_);
}
