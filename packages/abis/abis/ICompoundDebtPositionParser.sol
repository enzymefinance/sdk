// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface ICompoundDebtPositionParser {
    function getCompToken() external view returns (address compToken_);
    function getCompoundPriceFeed() external view returns (address compoundPriceFeed_);
    function getValueInterpreter() external view returns (address valueInterpreter_);
    function parseAssetsForAction(address _externalPosition, uint256 _actionId, bytes memory _encodedActionArgs)
        external
        returns (
            address[] memory assetsToTransfer_,
            uint256[] memory amountsToTransfer_,
            address[] memory assetsToReceive_
        );
    function parseInitArgs(address, bytes memory) external returns (bytes memory initArgs_);
}
