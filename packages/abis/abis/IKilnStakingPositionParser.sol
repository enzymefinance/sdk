// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IKilnStakingPositionParser {
    function ADDRESS_LIST_REGISTRY_CONTRACT() external view returns (address);
    function ETH_AMOUNT_PER_NODE() external view returns (uint256);
    function STAKING_CONTRACTS_LIST_ID() external view returns (uint256);
    function WETH_TOKEN() external view returns (address);
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
