// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISharesSplitterFactory {
    event ProxyDeployed(address indexed caller, address proxy);

    function deploy(address[] memory _users, uint256[] memory _splitPercentages)
        external
        returns (address sharesSplitter_);
}
