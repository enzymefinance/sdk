// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IPendleMarketsRegistry {
    error AlreadyRegistered();
    error InvalidDuration();
    error NotRegistered();
    error Unauthorized();
    error UnequalLengths();

    event MarketAdded(address indexed vaultProxy, address indexed marketAddress, uint32 duration);
    event MarketRemoved(address indexed vaultProxy, address indexed marketAddress);

    function addAllowedMarkets(address[] memory _marketAddresses, uint32[] memory _durations) external;
    function getMarketDuration(address _vaultProxy, address _marketAddress) external view returns (uint32 duration_);
    function removeAllowedMarkets(address[] memory _marketAddresses) external;
}
