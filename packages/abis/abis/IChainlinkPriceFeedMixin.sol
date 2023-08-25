// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface IChainlinkPriceFeedMixin {
    event EthUsdAggregatorSet(address prevEthUsdAggregator, address nextEthUsdAggregator);
    event PrimitiveAdded(address indexed primitive, address aggregator, uint8 rateAsset, uint256 unit);
    event PrimitiveRemoved(address indexed primitive);

    function getAggregatorForPrimitive(address _primitive) external view returns (address aggregator_);
    function getEthUsdAggregator() external view returns (address ethUsdAggregator_);
    function getRateAssetForPrimitive(address _primitive) external view returns (uint8 rateAsset_);
    function getStaleRateThreshold() external view returns (uint256 staleRateThreshold_);
    function getUnitForPrimitive(address _primitive) external view returns (uint256 unit_);
    function getWethToken() external view returns (address wethToken_);
}
