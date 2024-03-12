// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IDepositWrapper {
    receive() external payable;

    function exchangeErc20AndBuyShares(
        address _comptrollerProxy,
        uint256 _minSharesQuantity,
        address _inputAsset,
        uint256 _maxInputAssetAmount,
        address _exchange,
        address _exchangeApproveTarget,
        bytes memory _exchangeData,
        uint256 _exchangeMinReceived
    ) external returns (uint256 sharesReceived_);
    function exchangeEthAndBuyShares(
        address _comptrollerProxy,
        uint256 _minSharesQuantity,
        address _exchange,
        address _exchangeApproveTarget,
        bytes memory _exchangeData,
        uint256 _exchangeMinReceived
    ) external payable returns (uint256 sharesReceived_);
}
