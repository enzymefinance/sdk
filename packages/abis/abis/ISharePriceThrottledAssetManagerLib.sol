// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

library IMultiCallAccountMixin {
    struct Call {
        address target;
        bytes data;
    }
}

interface ISharePriceThrottledAssetManagerLib {
    struct Throttle {
        uint64 cumulativeLoss;
        uint64 lastLossTimestamp;
    }

    error AlreadyInitialized();
    error ExceedsOneHundredPercent();
    error ToleranceExceeded(uint256 cumulativeLoss);
    error Unauthorized();

    event Initialized(
        address indexed vaultProxy, uint64 lossTolerance, uint32 lossTolerancePeriodDuration, address indexed shutDowner
    );
    event OwnerSet(address nextOwner);
    event ThrottleUpdated(uint256 nextCumulativeLoss);

    function executeCalls(IMultiCallAccountMixin.Call[] memory _calls) external;
    function getLossTolerance() external view returns (uint256 lossTolerance_);
    function getLossTolerancePeriodDuration() external view returns (uint256 lossTolerancePeriodDuration_);
    function getOwner() external view returns (address owner_);
    function getShutdowner() external view returns (address shutdowner_);
    function getThrottle() external view returns (Throttle memory throttle_);
    function getVaultProxyAddress() external view returns (address vaultProxyAddress_);
    function init(
        address _owner,
        address _vaultProxyAddress,
        uint64 _lossTolerance,
        uint32 _lossTolerancePeriodDuration,
        address _shutdowner
    ) external;
    function shutdown() external;
}
