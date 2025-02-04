// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IFee {
    type FeeHook is uint8;
    type SettlementType is uint8;

    function activateForFund(address _comptrollerProxy, address _vaultProxy) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _settingsData) external;
    function getRecipientForFund(address _comptrollerProxy) external view returns (address recipient_);
    function payout(address _comptrollerProxy, address _vaultProxy) external returns (bool isPayable_);
    function settle(
        address _comptrollerProxy,
        address _vaultProxy,
        FeeHook _hook,
        bytes memory _settlementData,
        uint256 _gav
    ) external returns (SettlementType settlementType_, address payer_, uint256 sharesDue_);
    function settlesOnHook(FeeHook _hook) external view returns (bool settles_, bool usesGav_);
    function update(
        address _comptrollerProxy,
        address _vaultProxy,
        FeeHook _hook,
        bytes memory _settlementData,
        uint256 _gav
    ) external;
    function updatesOnHook(FeeHook _hook) external view returns (bool updates_, bool usesGav_);
}
