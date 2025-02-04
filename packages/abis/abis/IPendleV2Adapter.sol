// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

library IIntegrationManager {
    type SpendAssetsHandleType is uint8;
}

interface IPendleV2Adapter {
    error PendleV2Adapter__InvalidAction();

    receive() external payable;

    function action(address _vaultProxyAddress, bytes memory _actionData, bytes memory) external;
    function getIntegrationManager() external view returns (address integrationManager_);
    function parseAssetsForAction(address, bytes4 _selector, bytes memory _actionData)
        external
        view
        returns (
            IIntegrationManager.SpendAssetsHandleType spendAssetsHandleType_,
            address[] memory spendAssets_,
            uint256[] memory spendAssetAmounts_,
            address[] memory incomingAssets_,
            uint256[] memory minIncomingAssetAmounts_
        );
}
