// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMinSharesSupplyFee {
    type FeeHook is uint8;
    type SettlementType is uint8;

    event Settled(address indexed comptrollerProxy, address indexed payer, uint256 sharesQuantity);

    function activateForFund(address, address) external;
    function addFundSettings(address, bytes memory) external;
    function getFeeManager() external view returns (address feeManager_);
    function getRecipientForFund(address) external view returns (address recipient_);
    function payout(address, address) external returns (bool);
    function settle(address _comptrollerProxy, address _vaultProxy, FeeHook, bytes memory _settlementData, uint256)
        external
        returns (SettlementType settlementType_, address payer_, uint256 sharesDue_);
    function settlesOnHook(FeeHook _hook) external view returns (bool settles_, bool usesGav_);
    function update(address, address, FeeHook, bytes memory, uint256) external;
    function updatesOnHook(FeeHook) external view returns (bool updates_, bool usesGav_);
}
