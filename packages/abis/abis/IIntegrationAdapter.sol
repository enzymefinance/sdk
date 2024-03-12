// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IIntegrationAdapter {
    type SpendAssetsHandleType is uint8;

    function parseAssetsForAction(address _vaultProxy, bytes4 _selector, bytes memory _encodedCallArgs)
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
