// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IExternalPositionVault {
    function getExternalPositionLibForType(uint256) external view returns (address);
}
