import { Depositor, Utils, Vault } from "@enzymefinance/sdk";
import { TestActions, TestEnvironment } from "@enzymefinance/sdk/test";
import { Address, Chain, isAddressEqual } from "viem";

export async function buyShares<TChain extends Chain>({
  minSharesQuantity = 1n, // NOTE: You should never use `1n` in production. This is only for testing.
  skipSharesActionTimelock = false,
  comptrollerProxy,
  depositAmount,
  sharesBuyer,
  environment,
}: {
  minSharesQuantity?: bigint;
  skipSharesActionTimelock?: boolean;
  depositAmount: bigint;
  environment: TestEnvironment<TChain>;
  comptrollerProxy: Address;
  sharesBuyer: Address;
}) {
  const denominationAsset = await Vault.getDenominationAsset(environment.client, {
    comptrollerProxy,
  });

  if (isAddressEqual(denominationAsset, (environment as any).constants.weth)) {
    // @TODO Properly typed environments
    await TestActions.wrapEther({
      account: sharesBuyer,
      amount: depositAmount,
      environment,
    });
  }

  await TestActions.approveSpend({
    token: denominationAsset,
    amount: depositAmount,
    spender: comptrollerProxy,
    account: sharesBuyer,
    environment,
  });

  const { result: sharesReceived } = await environment.send({
    account: sharesBuyer,
    transaction: Depositor.deposit({
      amount: depositAmount,
      depositor: sharesBuyer,
      comptrollerProxy,
      minSharesQuantity,
    }),
  });

  if (skipSharesActionTimelock) {
    const sharesActionTimelock = await Depositor.getSharesActionTimelock(environment.client, {
      comptrollerProxy,
    });

    await TestActions.increaseTimeAndMine({
      // NOTE: We add an extra hour to the timelock to be extra sure that the timelock has passed. This solves a weird issue
      // with anvil where sometimes it doesn't seem to reliably increase the time exactly by the given value.
      environment,
      seconds: sharesActionTimelock + Utils.Conversion.toSeconds({ hours: 1 }),
      blocks: 1,
    });
  }

  return sharesReceived;
}
