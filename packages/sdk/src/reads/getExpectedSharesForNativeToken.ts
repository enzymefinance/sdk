import { IDepositWrapper } from "../../../abis/src/abis/IDepositWrapper.js";
import { type ReadContractParameters, readContractParameters } from "../utils/viem.js";
import type { Address, Hex, PublicClient } from "viem";

export async function getExpectedSharesForNativeToken(
  client: PublicClient,
  args: ReadContractParameters<{
    depositWrapper: Address;
    beneficiary: Address;
    comptrollerProxy: Address;
    minSharesQuantity: bigint;
    exchange: Address;
    exchangeApproveTarget: Address;
    exchangeData: Hex;
    minInvestmentAmount: bigint;
    quantity: bigint;
  }>,
) {
  const { result } = await client.simulateContract({
    ...readContractParameters(args),
    abi: IDepositWrapper,
    address: args.depositWrapper,
    functionName: "exchangeEthAndBuyShares",
    args: [
      args.comptrollerProxy,
      args.minSharesQuantity,
      args.exchange,
      args.exchangeApproveTarget,
      args.exchangeData,
      args.minInvestmentAmount,
    ],
    value: args.quantity,
    account: args.beneficiary,
  });

  return result;
}
