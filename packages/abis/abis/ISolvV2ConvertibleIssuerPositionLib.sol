// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10;

interface ISolvV2ConvertibleIssuerPositionLib {
    event IssuedVoucherAdded(address indexed voucher);
    event IssuedVoucherRemoved(address indexed voucher);
    event OfferAdded(uint24 indexed offerId);
    event OfferRemoved(uint24 indexed offerId);

    function getDebtAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getIssuedVouchers() external view returns (address[] memory vouchers_);
    function getManagedAssets() external returns (address[] memory assets_, uint256[] memory amounts_);
    function getOffers() external view returns (uint24[] memory offers_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
