// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IFundValueCalculatorUsdWrapper {
    function calcGav(address _vaultProxy) external returns (uint256 gav_);
    function calcGrossShareValue(address _vaultProxy) external returns (uint256 grossShareValue_);
    function calcNav(address _vaultProxy) external returns (uint256 nav_);
    function calcNetShareValue(address _vaultProxy) external returns (uint256 netShareValue_);
    function calcNetValueForSharesHolder(address _vaultProxy, address _sharesHolder)
        external
        returns (uint256 netValue_);
    function getEthUsdAggregatorContract() external view returns (address ethUsdAggregatorContract_);
    function getFundValueCalculatorRouter() external view returns (address fundValueCalculatorRouter_);
    function getStaleRateThreshold() external view returns (uint256 staleRateThreshold_);
    function getWethToken() external view returns (address wethToken_);
}
