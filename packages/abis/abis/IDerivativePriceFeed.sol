// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IDerivativePriceFeed {
    function calcUnderlyingValues(address, uint256) external returns (address[] memory, uint256[] memory);
    function isSupportedAsset(address) external view returns (bool);
}
