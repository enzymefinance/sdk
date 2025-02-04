// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IArbitraryLoanTotalNominalDeltaOracleModule {
    struct OracleInfo {
        address oracle;
        uint32 stalenessThreshold;
    }

    event OracleSetForLoan(address indexed loan, address indexed oracle, uint32 stalenessThreshold);

    function calcFaceValue(uint256 _totalBorrowed, uint256 _totalRepaid) external view returns (uint256 faceValue_);
    function configure(bytes memory _configData) external;
    function getOracleInfoForLoan(address _loan) external view returns (OracleInfo memory oracleInfo_);
    function preBorrow(uint256, uint256, uint256) external;
    function preClose(uint256, uint256) external;
    function preReconcile(uint256, uint256, uint256 _repayableLoanAssetAmount, address[] memory)
        external
        returns (uint256 repayAmount_);
    function preRepay(uint256 _totalBorrowed, uint256 _prevTotalRepaid, uint256 _repayAmountInput)
        external
        returns (uint256 repayAmount_);
    function receiveCallFromLoan(bytes memory) external;
}
