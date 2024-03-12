// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IKilnStakingPositionLib {
    event PositionValuePaused();
    event PositionValueUnpaused();
    event ValidatorsAdded(address stakingContractAddress, uint256 validatorAmount);
    event ValidatorsRemoved(address stakingContractAddress, uint256 validatorAmount);

    function getDebtAssets() external pure returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function getValidatorCount() external view returns (uint256 validatorCount_);
    function init(bytes memory) external;
    function positionValueIsPaused() external view returns (bool paused_);
    function receiveCallFromVault(bytes memory _actionData) external;
}
