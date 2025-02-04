// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.6.0 <0.9.0;

interface IGMXV2LeverageTradingPositionLib {
    type DecreasePositionSwapType is uint8;
    type OrderType is uint8;

    struct AddressArrayKeyValue {
        string key;
        address[] value;
    }

    struct AddressItems {
        AddressKeyValue[] items;
        AddressArrayKeyValue[] arrayItems;
    }

    struct AddressKeyValue {
        string key;
        address value;
    }

    struct Addresses {
        address account;
        address receiver;
        address cancellationReceiver;
        address callbackContract;
        address uiFeeReceiver;
        address market;
        address initialCollateralToken;
        address[] swapPath;
    }

    struct BoolArrayKeyValue {
        string key;
        bool[] value;
    }

    struct BoolItems {
        BoolKeyValue[] items;
        BoolArrayKeyValue[] arrayItems;
    }

    struct BoolKeyValue {
        string key;
        bool value;
    }

    struct Bytes32ArrayKeyValue {
        string key;
        bytes32[] value;
    }

    struct Bytes32Items {
        Bytes32KeyValue[] items;
        Bytes32ArrayKeyValue[] arrayItems;
    }

    struct Bytes32KeyValue {
        string key;
        bytes32 value;
    }

    struct BytesArrayKeyValue {
        string key;
        bytes[] value;
    }

    struct BytesItems {
        BytesKeyValue[] items;
        BytesArrayKeyValue[] arrayItems;
    }

    struct BytesKeyValue {
        string key;
        bytes value;
    }

    struct ClaimableCollateralInfo {
        address token;
        address market;
        uint256 timeKey;
    }

    struct EventLogData {
        AddressItems addressItems;
        UintItems uintItems;
        IntItems intItems;
        BoolItems boolItems;
        Bytes32Items bytes32Items;
        BytesItems bytesItems;
        StringItems stringItems;
    }

    struct Flags {
        bool isLong;
        bool shouldUnwrapNativeToken;
        bool isFrozen;
        bool autoCancel;
    }

    struct IntArrayKeyValue {
        string key;
        int256[] value;
    }

    struct IntItems {
        IntKeyValue[] items;
        IntArrayKeyValue[] arrayItems;
    }

    struct IntKeyValue {
        string key;
        int256 value;
    }

    struct Numbers {
        OrderType orderType;
        DecreasePositionSwapType decreasePositionSwapType;
        uint256 sizeDeltaUsd;
        uint256 initialCollateralDeltaAmount;
        uint256 triggerPrice;
        uint256 acceptablePrice;
        uint256 executionFee;
        uint256 callbackGasLimit;
        uint256 minOutputAmount;
        uint256 updatedAtBlock;
        uint256 updatedAtTime;
    }

    struct Props {
        Addresses addresses;
        Numbers numbers;
        Flags flags;
    }

    struct StringArrayKeyValue {
        string key;
        string[] value;
    }

    struct StringItems {
        StringKeyValue[] items;
        StringArrayKeyValue[] arrayItems;
    }

    struct StringKeyValue {
        string key;
        string value;
    }

    struct UintArrayKeyValue {
        string key;
        uint256[] value;
    }

    struct UintItems {
        UintKeyValue[] items;
        UintArrayKeyValue[] arrayItems;
    }

    struct UintKeyValue {
        string key;
        uint256 value;
    }

    error InvalidActionId();
    error InvalidCallbackAccount();
    error InvalidHandler();
    error InvalidOrderType(OrderType orderType);

    event CallbackContractSet(address exchangeRouter, address market);
    event ClaimableCollateralAdded(bytes32 claimableCollateralKey, address token, address market, uint256 timeKey);
    event ClaimableCollateralRemoved(bytes32 claimableCollateralKey);
    event TrackedAssetAdded(address asset);
    event TrackedAssetsCleared();
    event TrackedMarketAdded(address market);
    event TrackedMarketRemoved(address market);

    function afterOrderExecution(bytes32, Props memory _order, EventLogData memory) external;
    function getClaimableCollateralKeyToClaimableCollateralInfo(bytes32 _key)
        external
        view
        returns (ClaimableCollateralInfo memory info_);
    function getClaimableCollateralKeys() external view returns (bytes32[] memory claimableCollateralKeys_);
    function getDebtAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function getManagedAssets() external view returns (address[] memory assets_, uint256[] memory amounts_);
    function getTrackedAssets() external view returns (address[] memory trackedAssets_);
    function getTrackedMarkets() external view returns (address[] memory trackedMarkets_);
    function init(bytes memory) external;
    function receiveCallFromVault(bytes memory _actionData) external;
}
