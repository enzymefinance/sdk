// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IBalancerV2StablePoolPriceFeed {
    struct PoolInfo {
        address invariantProxyAsset;
        uint8 invariantProxyAssetDecimals;
    }

    event PoolAdded(address indexed pool, address indexed invariantProxyAsset);
    event PoolFactoryAdded(address indexed poolFactory);
    event PoolFactoryRemoved(address indexed poolFactory);
    event PoolRemoved(address indexed pool);

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
