// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IAaveV3ATokenListOwner {
    function addValidatedItemsToList(address[] memory _items) external;
}
