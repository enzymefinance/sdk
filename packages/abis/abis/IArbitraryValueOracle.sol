// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IArbitraryValueOracle {
    function getLastUpdated() external view returns (uint256 lastUpdated_);
    function getValue() external view returns (int256 value_);
    function getValueWithTimestamp() external view returns (int256 value_, uint256 lastUpdated_);
}
