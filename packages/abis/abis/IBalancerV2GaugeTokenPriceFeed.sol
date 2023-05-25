// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IBalancerV2GaugeTokenPriceFeed {
    function calcUnderlyingValues(address _derivative, uint256 _derivativeAmount)
        external
        returns (address[] memory underlyings_, uint256[] memory underlyingAmounts_);
    function isSupportedAsset(address _asset) external view returns (bool isSupported_);
}