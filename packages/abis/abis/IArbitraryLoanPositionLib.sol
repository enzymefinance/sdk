// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IArbitraryLoanPositionLib {
    event BorrowableAmountUpdated(uint256 borrowableAmount);
    event LoanClosed();
    event LoanConfigured(
        address indexed borrower, address indexed loanAsset, address indexed accountingModule, bytes32 description
    );
    event TotalBorrowedUpdated(uint256 totalBorrowed);
    event TotalRepaidUpdated(uint256 totalRepaid);

    function borrow(uint256 _amount) external;
    function getAccountingModule() external view returns (address accountingModule_);
    function getBorrowableAmount() external view returns (uint256 borrowableAmount_);
    function getBorrower() external view returns (address borrower_);
    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getLoanAsset() external view returns (address asset_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getTotalBorrowed() external view returns (uint256 totalBorrowed_);
    function getTotalRepaid() external view returns (uint256 totalRepaid_);
    function init(bytes memory) external;
    function loanIsClosed() external view returns (bool isClosed_);
    function receiveCallFromVault(bytes memory _actionData) external;
    function repay(uint256 _amount) external;
}
