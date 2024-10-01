// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IAaveV3FlashLoanAssetManager {
    error AaveV3FlashLoanAssetManager__ExecuteOperation__BalanceExceedsRepayment(uint256 balance);
    error AaveV3FlashLoanAssetManager__ExecuteOperation__UnauthorizedCaller();
    error AaveV3FlashLoanAssetManager__ExecuteOperation__UnauthorizedInitiator();
    error AaveV3FlashLoanAssetManager__FlashLoan__Unauthorized();
    error AaveV3FlashLoanAssetManager__Init__AlreadyInitialized();

    event BorrowedAssetsRecipientSet(address borrowedAssetsRecipient);
    event OwnerSet(address owner);

    function AAVE_REFERRAL_CODE() external view returns (uint16);
    function ADDRESSES_PROVIDER() external view returns (address);
    function POOL() external view returns (address poolAddress_);
    function executeOperation(
        address[] memory _assets,
        uint256[] memory _amounts,
        uint256[] memory _premiums,
        address _initiator,
        bytes memory _params
    ) external returns (bool success_);
    function flashLoan(address[] memory _assets, uint256[] memory _amounts, bytes memory _encodedCalls) external;
    function getBorrowedAssetsRecipient() external view returns (address borrowedAssetsRecipient_);
    function getOwner() external view returns (address owner_);
    function init(address _owner, address _borrowedAssetsRecipient) external;
}
