// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMorphoBluePositionParser {
    error InvalidActionId();

    function parseAssetsForAction(address _externalPositionAddress, uint256 _actionId, bytes memory _encodedActionArgs)
        external
        view
        returns (
            address[] memory assetsToTransfer_,
            uint256[] memory amountsToTransfer_,
            address[] memory assetsToReceive_
        );
    function parseInitArgs(address, bytes memory) external pure returns (bytes memory);
}
