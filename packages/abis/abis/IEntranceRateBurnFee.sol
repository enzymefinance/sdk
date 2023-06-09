// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IEntranceRateBurnFee {
    event FundSettingsAdded(address indexed comptrollerProxy, uint256 rate);
    event Settled(address indexed comptrollerProxy, address indexed payer, uint256 sharesQuantity);

    function activateForFund(address, address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _settingsData) external;
    function getFeeManager() external view returns (address feeManager_);
    function getRateForFund(address _comptrollerProxy) external view returns (uint256 rate_);
    function getRecipientForFund(address) external view returns (address recipient_);
    function getSettlementType() external view returns (uint8 settlementType_);
    function payout(address, address) external returns (bool);
    function settle(address _comptrollerProxy, address, uint8, bytes memory _settlementData, uint256)
        external
        returns (uint8 settlementType_, address payer_, uint256 sharesDue_);
    function settlesOnHook(uint8 _hook) external view returns (bool settles_, bool usesGav_);
    function update(address, address, uint8, bytes memory, uint256) external;
    function updatesOnHook(uint8) external view returns (bool updates_, bool usesGav_);
}
