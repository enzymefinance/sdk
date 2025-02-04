// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IDispatcherOwnedBeaconFactory {
    event ImplementationSet(address implementation);
    event ProxyDeployed(address proxy);

    function deployProxy(bytes memory _constructData) external returns (address proxyAddress_);
    function getOwner() external view returns (address owner_);
    function implementation() external view returns (address);
    function setImplementation(address _nextImplementation) external;
}
