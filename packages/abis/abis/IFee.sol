// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IFee {
    function activateForFund(address _comptrollerProxy, address _vaultProxy) external;
    function addFundSettings(address _comptrollerProxy, bytes memory _settingsData) external;
    function getRecipientForFund(address _comptrollerProxy) external view returns (address recipient_);
    function payout(address _comptrollerProxy, address _vaultProxy) external returns (bool isPayable_);
    function settle(
        address _comptrollerProxy,
        address _vaultProxy,
        uint8 _hook,
        bytes memory _settlementData,
        uint256 _gav
    ) external returns (uint8 settlementType_, address payer_, uint256 sharesDue_);
    function settlesOnHook(uint8 _hook) external view returns (bool settles_, bool usesGav_);
    function update(
        address _comptrollerProxy,
        address _vaultProxy,
        uint8 _hook,
        bytes memory _settlementData,
        uint256 _gav
    ) external;
    function updatesOnHook(uint8 _hook) external view returns (bool updates_, bool usesGav_);
}
