import type { Address, Hex, PublicClient, WalletClient } from "viem";
import { toAddress } from "../../dist/src/utils";
import { Network } from "../../src/networks";
import { getClient } from "../../test/utils/client";
import { getPendleMarketInfo } from "../../test/utils/pendle";
import { PENDLE_FACTORY, PENDLE_PENDLE_PY_LP_ORACLE, RECOMMENDED_DURATION, underlyingToAggregatorInfo } from "./consts";
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

  const results: Array<
    | {
        success: true;
        deployedPendleOracle: Address;
        quoteAggregatorInfo: {
          aggregator: Address;
          nonStandard: boolean;
        };
        assetId: Address;
        market: Address;
      }
    | {
        success: false;
        reason: string;
        assetId: Address;
        market: Address;
      }
  > = [];

  for (const market of lpMarkets) {
    const result = await deployOracle({ market, walletClient, publicClient, type: "lp" });
    results.push(result);

    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("Oracle for LP market:", result);
  }

  for (const market of ptMarkets) {
    const result = await deployOracle({ market, walletClient, publicClient, type: "pt" });
    results.push(result);

    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("Oracle for PT market:", result);
  }

  return results;
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
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(`Deploying ${type} oracle for market: ${market}...`);
  const marketInfo = await getPendleMarketInfo(Network.ETHEREUM, market);

  const quoteAggregatorInfo = underlyingToAggregatorInfo[marketInfo.underlyingAsset.address];
  const assetId = toAddress(type === "lp" ? marketInfo.lp.address : marketInfo.pt.address);

  if (quoteAggregatorInfo === undefined) {
    return {
      assetId,
      success: false,
      reason: "No quote aggregator found",
      market,
    } as const;
  }

  const oracleState = await getOracleState(walletClient, {
    oracle: PENDLE_PENDLE_PY_LP_ORACLE,
    market,
    duration: RECOMMENDED_DURATION,
  });

  if (oracleState.increaseCardinalityRequired) {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("Increasing cardinality...");
    const { request } = await increaseObservationsCardinalityNext(walletClient, {
      market,
      cardinalityNext: oracleState.cardinalityRequired,
      account: walletClient.account,
    });

    const hash = await walletClient.writeContract(request);

    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("Increased cardinality tx created:", hash);

    await publicClient.waitForTransactionReceipt({ hash });

    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("Increased cardinality tx mined:", hash);
  } else {
    // biome-ignore lint/suspicious/noConsoleLog: <explanation>
    console.log("No need to increase cardinality");
  }

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("Creating oracle...");

  const { request, result } = await createOracleWithQuote(walletClient, {
    factory: PENDLE_FACTORY,
    market,
    twapDuration: RECOMMENDED_DURATION,
    baseOracleType: type === "pt" ? 0 : 4,
    quoteOracle: quoteAggregatorInfo.aggregator,
    account: walletClient.account,
  });

  const hash = await walletClient.writeContract(request);

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("Created oracle tx created:", hash);

  await publicClient.waitForTransactionReceipt({ hash });

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("Created oracle tx mined:", hash);

  return {
    deployedPendleOracle: result,
    quoteAggregatorInfo,
    assetId,
    success: true,
    market,
  } as const;
}
