// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IExternalPosition {
    function getDebtAssets() external returns (address[] memory, uint256[] memory);
    function getManagedAssets() external returns (address[] memory, uint256[] memory);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory) external;
}
