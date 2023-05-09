// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IArbitraryLoanFixedInterestModule {
    event ConfigSetForLoan(
        address indexed loan,
        uint256 scaledPerSecondRatePreMaturity,
        uint256 scaledPerSecondRatePostMaturity,
        uint256 maturity,
        uint8 repaymentTrackingType,
        bool faceValueIsPrincipalOnly
    );
    event TotalInterestUpdatedForLoan(address indexed loan, uint256 totalInterest);
    event TotalPrincipalRepaidUpdatedForLoan(address indexed loan, uint256 totalPrincipalRepaid);

    struct AccountingInfo {
        uint128 totalInterestCached;
        uint32 totalInterestCachedTimestamp;
        uint96 scaledPerSecondRatePreMaturity;
        uint96 scaledPerSecondRatePostMaturity;
        uint32 maturity;
        uint112 totalPrincipalRepaid;
        uint8 repaymentTrackingType;
        bool faceValueIsPrincipalOnly;
    }

    function calcFaceValue(uint256 _totalBorrowed, uint256 _totalRepaid) external view returns (uint256 faceValue_);
    function configure(bytes memory _configData) external;
    function getAccountingInfoForLoan(address _loan) external view returns (AccountingInfo memory accountingInfo_);
    function preBorrow(uint256 _prevTotalBorrowed, uint256 _totalRepaid, uint256) external;
    function preClose(uint256, uint256) external;
    function preReconcile(
        uint256 _totalBorrowed,
        uint256 _prevTotalRepaid,
        uint256 _repayableLoanAssetAmount,
        address[] memory
    ) external returns (uint256 repayAmount_);
    function preRepay(uint256 _totalBorrowed, uint256 _prevTotalRepaid, uint256 _repayAmountInput)
        external
        returns (uint256 repayAmount_);
    function receiveCallFromLoan(bytes memory) external;
}
