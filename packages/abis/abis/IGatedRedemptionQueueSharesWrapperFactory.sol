// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IGatedRedemptionQueueSharesWrapperFactory {
    type DepositMode is uint8;

    struct RedemptionWindowConfig {
        uint64 firstWindowStart;
        uint32 frequency;
        uint32 duration;
        uint64 relativeSharesCap;
    }

    event ImplementationSet(address implementation);
    event ProxyDeployed(address indexed caller, address proxy);

    function deploy(
        address _vaultProxy,
        address[] memory _managers,
        address _redemptionAsset,
        bool _useDepositApprovals,
        bool _useRedemptionApprovals,
        bool _useTransferApprovals,
        DepositMode _depositMode,
        RedemptionWindowConfig memory _windowConfig
    ) external returns (address wrapperProxy_);
    function implementation() external view returns (address);
    function setImplementation(address _nextImplementation) external;
}
