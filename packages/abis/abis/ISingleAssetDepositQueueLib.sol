// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISingleAssetDepositQueueLib {
    struct Request {
        address user;
        uint96 canCancelTime;
        uint256 depositAssetAmount;
    }

    error SingleAssetDepositQueue__AddManager__AlreadyManager();
    error SingleAssetDepositQueue__CancelRequest__MinRequestTimeNotElapsed();
    error SingleAssetDepositQueue__CancelRequest__Unauthorized();
    error SingleAssetDepositQueue__DepositFromQueue__OutOfRange();
    error SingleAssetDepositQueue__Init__AlreadyInitialized();
    error SingleAssetDepositQueue__Init__UndefinedVaultProxy();
    error SingleAssetDepositQueue__NotShutdown__Shutdown();
    error SingleAssetDepositQueue__OnlyManagerOrOwner__Unauthorized();
    error SingleAssetDepositQueue__OnlyOwner__Unauthorized();
    error SingleAssetDepositQueue__RemoveManager__NotManager();
    error SingleAssetDepositQueue__RequestDeposit__DepositAmountEqualsToZero();
    error SingleAssetDepositQueue__RequestDeposit__DepositorIsNotAllowlisted();
    error SingleAssetDepositQueue__RequestDeposit__TooLowDepositAmount();

    event DepositRequestAdded(uint88 id, address user, uint128 depositAssetAmount);
    event Deposited(uint256 id, uint256 sharesAmountReceived);
    event DepositorAllowlistIdSet(uint64 depositorAllowlistId);
    event Initialized(address vaultProxy, address depositAsset);
    event ManagerAdded(address user);
    event ManagerRemoved(address user);
    event MinDepositAssetAmountSet(uint128 minDepositAssetAmount);
    event MinRequestTimeSet(uint64 minRequestTime);
    event RequestBypassed(uint88 id);
    event RequestCanceled(uint88 id);
    event Shutdown();

    function ADDRESS_LIST_REGISTRY() external view returns (address);
    function GLOBAL_CONFIG() external view returns (address);
    function addManagers(address[] memory _managers) external;
    function cancelRequest(uint88 _id) external;
    function depositFromQueue(uint88 _endId, uint256[] memory _idsToBypass) external;
    function getDepositAsset() external view returns (address asset_);
    function getDepositorAllowlistId() external view returns (uint256 depositorAllowlistId_);
    function getMinDepositAssetAmount() external view returns (uint256 minDepositAssetAmount_);
    function getMinRequestTime() external view returns (uint256 minRequestTime_);
    function getNextNewId() external view returns (uint88 id_);
    function getNextQueuedId() external view returns (uint88 id_);
    function getRequest(uint256 _id) external view returns (Request memory request_);
    function getVaultProxy() external view returns (address vaultProxy_);
    function init(
        address _vaultProxy,
        address _depositAsset,
        address[] memory _managers,
        uint128 _minDepositAssetAmount,
        uint64 _minRequestTime,
        uint64 _depositorAllowlistId
    ) external;
    function isManager(address _user) external view returns (bool isManager_);
    function queueIsShutdown() external view returns (bool isShutdown_);
    function removeManagers(address[] memory _managers) external;
    function requestDeposit(uint128 _depositAssetAmount) external returns (uint88 id_);
    function setDepositorAllowlistId(uint64 _depositorAllowlistId) external;
    function setMinDepositAssetAmount(uint128 _minDepositAssetAmount) external;
    function setMinRequestTime(uint64 _minRequestTime) external;
    function shutdown() external;
}
