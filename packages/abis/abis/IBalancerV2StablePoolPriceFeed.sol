// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IBalancerV2StablePoolPriceFeed {
    event PoolAdded(address indexed pool, address indexed invariantProxyAsset);
    event PoolFactoryAdded(address indexed poolFactory);
    event PoolFactoryRemoved(address indexed poolFactory);
    event PoolRemoved(address indexed pool);

    struct PoolInfo {
        address invariantProxyAsset;
        uint8 invariantProxyAssetDecimals;
        bool containsNativeAsset;
    }

    function addPoolFactories(address[] memory _poolFactories) external;
    function addPools(address[] memory _pools, address[] memory _invariantProxyAssets) external;
    function calcUnderlyingValues(address _derivative, uint256 _derivativeAmount)
        external
        returns (address[] memory underlyings_, uint256[] memory underlyingAmounts_);
    function getFundDeployer() external view returns (address fundDeployer_);
    function getOwner() external view returns (address owner_);
    function getPoolFactories() external view returns (address[] memory factories_);
    function getPoolInfo(address _pool) external view returns (PoolInfo memory poolInfo_);
    function isSupportedAsset(address _asset) external view returns (bool isSupported_);
    function removePoolFactories(address[] memory _poolFactories) external;
    function removePools(address[] memory _pools) external;
}
