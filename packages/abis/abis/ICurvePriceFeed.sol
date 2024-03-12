// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ICurvePriceFeed {
    struct PoolInfo {
        address invariantProxyAsset;
        uint8 invariantProxyAssetDecimals;
        uint88 lastValidatedVirtualPrice;
    }

    event CurvePoolOwnerSet(address poolOwner);
    event DerivativeAdded(address indexed derivative, address indexed pool);
    event DerivativeRemoved(address indexed derivative);
    event InvariantProxyAssetForPoolSet(address indexed pool, address indexed invariantProxyAsset);
    event PoolRemoved(address indexed pool);
    event ValidatedVirtualPriceForPoolUpdated(address indexed pool, uint256 virtualPrice);

    function addGaugeTokens(address[] memory _gaugeTokens, address[] memory _pools) external;
    function addGaugeTokensWithoutValidation(address[] memory _gaugeTokens, address[] memory _pools) external;
    function addPools(
        address[] memory _pools,
        address[] memory _invariantProxyAssets,
        bool[] memory _reentrantVirtualPrices,
        address[] memory _lpTokens,
        address[] memory _gaugeTokens
    ) external;
    function addPoolsWithoutValidation(
        address[] memory _pools,
        address[] memory _invariantProxyAssets,
        bool[] memory _reentrantVirtualPrices,
        address[] memory _lpTokens,
        address[] memory _gaugeTokens
    ) external;
    function calcUnderlyingValues(address _derivative, uint256 _derivativeAmount)
        external
        returns (address[] memory underlyings_, uint256[] memory underlyingAmounts_);
    function getCurvePoolOwner() external view returns (address poolOwner_);
    function getFundDeployer() external view returns (address fundDeployer_);
    function getLpTokenForPool(address _pool) external view returns (address lpToken_);
    function getOwner() external view returns (address owner_);
    function getPoolForDerivative(address _derivative) external view returns (address pool_);
    function getPoolInfo(address _pool) external view returns (PoolInfo memory poolInfo_);
    function isSupportedAsset(address _asset) external view returns (bool isSupported_);
    function removeDerivatives(address[] memory _derivatives) external;
    function removePools(address[] memory _pools) external;
    function setCurvePoolOwner(address _nextPoolOwner) external;
    function updatePoolInfo(
        address[] memory _pools,
        address[] memory _invariantProxyAssets,
        bool[] memory _reentrantVirtualPrices
    ) external;
}
