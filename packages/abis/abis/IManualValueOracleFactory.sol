// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IManualValueOracleFactory {
    event ProxyDeployed(address indexed caller, address proxy);

    function deploy(address _owner, address _updater, bytes32 _description) external returns (address proxy_);
}
