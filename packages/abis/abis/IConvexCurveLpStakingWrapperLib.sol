// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IConvexCurveLpStakingWrapperLib {
    struct TotalHarvestData {
        uint128 integral;
        uint128 lastCheckpointBalance;
    }

    struct UserHarvestData {
        uint128 integral;
        uint128 claimableReward;
    }

    event Approval(address indexed owner, address indexed spender, uint256 value);
    event Deposited(address indexed from, address indexed to, uint256 amount);
    event PauseToggled(bool isPaused);
    event RewardTokenAdded(address token);
    event TokenNameSet(string name);
    event TokenSymbolSet(string symbol);
    event TotalHarvestIntegralUpdated(address indexed rewardToken, uint256 integral);
    event TotalHarvestLastCheckpointBalanceUpdated(address indexed rewardToken, uint256 lastCheckpointBalance);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event UserHarvestUpdated(
        address indexed user, address indexed rewardToken, uint256 integral, uint256 claimableReward
    );
    event Withdrawn(address indexed caller, address indexed from, address indexed to, uint256 amount);

    function addExtraRewards() external;
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function claimRewardsFor(address _for)
        external
        returns (address[] memory rewardTokens_, uint256[] memory claimedAmounts_);
    function claimRewardsForWithoutCheckpoint(address _for)
        external
        returns (address[] memory rewardTokens_, uint256[] memory claimedAmounts_);
    function decimals() external view returns (uint8 decimals_);
    function decreaseAllowance(address spender, uint256 subtractedValue) external returns (bool);
    function depositTo(address _to, uint256 _amount) external;
    function getConvexPool() external view returns (address convexPool_);
    function getConvexPoolId() external view returns (uint256 convexPoolId_);
    function getCurveLpToken() external view returns (address curveLPToken_);
    function getRewardTokenAtIndex(uint256 _index) external view returns (address rewardToken_);
    function getRewardTokenCount() external view returns (uint256 count_);
    function getRewardTokens() external view returns (address[] memory rewardTokens_);
    function getTotalHarvestDataForRewardToken(address _rewardToken)
        external
        view
        returns (TotalHarvestData memory totalHarvestData_);
    function getUserHarvestDataForRewardToken(address _user, address _rewardToken)
        external
        view
        returns (UserHarvestData memory userHarvestData_);
    function increaseAllowance(address spender, uint256 addedValue) external returns (bool);
    function init(uint256 _pid) external;
    function isPaused() external view returns (bool isPaused_);
    function name() external view returns (string memory name_);
    function setApprovals() external;
    function symbol() external view returns (string memory symbol_);
    function togglePause(bool _isPaused) external;
    function totalSupply() external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    function withdrawTo(address _to, uint256 _amount) external;
    function withdrawToOnBehalf(address _onBehalf, address _to, uint256 _amount) external;
    function withdrawToWithoutCheckpoint(address _to, uint256 _amount) external;
}
