import { type Address, type Hex, type PublicClient, parseAbi } from "viem";
import { Viem } from "../Utils.js";

export async function getCLFeeRecipient(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    kilnStaking: Address;
    validatorPublicKey: Hex;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getCLFeeRecipient(bytes calldata _publicKey) external view returns (address)"]),
    functionName: "getCLFeeRecipient",
    address: args.kilnStaking,
    args: [args.validatorPublicKey],
  });
}

export async function getELFeeRecipient(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    kilnStaking: Address;
    validatorPublicKey: Hex;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getELFeeRecipient(bytes calldata _publicKey) external view returns (address)"]),
    functionName: "getELFeeRecipient",
    address: args.kilnStaking,
    args: [args.validatorPublicKey],
  });
}

export async function getGlobalFee(
  client: PublicClient,
  args: Viem.ContractCallParameters<{
    kilnStaking: Address;
  }>,
) {
  return Viem.readContract(client, args, {
    abi: parseAbi(["function getGlobalFee() external view returns (uint256 globalFee_)"]),
    functionName: "getGlobalFee",
    address: args.kilnStaking,
  });
}
