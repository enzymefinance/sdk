// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IPendleV2PositionLib {
    error MarketExchangeRateBelowOne(int256 exchangeRate);
    error MarketExpired();
    error MarketProportionMustNotEqualOne();
    error MarketRateScalarBelowZero(int256 rateScalar);
    error MarketZeroTotalPtOrTotalAsset(int256 totalPt, int256 totalAsset);

    event LpTokenAdded(address indexed lpToken);
    event LpTokenRemoved(address indexed lpToken);
    event PrincipalTokenAdded(address indexed principalToken, address indexed market);
    event PrincipalTokenRemoved(address indexed principalToken);

    function getDebtAssets() external pure returns (address[] memory assets_, uint256[] memory amounts_);
    function getLPTokens() external view returns (address[] memory lpTokenAddresses_);
    function getManagedAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function getMarketForPrincipalToken(address _principalTokenAddress)
        external
        view
        returns (address marketAddress_);
    function getPrincipalTokens() external view returns (address[] memory principalTokenAddresses_);
    function init(bytes memory _data) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
