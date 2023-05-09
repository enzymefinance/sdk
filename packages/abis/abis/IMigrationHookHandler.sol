// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IMigrationHookHandler {
    function invokeMigrationInCancelHook(
        address _vaultProxy,
        address _prevFundDeployer,
        address _nextVaultAccessor,
        address _nextVaultLib
    ) external;
    function invokeMigrationOutHook(
        uint8 _hook,
        address _vaultProxy,
        address _nextFundDeployer,
        address _nextVaultAccessor,
        address _nextVaultLib
    ) external;
}
