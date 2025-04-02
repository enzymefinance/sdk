// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IEnzymeV4VaultAdapter {
    type SpendAssetsHandleType is uint8;

    error EnzymeV4VaultAdapter__InvalidAction();
    error EnzymeV4VaultAdapter__InvalidVaultProxy();

    function DISPATCHER() external view returns (address);
    function FUND_DEPLOYER_ADDRESS() external view returns (address);
    function action(address _vaultProxyAddress, bytes memory _actionData, bytes memory) external;
    function getIntegrationManager() external view returns (address integrationManager_);
    function parseAssetsForAction(address, bytes4 _selector, bytes memory _actionData)
        external
        view
        returns (
            SpendAssetsHandleType spendAssetsHandleType_,
            address[] memory spendAssets_,
            uint256[] memory spendAssetAmounts_,
            address[] memory incomingAssets_,
            uint256[] memory minIncomingAssetAmounts_
        );
}
