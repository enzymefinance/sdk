// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IERC4626PriceFeed {
    function calcUnderlyingValues(address _derivative, uint256 _derivativeAmount)
        external
        view
        returns (address[] memory underlyings_, uint256[] memory underlyingAmounts_);
    function isSupportedAsset(address _asset) external view returns (bool isSupported_);
}
