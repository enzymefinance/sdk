// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface IExternalPosition {
    function getDebtAssets() external returns (address[] memory, uint256[] memory);
    function getManagedAssets() external returns (address[] memory, uint256[] memory);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory) external;
}
