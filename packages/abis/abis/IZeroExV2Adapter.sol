// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IZeroExV2Adapter {
    event AllowedMakerAdded(address indexed account);
    event AllowedMakerRemoved(address indexed account);

    function CLAIM_REWARDS_SELECTOR() external view returns (bytes4);
    function LEND_AND_STAKE_SELECTOR() external view returns (bytes4);
    function LEND_SELECTOR() external view returns (bytes4);
    function REDEEM_SELECTOR() external view returns (bytes4);
    function STAKE_SELECTOR() external view returns (bytes4);
    function TAKE_MULTIPLE_ORDERS_SELECTOR() external view returns (bytes4);
    function TAKE_ORDER_SELECTOR() external view returns (bytes4);
    function UNSTAKE_AND_REDEEM_SELECTOR() external view returns (bytes4);
    function UNSTAKE_SELECTOR() external view returns (bytes4);
    function addAllowedMakers(address[] memory _accountsToAdd) external;
    function getFundDeployer() external view returns (address fundDeployer_);
    function getIntegrationManager() external view returns (address integrationManager_);
    function getOwner() external view returns (address owner_);
    function getZeroExV2Exchange() external view returns (address zeroExV2Exchange_);
    function isAllowedMaker(address _who) external view returns (bool isAllowedMaker_);
    function parseAssetsForAction(address, bytes4 _selector, bytes memory _actionData)
        external
        view
        returns (
            uint8 spendAssetsHandleType_,
            address[] memory spendAssets_,
            uint256[] memory spendAssetAmounts_,
            address[] memory incomingAssets_,
            uint256[] memory minIncomingAssetAmounts_
        );
    function removeAllowedMakers(address[] memory _accountsToRemove) external;
    function takeOrder(address _vaultProxy, bytes memory _actionData, bytes memory _assetData) external;
}
