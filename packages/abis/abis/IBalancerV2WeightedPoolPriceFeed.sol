// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IBalancerV2WeightedPoolPriceFeed {
    event PoolFactoryAdded(address poolFactory);
    event PoolFactoryRemoved(address poolFactory);

    function addPoolFactories(address[] memory _poolFactories) external;
    function calcUnderlyingValues(address _derivative, uint256 _derivativeAmount)
        external
        returns (address[] memory underlyings_, uint256[] memory underlyingAmounts_);
    function getFundDeployer() external view returns (address fundDeployer_);
    function getOwner() external view returns (address owner_);
    function getPoolFactories() external view returns (address[] memory factories_);
    function isSupportedAsset(address _asset) external view returns (bool isSupported_);
    function removePoolFactories(address[] memory _poolFactories) external;
}
