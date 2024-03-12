// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMigrationHookHandler {
    type MigrationOutHook is uint8;

    function invokeMigrationInCancelHook(
        address _vaultProxy,
        address _prevFundDeployer,
        address _nextVaultAccessor,
        address _nextVaultLib
    ) external;
    function invokeMigrationOutHook(
        MigrationOutHook _hook,
        address _vaultProxy,
        address _nextFundDeployer,
        address _nextVaultAccessor,
        address _nextVaultLib
    ) external;
}
