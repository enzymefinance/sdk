// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISharePriceThrottledAssetManagerFactory {
    event ProxyDeployed(
        address indexed deployer,
        address proxyAddress,
        address indexed owner,
        address indexed vaultProxy,
        uint64 lossTolerance,
        uint32 lossTolerancePeriodDuration,
        address shutDowner
    );

    function deployProxy(
        address _owner,
        address _vaultProxyAddress,
        uint64 _lossTolerance,
        uint32 _lossTolerancePeriodDuration,
        address _shutdowner
    ) external returns (address proxyAddress_);
}
