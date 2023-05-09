// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface ISharesSplitterFactory {
    event ProxyDeployed(address indexed caller, address proxy);

    function deploy(address[] memory _users, uint256[] memory _splitPercentages)
        external
        returns (address sharesSplitter_);
}
