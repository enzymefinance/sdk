// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IStakeWiseV3StakingPositionLib {
    struct ExitRequest {
        address stakeWiseVaultAddress;
        uint256 positionTicket;
        uint256 sharesAmount;
    }

    event ExitRequestAdded(address indexed stakeWiseVaultAddress, uint256 positionTicket, uint256 sharesAmount);
    event ExitRequestRemoved(address indexed stakeWiseVaultAddress, uint256 positionTicket);
    event VaultTokenAdded(address indexed stakeWiseVaultAddress);
    event VaultTokenRemoved(address indexed stakeWiseVaultAddress);

    function WETH_TOKEN() external view returns (address);
    function getDebtAssets() external pure returns (address[] memory assets_, uint256[] memory amounts_);
    function getExitRequests() external view returns (ExitRequest[] memory exitRequests_);
    function getManagedAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function getStakeWiseVaultTokens() external view returns (address[] memory stakeWiseVaultTokens_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
