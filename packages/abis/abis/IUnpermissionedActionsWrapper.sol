// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IUnpermissionedActionsWrapper {
    function getContinuousFeesForFund(address _comptrollerProxy)
        external
        view
        returns (address[] memory continuousFees_);
    function getFeeManager() external view returns (address feeManager_);
    function invokeContinuousFeeHookAndPayoutSharesOutstandingForFund(address _comptrollerProxy, address[] memory _fees)
        external;
}
