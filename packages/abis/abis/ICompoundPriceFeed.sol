// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ICompoundPriceFeed {
    event CTokenAdded(address indexed cToken, address indexed token);

    function addCTokens(address[] memory _cTokens) external;
    function calcUnderlyingValues(address _derivative, uint256 _derivativeAmount)
        external
        returns (address[] memory underlyings_, uint256[] memory underlyingAmounts_);
    function getFundDeployer() external view returns (address fundDeployer_);
    function getOwner() external view returns (address owner_);
    function getTokenFromCToken(address _cToken) external view returns (address token_);
    function isSupportedAsset(address _asset) external view returns (bool isSupported_);
}
