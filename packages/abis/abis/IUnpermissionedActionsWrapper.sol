// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IUnpermissionedActionsWrapper {
    function getContinuousFeesForFund(address _comptrollerProxy)
        external
        view
        returns (address[] memory continuousFees_);
    function getFeeManager() external view returns (address feeManager_);
    function invokeContinuousFeeHookAndPayoutSharesOutstandingForFund(address _comptrollerProxy, address[] memory _fees)
        external;
}
