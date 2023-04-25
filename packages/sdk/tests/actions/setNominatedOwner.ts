import { getAbiItem, type Address } from "viem";
import { sendTestTransaction } from "../globals.js";
import { prepareFunctionParams } from "../../src/utils/viem.js";
import { IVault } from "@enzymefinance/abis/IVault";

export async function setNominatedOwner({
  nominatedOwner,
  vaultProxy,
  account,
}: {
  nominatedOwner: Address;
  account: Address;
  vaultProxy: Address;
}) {
  return await sendTestTransaction({
    address: vaultProxy,
    account,
    ...prepareFunctionParams({
      abi: getAbiItem({ abi: IVault, name: "setNominatedOwner" }),
      args: [nominatedOwner],
    }),
  });
}
