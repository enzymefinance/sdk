// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IWstethPriceFeed {
    function calcUnderlyingValues(address, uint256 _derivativeAmount)
        external
        returns (address[] memory underlyings_, uint256[] memory underlyingAmounts_);
    function isSupportedAsset(address _asset) external view returns (bool isSupported_);
}
