// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface ISolvV2ConvertibleBuyerPositionLib {
    event SaleAdded(uint24 indexed saleId, address indexed currency);
    event SaleRemoved(uint24 indexed saleId, address indexed currency);
    event VoucherTokenIdAdded(address indexed voucher, uint32 indexed tokenId);
    event VoucherTokenIdRemoved(address indexed voucher, uint32 indexed tokenId);

    struct Sale {
        uint24 saleId;
        address currency;
    }

    struct VoucherTokenId {
        address voucher;
        uint32 tokenId;
    }

    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getSales() external view returns (Sale[] memory sales_);
    function getVoucherTokenIds() external view returns (VoucherTokenId[] memory voucherTokenIds_);
    function init(bytes memory) external;
    function onVNFTReceived(address, address, uint256, uint256, bytes memory)
        external
        pure
        returns (bytes4 selector_);
    function receiveCallFromVault(bytes memory _actionData) external;
}
