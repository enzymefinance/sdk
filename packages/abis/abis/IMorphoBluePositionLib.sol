// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMorphoBluePositionLib {
    error DisallowedMarket();
    error InvalidActionId();

    event MarketIdAdded(bytes32 indexed marketId);
    event MarketIdRemoved(bytes32 indexed marketId);

    function getDebtAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function getMarketIds() external view returns (bytes32[] memory marketIds_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
