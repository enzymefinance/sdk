// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IExternalPositionProxy {
    fallback() external payable;

    receive() external payable;

    function getExternalPositionType() external view returns (uint256 externalPositionType_);
    function getVaultProxy() external view returns (address vaultProxy_);
    function receiveCallFromVault(bytes memory _data) external;
}
