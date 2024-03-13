// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISharePriceThrottledMultiCallAccount {
    struct Call {
        address target;
        bytes data;
    }

    struct Throttle {
        uint192 cumulativeLoss;
        uint64 lastLossTimestamp;
    }

    error ExceedsOneHundredPercent();
    error ToleranceExceeded(uint256 cumulativeLoss);
    error Unauthorized();

    event ThrottleUpdated(uint256 nextCumulativeLoss);

    function executeCalls(Call[] memory _calls) external;
    function getThrottle() external view returns (Throttle memory throttle_);
}
