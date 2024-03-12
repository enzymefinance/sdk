// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IRevertingPriceFeed {
    function calcUnderlyingValues(address, uint256) external returns (address[] memory, uint256[] memory);
    function isSupportedAsset(address) external view returns (bool isSupported_);
}
