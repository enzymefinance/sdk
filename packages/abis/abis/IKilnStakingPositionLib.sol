// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IKilnStakingPositionLib {
    event ValidatorsAdded(address stakingContractAddress, uint256 validatorAmount);

    function ETH_AMOUNT_PER_NODE() external view returns (uint256);
    function WETH_TOKEN() external view returns (address);
    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getValidatorCount() external view returns (uint256 validatorCount_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
