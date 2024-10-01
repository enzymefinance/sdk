// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

library IIntegrationManager {
    type SpendAssetsHandleType is uint8;
}

interface ITransferAssetsAdapter {
    error TransferAssetsAdapter__ParseAssetsForAction__InvalidSelector();

    function getIntegrationManager() external view returns (address integrationManager_);
    function parseAssetsForAction(address _vaultProxy, bytes4 _selector, bytes memory _actionData)
        external
        view
        returns (
            IIntegrationManager.SpendAssetsHandleType spendAssetsHandleType_,
            address[] memory spendAssets_,
            uint256[] memory spendAssetAmounts_,
            address[] memory,
            uint256[] memory
        );
    function transfer(address _vaultProxy, bytes memory _actionData, bytes memory _assetData) external;
}
