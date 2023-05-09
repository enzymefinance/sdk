// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IManualValueOracleFactory {
    event ProxyDeployed(address indexed caller, address proxy);

    function deploy(address _owner, address _updater, bytes32 _description) external returns (address proxy_);
}
