// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IGlobalConfigLib {
    event GlobalConfigLibSet(address nextGlobalConfigLib);

    function formatDepositCall(address _vaultProxy, address _depositAsset, uint256 _depositAssetAmount)
        external
        view
        returns (address target_, bytes memory payload_);
    function formatSingleAssetRedemptionCall(
        address _vaultProxy,
        address _recipient,
        address _asset,
        uint256 _amount,
        bool _amountIsShares
    ) external view returns (address target_, bytes memory payload_);
    function getDispatcher() external view returns (address dispatcher_);
    function getGlobalConfigLib() external view returns (address globalConfigLib_);
    function init(address _dispatcher) external;
    function isValidRedeemSharesCall(
        address _vaultProxy,
        address _recipientToValidate,
        uint256 _sharesAmountToValidate,
        address _redeemContract,
        bytes4 _redeemSelector,
        bytes memory _redeemData
    ) external view returns (bool isValid_);
    function proxiableUUID() external pure returns (bytes32 uuid_);
    function setGlobalConfigLib(address _nextGlobalConfigLib) external;
}
