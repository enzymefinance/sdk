// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface IExternalPositionVault {
    function getExternalPositionLibForType(uint256) external view returns (address);
}
