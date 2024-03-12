// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISolvV2BondBuyerPositionLib {
    struct VoucherTokenId {
        address voucher;
        uint32 tokenId;
    }

    event VoucherTokenIdAdded(address indexed voucher, uint32 indexed tokenId);
    event VoucherTokenIdRemoved(address indexed voucher, uint32 indexed tokenId);

    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getVoucherTokenIds() external view returns (VoucherTokenId[] memory voucherTokenIds_);
    function init(bytes memory) external;
    function onVNFTReceived(address, address, uint256, uint256, bytes memory)
        external
        pure
        returns (bytes4 selector_);
    function receiveCallFromVault(bytes memory _actionData) external;
}
