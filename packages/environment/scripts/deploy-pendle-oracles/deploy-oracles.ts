import type { Address, Hex, WalletClient } from "viem";
import { Network } from "../../src/networks";
import { PENDLE_PENDLE_PY_LP_ORACLE, RECOMMENDED_DURATION } from "./consts";
import { increaseObservationsCardinalityNext } from "./contracts/PendleMarket";
import { getOracleState } from "./contracts/PendlePYLpOracle";
import { getWalletClient } from "./create-wallet-client";

export function deployOracles({
  lpMarkets,
  ptMarkets,
  privateKey,
}: {
  lpMarkets: Array<Address>;
  ptMarkets: Array<Address>;
  privateKey: Hex;
}) {
  const walletClient = getWalletClient(Network.ETHEREUM, privateKey);
}

async function deployLpOracle({
  market,
  walletClient,
}: {
  market: Address;
  walletClient: WalletClient;
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
  }
}
