// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISharesSplitterLib {
    event SplitPercentageSet(address indexed user, uint256 percentage);
    event TokenClaimed(address indexed user, address indexed token, uint256 amount);

    function claimToken(address _token) external returns (uint256 claimedAmount_);
    function claimTokenAmountTo(address _token, uint256 _amount, address _to)
        external
        returns (uint256 claimedAmount_);
    function getSplitPercentageForUser(address _user) external view returns (uint256 splitPercentage_);
    function getTokenBalClaimableForUser(address _user, address _token) external view returns (uint256 balClaimable_);
    function getTokenBalClaimedForUser(address _user, address _token) external view returns (uint256 balClaimed_);
    function getTotalTokenBalClaimed(address _token) external view returns (uint256 totalBalClaimed_);
    function init(address[] memory _users, uint256[] memory _splitPercentages) external;
    function redeemShares(
        address _vaultProxy,
        uint256 _amount,
        address _redeemContract,
        bytes4 _redeemSelector,
        bytes memory _redeemData
    ) external returns (uint256 sharesRedeemed_);
}
