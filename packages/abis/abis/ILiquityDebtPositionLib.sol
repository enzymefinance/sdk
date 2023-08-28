// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface ILiquityDebtPositionLib {
    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
