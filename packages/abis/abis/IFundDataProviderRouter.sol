// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IFundDataProviderRouter {
    function getFundValueCalculatorRouter() external view returns (address fundValueCalculatorRouter_);
    function getFundValueMetrics(address _vaultProxy)
        external
        returns (
            uint256 timestamp_,
            uint256 sharesSupply_,
            uint256 gavInEth_,
            bool gavIsValid_,
            uint256 navInEth_,
            bool navIsValid_
        );
    function getWethToken() external view returns (address wethToken_);
}
