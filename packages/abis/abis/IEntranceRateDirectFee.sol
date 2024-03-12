// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IEntranceRateDirectFee {
    type FeeHook is uint8;
    type SettlementType is uint8;

    event FundSettingsAdded(address indexed comptrollerProxy, uint256 rate);
    event RecipientSetForFund(address indexed comptrollerProxy, address indexed recipient);
    event Settled(address indexed comptrollerProxy, address indexed payer, uint256 sharesQuantity);

    function activateForFund(address, address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _settingsData) external;
    function getFeeManager() external view returns (address feeManager_);
    function getRateForFund(address _comptrollerProxy) external view returns (uint256 rate_);
    function getRecipientForFund(address _comptrollerProxy) external view returns (address recipient_);
    function getSettlementType() external view returns (SettlementType settlementType_);
    function payout(address, address) external returns (bool);
    function setRecipientForFund(address _comptrollerProxy, address _recipient) external;
    function settle(address _comptrollerProxy, address, FeeHook, bytes memory _settlementData, uint256)
        external
        returns (SettlementType settlementType_, address payer_, uint256 sharesDue_);
    function settlesOnHook(FeeHook _hook) external view returns (bool settles_, bool usesGav_);
    function update(address, address, FeeHook, bytes memory, uint256) external;
    function updatesOnHook(FeeHook) external view returns (bool updates_, bool usesGav_);
}
