// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IHelperDataReaderRouter {
    struct HelperDataReaderInfo {
        address helperDataReader;
        uint8 version;
    }

    event HelperDataReaderUpdated(address indexed fundDeployer, HelperDataReaderInfo HelperDataReader);

    function getDispatcher() external view returns (address dispatcher_);
    function getHelperDataReaderForVault(address _vaultProxy) external view returns (HelperDataReaderInfo memory);
    function getHelperDataReaderInfoForFundDeployer(address _fundDeployer)
        external
        view
        returns (HelperDataReaderInfo memory helperDataReader_);
    function getVaultActiveExternalPositionsDetails(address _vaultProxy)
        external
        returns (bytes memory data, uint8 version);
    function getVaultDetails(address _vaultProxy) external returns (bytes memory data, uint8 version);
    function getVaultFeesDetails(address _vaultProxy) external returns (bytes memory data, uint8 version);
    function getVaultPoliciesDetails(address _vaultProxy) external returns (bytes memory data, uint8 version);
    function getVaultTrackedAssetsAmounts(address _vaultProxy) external returns (bytes memory data, uint8 version);
    function setHelperDataReaders(address[] memory _fundDeployers, HelperDataReaderInfo[] memory _helperDataReadersInfo)
        external;
}
