// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IArbitraryTokenPhasedSharesWrapperLib {
    type State is uint8;

    event AllowedDepositorListIdSet(uint256 listId);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Deposited(address indexed user, uint256 amount);
    event FeePaid(address token, uint256 amount);
    event Initialized(
        address vaultProxy,
        address depositToken,
        bool transfersAllowed,
        address feeRecipient,
        uint16 feeBps,
        bool feeExcludesDepositTokenPrincipal
    );
    event ManagerSet(address manager);
    event ProtocolFeePaid(address token, uint256 amount);
    event ProtocolFeeStarted();
    event StateSet(State state);
    event TotalDepositMaxSet(uint256 totalDepositMax);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Withdrawn(address indexed user, uint256 amount, address[] claimedAssets, uint256[] claimedAssetAmounts);

    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function decimals() external view returns (uint8 decimals_);
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);
    function deposit(uint256 _amount) external;
    function enterLockedState() external;
    function enterRedeemState(address[] memory _untrackedAssetsToClaim) external;
    function getAllowedDepositorListId() external view returns (uint256 allowedDepositorListId_);
    function getDepositToken() external view returns (address depositToken_);
    function getFeeBps() external view returns (uint256 feeBps_);
    function getFeeExcludesDepositTokenPrincipal() external view returns (bool excludesPrincipal_);
    function getFeeRecipient() external view returns (address feeRecipient_);
    function getManager() external view returns (address manager_);
    function getProtocolFeeStart() external view returns (uint256 protocolFeeStart_);
    function getRedeemedAssets() external view returns (address[] memory redeemedAssets_);
    function getState() external view returns (State state_);
    function getTotalDepositMax() external view returns (uint256 totalDepositMax_);
    function getTransfersAllowed() external view returns (bool transfersAllowed_);
    function getVaultProxy() external view returns (address vaultProxy_);
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
    function init(
        address _vaultProxy,
        address _depositToken,
        uint128 _allowedDepositorListId,
        bool _transfersAllowed,
        uint128 _totalDepositMax,
        address _feeRecipient,
        uint16 _feeBps,
        bool _feeExcludesDepositTokenPrincipal,
        address _manager
    ) external;
    function name() external view returns (string memory name_);
    function setAllowedDepositorListId(uint128 _nextAllowedDepositorListId) external;
    function setManager(address _nextManager) external;
    function setTotalDepositMax(uint128 _nextTotalDepositMax) external;
    function symbol() external view returns (string memory symbol_);
    function totalSupply() external view returns (uint256);
    function transfer(address _recipient, uint256 _amount) external returns (bool success_);
    function transferFrom(address _sender, address _recipient, uint256 _amount) external returns (bool success_);
    function withdraw(uint256 _amount, address[] memory _additionalAssets)
        external
        returns (address[] memory claimedAssets_, uint256[] memory claimedAssetAmounts_);
}
