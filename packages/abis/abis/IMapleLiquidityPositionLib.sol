// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMapleLiquidityPositionLib {
    event PoolTokenV1PreMigrationValueSnapshotted(address indexed lendingPoolV1, uint256 value);
    event UsedLendingPoolAdded(address indexed lendingPool);
    event UsedLendingPoolRemoved(address indexed lendingPool);
    event UsedLendingPoolV2Added(address indexed lendingPoolV2);
    event UsedLendingPoolV2Removed(address indexed lendingPoolV2);

    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getPreMigrationValueSnapshotOfPoolTokenV1(address _poolV1)
        external
        view
        returns (uint256 valueSnapshot_);
    function getUsedLendingPoolsV1() external view returns (address[] memory poolsV1_);
    function getUsedLendingPoolsV2() external view returns (address[] memory poolsV2_);
    function init(bytes memory) external;
    function isUsedLendingPoolV2(address _poolV2) external view returns (bool isUsed_);
    function migratePoolsV1ToV2() external;
    function receiveCallFromVault(bytes memory _actionData) external;
    function snapshotPoolTokenV1BalanceValues() external;
}
