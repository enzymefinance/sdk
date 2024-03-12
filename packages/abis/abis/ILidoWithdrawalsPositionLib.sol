// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ILidoWithdrawalsPositionLib {
    struct Request {
        uint128 amount;
        uint128 id;
    }

    event RequestAdded(uint256 indexed id, uint256 amount);
    event RequestRemoved(uint256 indexed id);

    function getDebtAssets() external pure returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function getRequests() external view returns (Request[] memory requests_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
