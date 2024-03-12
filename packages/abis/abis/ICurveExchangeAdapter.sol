// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ICurveExchangeAdapter {
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
    function getCurveExchangeAddressProvider() external view returns (address curveExchangeAddressProvider_);
    function getCurveExchangeWethToken() external view returns (address curveExchangeWethToken_);
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
    function takeOrder(address _vaultProxy, bytes memory _actionData, bytes memory) external;
}
