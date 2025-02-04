// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMapleV1ToV2PoolMapper {
    event MigrationAllowed();
    event PoolMapped(address poolTokenV1, address poolTokenV2);
    event SnapshotsFrozen();

    function allowMigration() external;
    function freezeSnapshots() external;
    function getPoolTokenV2FromPoolTokenV1(address _poolTokenV1) external view returns (address poolTokenV2_);
    function mapPools(address[] memory _poolTokensV1, address[] memory _poolTokensV2) external;
    function migrateExternalPositions(address[] memory _proxies) external;
    function migrationIsAllowed() external view returns (bool allowed_);
    function snapshotExternalPositions(address[] memory _proxies) external;
    function snapshotsAreAllowed() external view returns (bool allowed_);
}
