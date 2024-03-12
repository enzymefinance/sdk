// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IUniswapV3LiquidityPositionLib {
    event NFTPositionAdded(uint256 indexed tokenId);
    event NFTPositionRemoved(uint256 indexed tokenId);

    function getDebtAssets() external pure returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getNftIds() external view returns (uint256[] memory nftIds_);
    function getNonFungibleTokenManager() external view returns (address nonFungibleTokenManager_);
    function getPairForNft(uint256 _nftId) external view returns (address token0_, address token1_);
    function getToken0ForNft(uint256 _nftId) external view returns (address token0_);
    function getToken1ForNft(uint256 _nftId) external view returns (address token1_);
    function getValueInterpreter() external view returns (address valueInterpreter_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
