// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IAaveDebtPositionLib {
    event BorrowedAssetAdded(address indexed asset);
    event BorrowedAssetRemoved(address indexed asset);
    event CollateralAssetAdded(address indexed asset);
    event CollateralAssetRemoved(address indexed asset);

    function assetIsBorrowed(address _asset) external view returns (bool isBorrowed_);
    function assetIsCollateral(address _asset) external view returns (bool isCollateral_);
    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getDebtTokenForBorrowedAsset(address _borrowedAsset) external view returns (address debtToken_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
