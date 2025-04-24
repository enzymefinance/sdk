// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IMysoV3OptionWritingPositionLib {
    error MysoV3OptionWritingPositionLib__ReceiveCallFromVault__InvalidActionId();
    error MysoV3OptionWritingPosition__CloseAndSweep__InvalidEmptyArray();
    error MysoV3OptionWritingPosition__CloseAndSweep__NotExpiredOption();
    error MysoV3OptionWritingPosition__CloseAndSweep__UnassociatedEscrow();
    error MysoV3OptionWritingPosition__GetEscrowIndices__InvalidRange();
    error MysoV3OptionWritingPosition__GetManagedAssets__OpenEscrowsExist();
    error MysoV3OptionWritingPosition__InputArraysLengthMismatch();
    error MysoV3OptionWritingPosition__Sweep__EscrowAlreadyClosed();

    event EscrowClosedAndSwept(uint256 escrowIdx);
    event EscrowCreated(uint256 escrowIdx);

    function MYSO_ROUTER() external view returns (address);

    function getDebtAssets()
        external
        pure
        returns (address[] memory assets_, uint256[] memory amounts_);

    function getEscrowIdxs(
        uint256 _from,
        uint256 _numElements
    ) external view returns (uint32[] memory openEscrowsIdxs_);

    function getManagedAssets()
        external
        view
        returns (address[] memory assets_, uint256[] memory amounts_);

    function getNumOpenEscrows()
        external
        view
        returns (uint256 numOpenEscrows_);

    function init(bytes memory) external;

    function receiveCallFromVault(bytes memory _actionData) external;
}
