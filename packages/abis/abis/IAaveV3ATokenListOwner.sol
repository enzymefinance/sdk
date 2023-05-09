// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IAaveV3ATokenListOwner {
    function addValidatedItemsToList(address[] memory _items) external;
}
