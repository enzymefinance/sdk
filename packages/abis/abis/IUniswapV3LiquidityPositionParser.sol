// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IUniswapV3LiquidityPositionParser {
    function getUniswapV3NonfungiblePositionManager() external view returns (address nonfungiblePositionManager_);
    function getValueInterpreter() external view returns (address valueInterpreter_);
    function parseAssetsForAction(address _externalPosition, uint256 _actionId, bytes memory _encodedActionArgs)
        external
        view
        returns (
            address[] memory assetsToTransfer_,
            uint256[] memory amountsToTransfer_,
            address[] memory assetsToReceive_
        );
    function parseInitArgs(address, bytes memory) external view returns (bytes memory);
}
