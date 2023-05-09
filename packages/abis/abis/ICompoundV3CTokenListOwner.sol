// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface ICompoundV3CTokenListOwner {
    function addValidatedItemsToList(address[] memory _items) external;
}
