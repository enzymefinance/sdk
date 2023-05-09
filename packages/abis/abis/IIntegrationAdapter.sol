// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IIntegrationAdapter {
    function parseAssetsForAction(address _vaultProxy, bytes4 _selector, bytes memory _encodedCallArgs)
        external
        view
        returns (
            uint8 spendAssetsHandleType_,
            address[] memory spendAssets_,
            uint256[] memory spendAssetAmounts_,
            address[] memory incomingAssets_,
            uint256[] memory minIncomingAssetAmounts_
        );
}
