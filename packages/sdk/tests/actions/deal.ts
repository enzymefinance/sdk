import { keccak256 } from "viem/utils";
import { testClient } from "../globals.js";

import type { Address } from "viem";
import { encodeAbiParameters } from "viem";

export async function deal({
  token,
  to,
  amount,
  slotOfBalancesMapping,
}: {
  /**
   * The token to check the balance of.
   */
  token: Address;
  /**
   * The address to deal to.
   */
  to: Address;
  /**
   * The amount of the token to deal.
   */
  amount: bigint;
  /**
   * Slot of the balances mapping.
   */
  slotOfBalancesMapping: number;
}) {
  const encodedSlotKey = encodeAbiParameters(
    [
      { type: "address", name: "to" },
      { type: "uint8", name: "slot" },
    ],
    [to, slotOfBalancesMapping],
  );

  const hashedSlotKey = keccak256(encodedSlotKey);

  const value = encodeAbiParameters([{ type: "uint256", name: "amount" }], [amount]);

  await testClient.setStorageAt({
    address: token,
    index: hashedSlotKey,
    value,
  });
}
