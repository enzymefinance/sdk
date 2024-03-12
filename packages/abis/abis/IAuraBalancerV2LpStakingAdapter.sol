// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IAuraBalancerV2LpStakingAdapter {
    type SpendAssetsHandleType is uint8;

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
    function getIntegrationManager() external view returns (address integrationManager_);
    function lendAndStake(address _vaultProxy, bytes memory _actionData, bytes memory) external;
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
    function stake(address _vaultProxy, bytes memory _actionData, bytes memory) external;
    function takeOrder(address _vaultProxy, bytes memory _actionData, bytes memory) external;
    function unstake(address _vaultProxy, bytes memory _actionData, bytes memory) external;
    function unstakeAndRedeem(address _vaultProxy, bytes memory _actionData, bytes memory) external;
}
