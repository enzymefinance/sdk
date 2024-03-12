// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IAddressListRegistry {
    type UpdateType is uint8;

    event ItemAddedToList(uint256 indexed id, address item);
    event ItemRemovedFromList(uint256 indexed id, address item);
    event ListAttested(uint256 indexed id, string description);
    event ListCreated(address indexed creator, address indexed owner, uint256 id, UpdateType updateType);
    event ListOwnerSet(uint256 indexed id, address indexed nextOwner);
    event ListUpdateTypeSet(uint256 indexed id, UpdateType prevUpdateType, UpdateType indexed nextUpdateType);

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
    function createList(address _owner, UpdateType _updateType, address[] memory _initialItems)
        external
        returns (uint256 id_);
    function getDispatcher() external view returns (address dispatcher_);
    function getListCount() external view returns (uint256 count_);
    function getListOwner(uint256 _id) external view returns (address owner_);
    function getListUpdateType(uint256 _id) external view returns (UpdateType updateType_);
    function isInAllLists(uint256[] memory _ids, address _item) external view returns (bool isInAllLists_);
    function isInList(uint256 _id, address _item) external view returns (bool isInList_);
    function isInSomeOfLists(uint256[] memory _ids, address _item) external view returns (bool isInSomeOfLists_);
    function removeFromList(uint256 _id, address[] memory _items) external;
    function setListOwner(uint256 _id, address _nextOwner) external;
    function setListUpdateType(uint256 _id, UpdateType _nextUpdateType) external;
}
