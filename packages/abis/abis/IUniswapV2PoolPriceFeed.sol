// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IUniswapV2PoolPriceFeed {
    struct PoolTokenInfo {
        address token0;
        address token1;
        uint8 token0Decimals;
        uint8 token1Decimals;
    }

    event PoolTokenAdded(address indexed poolToken, address token0, address token1);

    function addPoolTokens(address[] memory _poolTokens) external;
    function calcUnderlyingValues(address _derivative, uint256 _derivativeAmount)
        external
        returns (address[] memory underlyings_, uint256[] memory underlyingAmounts_);
    function getFactory() external view returns (address factory_);
    function getFundDeployer() external view returns (address fundDeployer_);
    function getOwner() external view returns (address owner_);
    function getPoolTokenInfo(address _poolToken) external view returns (PoolTokenInfo memory poolTokenInfo_);
    function getPoolTokenUnderlyings(address _poolToken) external view returns (address token0_, address token1_);
    function getValueInterpreter() external view returns (address valueInterpreter_);
    function isSupportedAsset(address _asset) external view returns (bool isSupported_);
}
