// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface IGatedRedemptionQueueSharesWrapperFactory {
    event ImplementationSet(address implementation);
    event ProxyDeployed(address indexed caller, address proxy);

    struct RedemptionWindowConfig {
        uint64 firstWindowStart;
        uint32 frequency;
        uint32 duration;
        uint64 relativeSharesCap;
    }

    function deploy(
        address _vaultProxy,
        address[] memory _managers,
        address _redemptionAsset,
        bool _useDepositApprovals,
        bool _useRedemptionApprovals,
        bool _useTransferApprovals,
        uint8 _depositMode,
        RedemptionWindowConfig memory _windowConfig
    ) external returns (address wrapperProxy_);
    function implementation() external view returns (address);
    function setImplementation(address _nextImplementation) external;
}
