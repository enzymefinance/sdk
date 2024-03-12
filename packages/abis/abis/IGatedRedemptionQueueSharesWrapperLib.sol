// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IGatedRedemptionQueueSharesWrapperLib {
    type DepositMode is uint8;

    struct DepositRequest {
        uint64 index;
        uint128 assetAmount;
    }

    struct RedemptionRequest {
        uint64 index;
        uint64 lastRedeemed;
        uint128 sharesPending;
    }

    struct RedemptionWindowConfig {
        uint64 firstWindowStart;
        uint32 frequency;
        uint32 duration;
        uint64 relativeSharesCap;
    }

    event Approval(address indexed owner, address indexed spender, uint256 value);
    event DepositApproval(address indexed user, address indexed asset, uint256 amount);
    event DepositModeSet(DepositMode mode);
    event DepositRequestAdded(address indexed user, address indexed depositAsset, uint256 depositAssetAmount);
    event DepositRequestRemoved(address indexed user, address indexed depositAsset);
    event Deposited(
        address indexed user, address indexed depositToken, uint256 depositTokenAmount, uint256 sharesReceived
    );
    event Initialized(address indexed vaultProxy);
    event Kicked(address indexed user, uint256 sharesAmount);
    event ManagerAdded(address indexed user);
    event ManagerRemoved(address indexed user);
    event Redeemed(
        address indexed user, uint256 sharesAmount, address indexed redemptionAsset, uint256 redemptionAssetAmount
    );
    event RedemptionApproval(address indexed user, uint256 amount);
    event RedemptionAssetSet(address indexed asset);
    event RedemptionRequestAdded(address indexed user, uint256 sharesAmount);
    event RedemptionRequestRemoved(address indexed user);
    event RedemptionWindowConfigSet(
        uint256 firstWindowStart, uint256 frequency, uint256 duration, uint256 relativeSharesCap
    );
    event Transfer(address indexed from, address indexed to, uint256 value);
    event TransferApproval(address indexed sender, address indexed recipient, uint256 amount);
    event TransferForced(address indexed sender, address indexed recipient, uint256 amount);
    event UseDepositApprovalsSet(bool useApprovals);
    event UseRedemptionApprovalsSet(bool useApprovals);
    event UseTransferApprovalsSet(bool useApprovals);

    receive() external payable;

    function addManagers(address[] memory _managers) external;
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function calcLatestRedemptionWindow() external view returns (uint256 windowStart_, uint256 windowEnd_);
    function cancelRequestDeposit(address _depositAsset) external;
    function cancelRequestRedeem() external;
    function decimals() external view returns (uint8 decimals_);
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);
    function deposit(address _depositAsset, uint256 _depositAssetAmount, uint256 _minSharesAmount)
        external
        payable
        returns (uint256 sharesReceived_);
    function depositAllFromQueue(address _depositAsset)
        external
        returns (address[] memory users_, uint256[] memory userSharesReceived_);
    function depositApprovalsAreUsed() external view returns (bool approvalsUsed_);
    function depositFromQueue(address _depositAsset, address[] memory _users)
        external
        returns (uint256[] memory userSharesReceived_);
    function forceTransfer(address _sender, address _recipient) external returns (uint256 amount_);
    function getDepositApproval(address _user, address _asset) external view returns (uint256 amount_);
    function getDepositMode() external view returns (DepositMode mode_);
    function getDepositQueueUserRequest(address _depositAsset, address _user)
        external
        view
        returns (DepositRequest memory request_);
    function getDepositQueueUsers(address _depositAsset) external view returns (address[] memory users_);
    function getRedemptionApproval(address _user) external view returns (uint256 amount_);
    function getRedemptionAsset() external view returns (address asset_);
    function getRedemptionQueue()
        external
        view
        returns (uint256 totalSharesPending_, uint256 relativeSharesAllowed_, uint256 relativeSharesCheckpointed_);
    function getRedemptionQueueUserByIndex(uint256 _index) external view returns (address user_);
    function getRedemptionQueueUserRequest(address _user) external view returns (RedemptionRequest memory request_);
    function getRedemptionQueueUsers() external view returns (address[] memory users_);
    function getRedemptionQueueUsersLength() external view returns (uint256 length_);
    function getRedemptionWindowConfig()
        external
        view
        returns (RedemptionWindowConfig memory redemptionWindowConfig_);
    function getTransferApproval(address _sender, address _recipient) external view returns (uint256 amount_);
    function getVaultProxy() external view returns (address vaultProxy_);
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
    function init(
        address _vaultProxy,
        address[] memory _managers,
        address _redemptionAsset,
        bool _useDepositApprovals,
        bool _useRedemptionApprovals,
        bool _useTransferApprovals,
        DepositMode _depositMode,
        RedemptionWindowConfig memory _windowConfig
    ) external;
    function isManager(address _user) external view returns (bool isManager_);
    function kick(address _user) external returns (uint256 sharesRedeemed_);
    function name() external view returns (string memory name_);
    function redeemFromQueue(uint256 _startIndex, uint256 _endIndex)
        external
        returns (address[] memory usersRedeemed_, uint256[] memory sharesRedeemed_);
    function redemptionApprovalsAreUsed() external view returns (bool approvalsUsed_);
    function removeManagers(address[] memory _managers) external;
    function requestDeposit(address _depositAsset, uint256 _depositAssetAmount) external payable;
    function requestRedeem(uint256 _sharesAmount) external;
    function setDepositApprovals(address[] memory _users, address[] memory _assets, uint256[] memory _amounts)
        external;
    function setDepositMode(DepositMode _mode) external;
    function setRedemptionApprovals(address[] memory _users, uint256[] memory _amounts) external;
    function setRedemptionAsset(address _nextRedemptionAsset) external;
    function setRedemptionWindowConfig(RedemptionWindowConfig memory _nextWindowConfig) external;
    function setTransferApprovals(address[] memory _users, address[] memory _recipients, uint256[] memory _amounts)
        external;
    function setUseDepositApprovals(bool _nextUseDepositApprovals) external;
    function setUseRedemptionApprovals(bool _nextUseRedemptionApprovals) external;
    function setUseTransferApprovals(bool _nextUseTransferApprovals) external;
    function symbol() external view returns (string memory symbol_);
    function totalSupply() external view returns (uint256);
    function transfer(address _recipient, uint256 _amount) external returns (bool success_);
    function transferApprovalsAreUsed() external view returns (bool approvalsUsed_);
    function transferFrom(address _sender, address _recipient, uint256 _amount) external returns (bool success_);
}
