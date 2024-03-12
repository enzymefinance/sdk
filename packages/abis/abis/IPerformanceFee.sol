// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IPerformanceFee {
    type FeeHook is uint8;
    type SettlementType is uint8;

    struct FeeInfo {
        uint256 rate;
        uint256 highWaterMark;
    }

    event ActivatedForFund(address indexed comptrollerProxy, uint256 highWaterMark);
    event FundSettingsAdded(address indexed comptrollerProxy, uint256 rate);
    event HighWaterMarkUpdated(address indexed comptrollerProxy, uint256 nextHighWaterMark);
    event RecipientSetForFund(address indexed comptrollerProxy, address indexed recipient);
    event Settled(address indexed comptrollerProxy, uint256 sharePrice, uint256 sharesDue);

    function activateForFund(address _comptrollerProxy, address) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _settingsData) external;
    function getFeeInfoForFund(address _comptrollerProxy) external view returns (FeeInfo memory feeInfo_);
    function getFeeManager() external view returns (address feeManager_);
    function getRecipientForFund(address _comptrollerProxy) external view returns (address recipient_);
    function payout(address, address) external returns (bool);
    function setRecipientForFund(address _comptrollerProxy, address _recipient) external;
    function settle(address _comptrollerProxy, address _vaultProxy, FeeHook, bytes memory, uint256 _gav)
        external
        returns (SettlementType settlementType_, address, uint256 sharesDue_);
    function settlesOnHook(FeeHook _hook) external view returns (bool settles_, bool usesGav_);
    function update(address _comptrollerProxy, address _vaultProxy, FeeHook, bytes memory, uint256 _gav) external;
    function updatesOnHook(FeeHook _hook) external view returns (bool updates_, bool usesGav_);
}
