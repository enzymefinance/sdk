// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IStaderWithdrawalsPositionLib {
    error StaderWithdrawalsPositionLib__ReceiveCallFromVault__InvalidActionId();

    function ETHX_ADDRESS() external view returns (address);
    function USER_WITHDRAWAL_MANAGER() external view returns (address);
    function WETH_ADDRESS() external view returns (address);
    function getDebtAssets() external pure returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
