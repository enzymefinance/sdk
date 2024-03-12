// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IGasRelayPaymasterLib {
    struct ForwardRequest {
        address from;
        address to;
        uint256 value;
        uint256 gas;
        uint256 nonce;
        bytes data;
        uint256 validUntil;
    }

    struct GasAndDataLimits {
        uint256 acceptanceBudget;
        uint256 preRelayedCallGasLimit;
        uint256 postRelayedCallGasLimit;
        uint256 calldataSizeLimit;
    }

    struct RelayData {
        uint256 gasPrice;
        uint256 pctRelayFee;
        uint256 baseRelayFee;
        address relayWorker;
        address paymaster;
        address forwarder;
        bytes paymasterData;
        uint256 clientId;
    }

    struct RelayRequest {
        ForwardRequest request;
        RelayData relayData;
    }

    event Deposited(uint256 amount);
    event TransactionRelayed(address indexed authorizer, bytes4 invokedSelector, bool successful);
    event Withdrawn(uint256 amount);

    function deposit() external;
    function getGasAndDataLimits() external view returns (GasAndDataLimits memory limits_);
    function getHubAddr() external view returns (address relayHub_);
    function getLastDepositTimestamp() external view returns (uint256 lastDepositTimestamp_);
    function getParentComptroller() external view returns (address parentComptroller_);
    function getParentVault() external view returns (address parentVault_);
    function getRelayHubDeposit() external view returns (uint256 depositBalance_);
    function getWethToken() external view returns (address wethToken_);
    function init(address _vault) external;
    function postRelayedCall(bytes memory _context, bool _success, uint256, RelayData memory _relayData) external;
    function preRelayedCall(RelayRequest memory _relayRequest, bytes memory, bytes memory, uint256)
        external
        returns (bytes memory context_, bool rejectOnRecipientRevert_);
    function trustedForwarder() external view returns (address trustedForwarder_);
    function versionPaymaster() external view returns (string memory versionString_);
    function withdrawBalance() external;
}
