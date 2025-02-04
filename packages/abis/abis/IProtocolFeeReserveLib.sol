// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IProtocolFeeReserveLib {
    event MlnTokenBalanceWithdrawn(address indexed to, uint256 amount);
    event ProtocolFeeReserveLibSet(address nextProtocolFeeReserveLib);
    event SharesBoughtBack(address indexed vaultProxy, uint256 sharesAmount, uint256 mlnValue, uint256 mlnBurned);

    function buyBackSharesViaTrustedVaultProxy(uint256 _sharesAmount, uint256 _mlnValue, uint256)
        external
        returns (uint256 mlnAmountToBurn_);
    function callOnContract(address _contract, bytes memory _callData) external;
    function getDispatcher() external view returns (address dispatcher_);
    function getProtocolFeeReserveLib() external view returns (address protocolFeeReserveLib_);
    function init(address _dispatcher) external;
    function proxiableUUID() external pure returns (bytes32 uuid_);
    function setProtocolFeeReserveLib(address _nextProtocolFeeReserveLib) external;
}
