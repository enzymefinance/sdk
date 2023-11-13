import * as Abis from "@enzymefinance/abis";
import { type Address, type Hex, PublicClient, decodeAbiParameters, encodeAbiParameters } from "viem";
import { Assertion, Viem } from "../../../Utils.js";
import * as IntegrationManager from "../../IntegrationManager.js";

//--------------------------------------------------------------------------------------------
// TAKE ORDER
//--------------------------------------------------------------------------------------------

const takeOrderSelector = "0x03e38a2b"; // takeOrder(address,bytes,bytes)
export const takeOrder = IntegrationManager.makeUse(takeOrderSelector, takeOrderEncode);

const limitOrderEncoding = {
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

const rfqOrderEncoding = {
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

const signatureEncoding = {
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

const takeOrderEncoding = [
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

export type OrderType = typeof OrderType[keyof typeof OrderType];
export const OrderType = {
  Limit: 0,
  Rfq: 1,
} as const;

export type LimitOrder = {
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

export type RfqOrder = {
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

export type SignatureType = typeof SignatureType[keyof typeof SignatureType];
export const SignatureType = {
  Illegal: 0,
  Invalid: 1,
  Eip712: 2,
  EthSign: 3,
  PreSigned: 4,
} as const;

export type Signature = {
  signatureType: SignatureType;
  v: number;
  r: Hex;
  s: Hex;
};

export type TakeOrderArgs = {
  takerAssetFillAmount: bigint;
  signature: Signature;
} & ({ orderType: typeof OrderType.Limit; order: LimitOrder } | { orderType: typeof OrderType.Rfq; order: RfqOrder });

export function takeOrderEncode(args: TakeOrderArgs): Hex {
  let encodedOrder: Hex;

  switch (args.orderType) {
    case OrderType.Limit: {
      encodedOrder = encodeAbiParameters([limitOrderEncoding, signatureEncoding], [args.order, args.signature]);
      break;
    }

    case OrderType.Rfq: {
      encodedOrder = encodeAbiParameters([rfqOrderEncoding, signatureEncoding], [args.order, args.signature]);
      break;
    }

    default: {
      Assertion.never(args, "Invalid order type");
    }
  }

  return encodeAbiParameters(takeOrderEncoding, [encodedOrder, args.takerAssetFillAmount, args.orderType]);
}

export function isValidOrderType(value: number): value is OrderType {
  return Object.values(OrderType).includes(value as OrderType);
}

export function isValidSignatureType(value: number): value is SignatureType {
  return Object.values(SignatureType).includes(value as SignatureType);
}

export function takeOrderDecode(encoded: Hex): TakeOrderArgs {
  const [encodedZeroExOrderArgs, takerAssetFillAmount, orderType] = decodeAbiParameters(takeOrderEncoding, encoded);

  if (!isValidOrderType(orderType)) {
    Assertion.invariant(false, "Invalid order type");
  }

  switch (orderType) {
    case OrderType.Limit: {
      const [order, signature] = decodeAbiParameters([limitOrderEncoding, signatureEncoding], encodedZeroExOrderArgs);

      const signatureType = signature.signatureType;
      if (!isValidSignatureType(signatureType)) {
        Assertion.invariant(false, "Invalid signature type");
      }

      return {
        takerAssetFillAmount,
        orderType,
        order,
        signature: {
          ...signature,
          signatureType,
        },
      };
    }

    case OrderType.Rfq: {
      const [order, signature] = decodeAbiParameters([rfqOrderEncoding, signatureEncoding], encodedZeroExOrderArgs);

      const signatureType = signature.signatureType;
      if (!isValidSignatureType(signatureType)) {
        Assertion.invariant(false, "Invalid signature type");
      }

      return {
        takerAssetFillAmount,
        orderType,
        order,
        signature: {
          ...signature,
          signatureType,
        },
      };
    }

    default: {
      Assertion.never(orderType, "Invalid order type");
    }
  }
}

//--------------------------------------------------------------------------------------------
// READ
//--------------------------------------------------------------------------------------------

export async function getZeroExV2Exchange(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    aaveIncentivesController: Address;
    assets: Address[];
    user: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: Abis,
    functionName: "getRewardsBalance",
    address: args.aaveIncentivesController,
    args: [args.assets, args.user],
  });
}
