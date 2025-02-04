// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ICompoundDebtPositionLib {
    event AssetBorrowed(address indexed asset, uint256 amount);
    event BorrowedAssetRepaid(address indexed asset, uint256 amount);
    event CollateralAssetAdded(address indexed asset, uint256 amount);
    event CollateralAssetRemoved(address indexed asset, uint256 amount);

    function assetIsCollateral(address _asset) external view returns (bool isCollateral);
    function getCTokenFromBorrowedAsset(address _borrowedAsset) external view returns (address cToken_);
    function getCompToken() external view returns (address compToken_);
    function getCompoundComptroller() external view returns (address compoundComptroller_);
    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getWethToken() external view returns (address wethToken_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
