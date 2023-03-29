import { encodeAbiParameters } from "viem";
import { Address } from "../../types.js";

export function encodeMinAssetBalancesPostRedemptionPolicy({
  assets,
  minBalances,
}: {
  assets: Address[];
  minBalances: bigint[];
}) {
  return encodeAbiParameters(
    [
      {
        type: "address[]",
        name: "assets",
      },
      {
        type: "uint256[]",
        name: "minBalances",
      },
    ],
    [assets, minBalances],
  );
}
