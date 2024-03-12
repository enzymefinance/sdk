// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IStakeWiseV3StakingPositionParser {
    function STAKEWISE_V3_VAULT_REGISTRY() external view returns (address);
    function WETH_ADDRESS() external view returns (address);
    function parseAssetsForAction(address, uint256 _actionId, bytes memory _encodedActionArgs)
        external
        view
        returns (
            address[] memory assetsToTransfer_,
            uint256[] memory amountsToTransfer_,
            address[] memory assetsToReceive_
        );
    function parseInitArgs(address, bytes memory) external pure returns (bytes memory initArgs_);
}
