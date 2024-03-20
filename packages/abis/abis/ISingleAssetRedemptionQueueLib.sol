// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISingleAssetRedemptionQueueLib {
    error AlreadyInitialized();
    error IsShutdown();
    error NotBypassable();
    error NotWithdrawable();
    error OutOfRange();
    error Unauthorized();
    error UndefinedVaultProxy();

    event BypassableSharesThresholdSet(uint256 nextSharesAmount);
    event Initialized(address indexed vaultProxy);
    event ManagerAdded(address indexed user);
    event ManagerRemoved(address indexed user);
    event Redeemed(uint256 indexed id, address indexed redemptionAsset, uint256 redemptionAssetAmount);
    event RedemptionAssetSet(address indexed asset);
    event RedemptionRequestAdded(uint256 indexed id, address indexed user, uint256 sharesAmount);
    event RequestBypassed(uint256 indexed id);
    event RequestWithdrawn(uint256 indexed id);
    event Shutdown();

    function addManagers(address[] memory _managers) external;
    function getBypassableSharesThreshold() external view returns (uint256 sharesAmount_);
    function getNextNewId() external view returns (uint256 id_);
    function getNextQueuedId() external view returns (uint256 id_);
    function getRedemptionAsset() external view returns (address asset_);
    function getSharesForRequest(uint256 _id) external view returns (uint256 sharesAmount_);
    function getUserForRequest(uint256 _id) external view returns (address user_);
    function getVaultProxy() external view returns (address vaultProxy_);
    function init(
        address _vaultProxy,
        address _redemptionAsset,
        uint256 _bypassableSharesThreshold,
        address[] memory _managers
    ) external;
    function isManager(address _user) external view returns (bool isManager_);
    function queueIsShutdown() external view returns (bool isShutdown_);
    function redeemFromQueue(uint256 _endId, uint256[] memory _idsToBypass) external;
    function removeManagers(address[] memory _managers) external;
    function requestRedeem(uint256 _sharesAmount) external returns (uint256 id_);
    function setBypassableSharesThreshold(uint256 _nextSharesThreshold) external;
    function setRedemptionAsset(address _nextRedemptionAsset) external;
    function shutdown() external;
    function withdrawRequest(uint256 _id) external;
}
