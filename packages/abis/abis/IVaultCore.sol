// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IVaultCore {
    function getAccessor() external view returns (address accessor_);
    function getCreator() external view returns (address creator_);
    function getMigrator() external view returns (address migrator_);
    function getOwner() external view returns (address owner_);
}
