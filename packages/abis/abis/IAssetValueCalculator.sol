// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IAssetValueCalculator {
    function calcNormalizedAssetValue(address _baseAsset, address _quoteAsset)
        external
        returns (uint256 timestamp_, uint256 value_, bool valueIsValid_);
    function getValueInterpreter() external view returns (address valueInterpreter_);
}
