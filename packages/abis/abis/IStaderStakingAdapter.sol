// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

library IIntegrationManager {
    type SpendAssetsHandleType is uint8;
}

interface IStaderStakingAdapter {
    receive() external payable;

    function STADER_STAKE_POOLS_MANAGER() external view returns (address);
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
    function unwrap(address _vaultProxy, bytes memory _actionData, bytes memory) external;
    function wrap(address _vaultProxy, bytes memory _actionData, bytes memory) external;
}
