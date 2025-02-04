// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface ISolvV2BondIssuerPositionLib {
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
