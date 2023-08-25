// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface IMinSharesSupplyFee {
    event Settled(address indexed comptrollerProxy, address indexed payer, uint256 sharesQuantity);

    function activateForFund(address, address) external;
    function addFundSettings(address, bytes memory) external;
    function getFeeManager() external view returns (address feeManager_);
    function getRecipientForFund(address) external view returns (address recipient_);
    function payout(address, address) external returns (bool);
    function settle(address _comptrollerProxy, address _vaultProxy, uint8, bytes memory _settlementData, uint256)
        external
        returns (uint8 settlementType_, address payer_, uint256 sharesDue_);
    function settlesOnHook(uint8 _hook) external view returns (bool settles_, bool usesGav_);
    function update(address, address, uint8, bytes memory, uint256) external;
    function updatesOnHook(uint8) external view returns (bool updates_, bool usesGav_);
}
