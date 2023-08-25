// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface ICompoundV3CTokenListOwner {
    function addValidatedItemsToList(address[] memory _items) external;
}
