// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IAddressListRegistry {
    event ItemAddedToList(uint256 indexed id, address item);
    event ItemRemovedFromList(uint256 indexed id, address item);
    event ListAttested(uint256 indexed id, string description);
    event ListCreated(address indexed creator, address indexed owner, uint256 id, uint8 updateType);
    event ListOwnerSet(uint256 indexed id, address indexed nextOwner);
    event ListUpdateTypeSet(uint256 indexed id, uint8 prevUpdateType, uint8 indexed nextUpdateType);

    function addToList(uint256 _id, address[] memory _items) external;
    function areAllInAllLists(uint256[] memory _ids, address[] memory _items)
        external
        view
        returns (bool areAllInAllLists_);
    function areAllInList(uint256 _id, address[] memory _items) external view returns (bool areAllInList_);
    function areAllInSomeOfLists(uint256[] memory _ids, address[] memory _items)
        external
        view
        returns (bool areAllInSomeOfLists_);
    function areAllNotInAnyOfLists(uint256[] memory _ids, address[] memory _items)
        external
        view
        returns (bool areAllNotInAnyOfLists_);
    function areAllNotInList(uint256 _id, address[] memory _items) external view returns (bool areAllNotInList_);
    function attestLists(uint256[] memory _ids, string[] memory _descriptions) external;
    function createList(address _owner, uint8 _updateType, address[] memory _initialItems)
        external
        returns (uint256 id_);
    function getDispatcher() external view returns (address dispatcher_);
    function getListCount() external view returns (uint256 count_);
    function getListOwner(uint256 _id) external view returns (address owner_);
    function getListUpdateType(uint256 _id) external view returns (uint8 updateType_);
    function isInAllLists(uint256[] memory _ids, address _item) external view returns (bool isInAllLists_);
    function isInList(uint256 _id, address _item) external view returns (bool isInList_);
    function isInSomeOfLists(uint256[] memory _ids, address _item) external view returns (bool isInSomeOfLists_);
    function removeFromList(uint256 _id, address[] memory _items) external;
    function setListOwner(uint256 _id, address _nextOwner) external;
    function setListUpdateType(uint256 _id, uint8 _nextUpdateType) external;
}
