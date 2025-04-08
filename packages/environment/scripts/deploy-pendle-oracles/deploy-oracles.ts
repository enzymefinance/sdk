import type { Address, Hex, PublicClient, WalletClient } from "viem";
import { Network } from "../../src/networks";
import { getClient } from "../../test/utils/client";
import { PENDLE_FACTORY, PENDLE_PENDLE_PY_LP_ORACLE, RECOMMENDED_DURATION } from "./consts";
import { createOracleWithQuote } from "./contracts/PendleFactory";
import { increaseObservationsCardinalityNext } from "./contracts/PendleMarket";
import { getOracleState } from "./contracts/PendlePYLpOracle";
import { getWalletClient } from "./create-wallet-client";

export async function deployOracles({
  lpMarkets,
  ptMarkets,
  privateKey,
}: {
  lpMarkets: Array<Address>;
  ptMarkets: Array<Address>;
  privateKey: Hex;
}) {
  const walletClient = getWalletClient(Network.ETHEREUM, privateKey);

  const publicClient = getClient(Network.ETHEREUM);

  for (const market of lpMarkets) {
    await deployOracle({ market, walletClient, publicClient, type: "lp" });
  }

  for (const market of ptMarkets) {
    await deployOracle({ market, walletClient, publicClient, type: "pt" });
  }
}

async function deployOracle({
  market,
  walletClient,
  publicClient,
  type,
}: {
  market: Address;
  walletClient: WalletClient;
  publicClient: PublicClient;
  type: "lp" | "pt";
}) {
  const oracleState = await getOracleState(walletClient, {
    oracle: PENDLE_PENDLE_PY_LP_ORACLE,
    market,
    duration: RECOMMENDED_DURATION,
  });

  if (oracleState.increaseCardinalityRequired) {
    const { request } = await increaseObservationsCardinalityNext(walletClient, {
      market,
      cardinalityNext: oracleState.cardinalityRequired,
      account: walletClient.account,
    });

    const hash = await walletClient.writeContract(request);

    await publicClient.waitForTransactionReceipt({ hash });
  }

  const { request } = await createOracleWithQuote(walletClient, {
    factory: PENDLE_FACTORY,
    market,
    twapDuration: RECOMMENDED_DURATION,
    baseOracleType: type === "pt" ? 0 : 4,
    quoteOracle: PENDLE_PENDLE_PY_LP_ORACLE,
    account: walletClient.account,
  });

  const hash = await walletClient.writeContract(request);

  await publicClient.waitForTransactionReceipt({ hash });
}
