// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IChainlinkPriceFeedMixin {
    type RateAsset is uint8;

    event EthUsdAggregatorSet(address prevEthUsdAggregator, address nextEthUsdAggregator);
    event PrimitiveAdded(address indexed primitive, address aggregator, RateAsset rateAsset, uint256 unit);
    event PrimitiveRemoved(address indexed primitive);

    function getAggregatorForPrimitive(address _primitive) external view returns (address aggregator_);
    function getEthUsdAggregator() external view returns (address ethUsdAggregator_);
    function getRateAssetForPrimitive(address _primitive) external view returns (RateAsset rateAsset_);
    function getStaleRateThreshold() external view returns (uint256 staleRateThreshold_);
    function getUnitForPrimitive(address _primitive) external view returns (uint256 unit_);
    function getWethToken() external view returns (address wethToken_);
}
