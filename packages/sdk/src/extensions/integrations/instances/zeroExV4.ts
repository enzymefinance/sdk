import { type Address, type Hex, decodeAbiParameters, encodeAbiParameters } from "viem";

export type ZeroExV4OrderType = typeof ZeroExV4OrderType[keyof typeof ZeroExV4OrderType];
export const ZeroExV4OrderType = {
  Limit: 0,
  Rfq: 1,
} as const;

export const zeroExV4LimitOrderEncoding = {
  components: [
    {
      name: "makerToken",
      type: "address",
    },
    {
      name: "takerToken",
      type: "address",
    },
    {
      name: "makerAmount",
      type: "uint128",
    },
    {
      name: "takerAmount",
      type: "uint128",
    },
    {
      name: "takerTokenFeeAmount",
      type: "uint128",
    },
    {
      name: "maker",
      type: "address",
    },
    {
      name: "taker",
      type: "address",
    },
    {
      name: "sender",
      type: "address",
    },
    {
      name: "feeRecipient",
      type: "address",
    },
    {
      name: "pool",
      type: "bytes32",
    },
    {
      name: "expiry",
      type: "uint64",
    },
    {
      name: "salt",
      type: "uint256",
    },
  ],
  name: "limitOrder",
  type: "tuple",
} as const;

export const zeroExV4RfqOrderEncoding = {
  components: [
    {
      name: "makerToken",
      type: "address",
    },
    {
      name: "takerToken",
      type: "address",
    },
    {
      name: "makerAmount",
      type: "uint128",
    },
    {
      name: "takerAmount",
      type: "uint128",
    },
    {
      name: "maker",
      type: "address",
    },
    {
      name: "taker",
      type: "address",
    },
    {
      name: "txOrigin",
      type: "address",
    },
    {
      name: "pool",
      type: "bytes32",
    },
    {
      name: "expiry",
      type: "uint64",
    },
    {
      name: "salt",
      type: "uint256",
    },
  ],
  name: "rfqOrder",
  type: "tuple",
} as const;

export const zeroExV4SignatureEncoding = {
  components: [
    {
      name: "signatureType",
      type: "uint8",
    },
    {
      name: "v",
      type: "uint8",
    },
    {
      name: "r",
      type: "bytes32",
    },
    {
      name: "s",
      type: "bytes32",
    },
  ],
  name: "signature",
  type: "tuple",
} as const;

export const zeroExV4TakeOrderEncoding = [
  {
    name: "encodedZeroExOrderArgs",
    type: "bytes",
  },
  {
    name: "takerAssetFillAmount",
    type: "uint128",
  },
  {
    name: "orderType",
    type: "uint8",
  },
] as const;

export type ZeroExV4LimitOrder = {
  makerToken: Address;
  takerToken: Address;
  makerAmount: bigint;
  takerAmount: bigint;
  takerTokenFeeAmount: bigint;
  maker: Address;
  taker: Address;
  sender: Address;
  feeRecipient: Address;
  pool: Hex;
  expiry: bigint;
  salt: bigint;
};

export type ZeroExV4RfqOrder = {
  makerToken: Address;
  takerToken: Address;
  makerAmount: bigint;
  takerAmount: bigint;
  maker: Address;
  taker: Address;
  txOrigin: Address;
  pool: Hex;
  expiry: bigint;
  salt: bigint;
};

export type ZeroExV4SignatureType = typeof ZeroExV4SignatureType[keyof typeof ZeroExV4SignatureType];
export const ZeroExV4SignatureType = {
  ILLEGAL: 0,
  INVALID: 1,
  EIP712: 2,
  ETHSIGN: 3,
  PRESIGNED: 4,
} as const;

type ZeroExV4Signature = {
  signatureType: ZeroExV4SignatureType;
  v: number;
  r: Hex;
  s: Hex;
};

export type ZeroExV4TakeOrderArgs = {
  encodedZeroExOrderArgs: Hex;
  takerAssetFillAmount: bigint;
  signature: ZeroExV4Signature;
} & (
  | { orderType: typeof ZeroExV4OrderType.Limit; order: ZeroExV4LimitOrder }
  | { orderType: typeof ZeroExV4OrderType.Rfq; order: ZeroExV4RfqOrder }
);

export function encodeZeroExV4TakeOrderArgs({
  takerAssetFillAmount,
  order,
  orderType,
  signature,
}: ZeroExV4TakeOrderArgs): Hex {
  let encodedZeroExOrderArgs: Hex;

  if (orderType === ZeroExV4OrderType.Limit) {
    encodedZeroExOrderArgs = encodeAbiParameters(
      [zeroExV4LimitOrderEncoding, zeroExV4SignatureEncoding],
      [order, signature],
    );
  } else if (orderType === ZeroExV4OrderType.Rfq) {
    encodedZeroExOrderArgs = encodeAbiParameters(
      [zeroExV4RfqOrderEncoding, zeroExV4SignatureEncoding],
      [order, signature],
    );
  } else {
    const _exhaustiveCheck: never = orderType;
    return _exhaustiveCheck;
  }

  return encodeAbiParameters(zeroExV4TakeOrderEncoding, [encodedZeroExOrderArgs, takerAssetFillAmount, orderType]);
}

function assertZeroExV4OrderType(value: number): asserts value is ZeroExV4OrderType {
  if (!Object.values(ZeroExV4OrderType).includes(value as ZeroExV4OrderType)) {
    throw new Error(`Invalid ZeroExV4OrderType: ${value}`);
  }
}

function assertZeroExV4SignatureType(value: number): asserts value is ZeroExV4SignatureType {
  if (!Object.values(ZeroExV4SignatureType).includes(value as ZeroExV4SignatureType)) {
    throw new Error(`Invalid ZeroExV4SignatureType: ${value}`);
  }
}

export function decodeZeroExV4TakeOrderArgs(callArgs: Hex): ZeroExV4TakeOrderArgs {
  const [encodedZeroExOrderArgs, takerAssetFillAmount, orderType] = decodeAbiParameters(
    zeroExV4TakeOrderEncoding,
    callArgs,
  );

  assertZeroExV4OrderType(orderType);

  if (orderType === ZeroExV4OrderType.Limit) {
    const [order, signature] = decodeAbiParameters(
      [zeroExV4LimitOrderEncoding, zeroExV4SignatureEncoding],
      encodedZeroExOrderArgs,
    );

    const signatureType = signature.signatureType;
    assertZeroExV4SignatureType(signatureType);

    return {
      encodedZeroExOrderArgs,
      takerAssetFillAmount,
      orderType,
      order,
      signature: {
        ...signature,
        signatureType,
      },
    };
  }

  if (orderType === ZeroExV4OrderType.Rfq) {
    const [order, signature] = decodeAbiParameters(
      [zeroExV4RfqOrderEncoding, zeroExV4SignatureEncoding],
      encodedZeroExOrderArgs,
    );

    const signatureType = signature.signatureType;
    assertZeroExV4SignatureType(signatureType);

    return {
      encodedZeroExOrderArgs,
      takerAssetFillAmount,
      orderType,
      order,
      signature: {
        ...signature,
        signatureType,
      },
    };
  }

  const _exhaustiveCheck: never = orderType;
  return _exhaustiveCheck;
}
