// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ITheGraphDelegationPositionLib {
    event IndexerAdded(address indexed indexer);
    event IndexerRemoved(address indexed indexer);

    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getDelegationGrtValue(address _indexer) external view returns (uint256 grtValue_);
    function getIndexers() external view returns (address[] memory);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function init(bytes memory) external;
    function isDelegatorTo(address _indexer) external view returns (bool isDelegator_);
    function receiveCallFromVault(bytes memory _actionData) external;
}
