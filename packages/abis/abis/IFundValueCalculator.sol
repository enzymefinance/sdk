// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IFundValueCalculator {
    function calcGav(address _vaultProxy) external returns (address denominationAsset_, uint256 gav_);
    function calcGavInAsset(address _vaultProxy, address _quoteAsset) external returns (uint256 gav_);
    function calcGrossShareValue(address _vaultProxy)
        external
        returns (address denominationAsset_, uint256 grossShareValue_);
    function calcGrossShareValueInAsset(address _vaultProxy, address _quoteAsset)
        external
        returns (uint256 grossShareValue_);
    function calcNav(address _vaultProxy) external returns (address denominationAsset_, uint256 nav_);
    function calcNavInAsset(address _vaultProxy, address _quoteAsset) external returns (uint256 nav_);
    function calcNetShareValue(address _vaultProxy)
        external
        returns (address denominationAsset_, uint256 netShareValue_);
    function calcNetShareValueInAsset(address _vaultProxy, address _quoteAsset)
        external
        returns (uint256 netShareValue_);
    function calcNetValueForSharesHolder(address _vaultProxy, address _sharesHolder)
        external
        returns (address denominationAsset_, uint256 netValue_);
    function calcNetValueForSharesHolderInAsset(address _vaultProxy, address _sharesHolder, address _quoteAsset)
        external
        returns (uint256 netValue_);
    function calcProtocolFeeDueForFund(address _vaultProxy) external view returns (uint256 sharesDue_);
    function getFeeManager() external view returns (address feeManager_);
    function getProtocolFeeTracker() external view returns (address protocolFeeTracker_);
    function getValueInterpreter() external view returns (address valueInterpreter_);
}
