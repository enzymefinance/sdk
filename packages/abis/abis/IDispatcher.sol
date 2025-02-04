// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IDispatcher {
    type MigrationOutHook is uint8;

    event CurrentFundDeployerSet(address prevFundDeployer, address nextFundDeployer);
    event MigrationCancelled(
        address indexed vaultProxy,
        address indexed prevFundDeployer,
        address indexed nextFundDeployer,
        address nextVaultAccessor,
        address nextVaultLib,
        uint256 executableTimestamp
    );
    event MigrationExecuted(
        address indexed vaultProxy,
        address indexed prevFundDeployer,
        address indexed nextFundDeployer,
        address nextVaultAccessor,
        address nextVaultLib,
        uint256 executableTimestamp
    );
    event MigrationInCancelHookFailed(
        bytes failureReturnData,
        address indexed vaultProxy,
        address indexed prevFundDeployer,
        address indexed nextFundDeployer,
        address nextVaultAccessor,
        address nextVaultLib
    );
    event MigrationOutHookFailed(
        bytes failureReturnData,
        MigrationOutHook hook,
        address indexed vaultProxy,
        address indexed prevFundDeployer,
        address indexed nextFundDeployer,
        address nextVaultAccessor,
        address nextVaultLib
    );
    event MigrationSignaled(
        address indexed vaultProxy,
        address indexed prevFundDeployer,
        address indexed nextFundDeployer,
        address nextVaultAccessor,
        address nextVaultLib,
        uint256 executableTimestamp
    );
    event MigrationTimelockSet(uint256 prevTimelock, uint256 nextTimelock);
    event NominatedOwnerRemoved(address indexed nominatedOwner);
    event NominatedOwnerSet(address indexed nominatedOwner);
    event OwnershipTransferred(address indexed prevOwner, address indexed nextOwner);
    event SharesTokenSymbolSet(string _nextSymbol);
    event VaultProxyDeployed(
        address indexed fundDeployer,
        address indexed owner,
        address vaultProxy,
        address indexed vaultLib,
        address vaultAccessor,
        string fundName
    );

    function cancelMigration(address _vaultProxy, bool _bypassFailure) external;
    function claimOwnership() external;
    function deployVaultProxy(address _vaultLib, address _owner, address _vaultAccessor, string memory _fundName)
        external
        returns (address vaultProxy_);
    function executeMigration(address _vaultProxy, bool _bypassFailure) external;
    function getCurrentFundDeployer() external view returns (address currentFundDeployer_);
    function getFundDeployerForVaultProxy(address _vaultProxy) external view returns (address fundDeployer_);
    function getMigrationRequestDetailsForVaultProxy(address _vaultProxy)
        external
        view
        returns (
            address nextFundDeployer_,
            address nextVaultAccessor_,
            address nextVaultLib_,
            uint256 executableTimestamp_
        );
    function getMigrationTimelock() external view returns (uint256 migrationTimelock_);
    function getNominatedOwner() external view returns (address nominatedOwner_);
    function getOwner() external view returns (address owner_);
    function getSharesTokenSymbol() external view returns (string memory sharesTokenSymbol_);
    function getTimelockRemainingForMigrationRequest(address _vaultProxy)
        external
        view
        returns (uint256 secondsRemaining_);
    function hasExecutableMigrationRequest(address _vaultProxy) external view returns (bool hasExecutableRequest_);
    function hasMigrationRequest(address _vaultProxy) external view returns (bool hasMigrationRequest_);
    function removeNominatedOwner() external;
    function setCurrentFundDeployer(address _nextFundDeployer) external;
    function setMigrationTimelock(uint256 _nextTimelock) external;
    function setNominatedOwner(address _nextNominatedOwner) external;
    function setSharesTokenSymbol(string memory _nextSymbol) external;
    function signalMigration(
        address _vaultProxy,
        address _nextVaultAccessor,
        address _nextVaultLib,
        bool _bypassFailure
    ) external;
}
