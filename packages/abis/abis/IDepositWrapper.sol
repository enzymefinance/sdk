// SPDX-License-Identifier: Unlicense
pragma solidity >=0.6.0 <0.9.0;

interface IDepositWrapper {
    function exchangeEthAndBuyShares(
        address _comptrollerProxy,
        uint256 _minSharesQuantity,
        address _exchange,
        address _exchangeApproveTarget,
        bytes memory _exchangeData,
        uint256 _minInvestmentAmount
    ) external payable returns (uint256 sharesReceived_);
    function getWethToken() external view returns (address wethToken_);
}
