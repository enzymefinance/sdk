// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IManualValueOracleLib {
    event Initialized(bytes32 description);
    event NominatedOwnerSet(address indexed nominatedOwner);
    event OwnerSet(address owner);
    event UpdaterSet(address updater);
    event ValueUpdated(int256 value);

    function claimOwnership() external;
    function getLastUpdated() external view returns (uint256 lastUpdated_);
    function getNominatedOwner() external view returns (address nominatedOwner_);
    function getOwner() external view returns (address owner_);
    function getUpdater() external view returns (address updater_);
    function getValue() external view returns (int256 value_);
    function getValueWithTimestamp() external view returns (int256 value_, uint256 lastUpdated_);
    function init(address _owner, address _updater, bytes32 _description) external;
    function setNominatedOwner(address _nextNominatedOwner) external;
    function setUpdater(address _nextUpdater) external;
    function updateValue(int192 _nextValue) external;
}
