// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IExternalPositionFactory {
    event PositionDeployed(
        address indexed vaultProxy, uint256 indexed typeId, address indexed constructLib, bytes constructData
    );
    event PositionDeployerAdded(address positionDeployer);
    event PositionDeployerRemoved(address positionDeployer);
    event PositionTypeAdded(uint256 typeId, string label);
    event PositionTypeLabelUpdated(uint256 indexed typeId, string label);

    function addNewPositionTypes(string[] memory _labels) external;
    function addPositionDeployers(address[] memory _accounts) external;
    function deploy(address _vaultProxy, uint256 _typeId, address _constructLib, bytes memory _constructData)
        external
        returns (address externalPositionProxy_);
    function getDispatcher() external view returns (address dispatcher_);
    function getLabelForPositionType(uint256 _typeId) external view returns (string memory label_);
    function getPositionTypeCounter() external view returns (uint256 positionTypeCounter_);
    function isExternalPositionProxy(address _account) external view returns (bool isExternalPositionProxy_);
    function isPositionDeployer(address _account) external view returns (bool isPositionDeployer_);
    function removePositionDeployers(address[] memory _accounts) external;
    function updatePositionTypeLabels(uint256[] memory _typeIds, string[] memory _labels) external;
}
