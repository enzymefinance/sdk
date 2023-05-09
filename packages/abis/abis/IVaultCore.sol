// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IVaultCore {
    function getAccessor() external view returns (address accessor_);
    function getCreator() external view returns (address creator_);
    function getMigrator() external view returns (address migrator_);
    function getOwner() external view returns (address owner_);
}
