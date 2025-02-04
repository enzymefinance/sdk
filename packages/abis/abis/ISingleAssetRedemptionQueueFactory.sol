// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISingleAssetRedemptionQueueFactory {
    event ProxyDeployed(address indexed deployer, address indexed proxyAddress, address indexed vaultProxy);

    function deployProxy(
        address _vaultProxy,
        address _redemptionAssetAddress,
        uint256 _bypassableSharesThreshold,
        address[] memory _managers
    ) external returns (address proxyAddress_);
}
