// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ICurveLiquidityAdapter {
    type SpendAssetsHandleType is uint8;

    receive() external payable;

    function CLAIM_REWARDS_SELECTOR() external view returns (bytes4);
    function LEND_AND_STAKE_SELECTOR() external view returns (bytes4);
    function LEND_SELECTOR() external view returns (bytes4);
    function REDEEM_SELECTOR() external view returns (bytes4);
    function STAKE_SELECTOR() external view returns (bytes4);
    function TAKE_MULTIPLE_ORDERS_SELECTOR() external view returns (bytes4);
    function TAKE_ORDER_SELECTOR() external view returns (bytes4);
    function UNSTAKE_AND_REDEEM_SELECTOR() external view returns (bytes4);
    function UNSTAKE_SELECTOR() external view returns (bytes4);
    function claimRewards(address _vaultProxy, bytes memory _actionData, bytes memory) external;
    function getCurveGaugeV2RewardsHandlerCrvToken() external view returns (address crvToken_);
    function getCurveGaugeV2RewardsHandlerMinter() external view returns (address minter_);
    function getCurveLiquidityWrappedNativeAsset() external view returns (address addressProvider_);
    function getIntegrationManager() external view returns (address integrationManager_);
    function lend(address _vaultProxy, bytes memory _actionData, bytes memory _assetData) external;
    function lendAndStake(address _vaultProxy, bytes memory _actionData, bytes memory _assetData) external;
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
    function redeem(address _vaultProxy, bytes memory _actionData, bytes memory _assetData) external;
    function stake(address _vaultProxy, bytes memory, bytes memory _assetData) external;
    function unstake(address _vaultProxy, bytes memory _actionData, bytes memory _assetData) external;
    function unstakeAndRedeem(address _vaultProxy, bytes memory _actionData, bytes memory _assetData) external;
}
