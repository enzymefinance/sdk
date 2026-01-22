// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMorphoBlueFlashLoanAssetManager {
    struct Call {
        address target;
        bytes data;
    }

    error MorphoBlueFlashLoanAssetManager__FlashLoan__Unauthorized();
    error MorphoBlueFlashLoanAssetManager__Init__AlreadyInitialized();
    error MorphoBlueFlashLoanAssetManager__OnMorphoFlashLoan__UnauthorizedCaller();
    error MorphoBlueFlashLoanAssetManager__OnMorphoFlashLoan__UnauthorizedInitiator();

    event BorrowedAssetsRecipientSet(address borrowedAssetsRecipient);
    event OwnerSet(address owner);

    function flashLoan(address _assetAddress, uint256 _amount, Call[] memory _calls) external;
    function getBorrowedAssetsRecipient() external view returns (address borrowedAssetsRecipient_);
    function getOwner() external view returns (address owner_);
    function init(address _owner, address _borrowedAssetsRecipient) external;
    function onMorphoFlashLoan(uint256 _amount, bytes memory _data) external;
}
