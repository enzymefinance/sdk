import { type PartialMessage, Timestamp } from "@bufbuild/protobuf";
import { Currency, Deployment, GetVaultTimeSeriesRequest, Resolution } from "@enzymefinance/api";
import { useQuery } from "@tanstack/react-query";
import { Card, Title, AreaChart } from "@tremor/react";
import { Spinner } from "./Spinner.js";
import { enzyme } from "../client.js";

// Start of day today and a year ago.
const to = new Date(new Date().setUTCHours(0, 0, 0, 0));
const from = new Date(new Date(to).setFullYear(to.getFullYear() - 1));
const options: PartialMessage<GetVaultTimeSeriesRequest> = {
  currency: Currency.USD,
  deployment: Deployment.ETHEREUM,
  resolution: Resolution.ONE_DAY,
  range: {
    from: Timestamp.fromDate(from),
    to: Timestamp.fromDate(to),
  },
};

export function VaultPerformance({ address }: { address: string }) {
  const timeseries = useQuery({
    ...enzyme.getVaultTimeSeries.useQuery({ ...options, address }),
    select: (data) => {
      return data.items.map((item) => ({
        ...item,
        timestamp: item.timestamp?.toDate().toLocaleDateString(),
      }));
    },
  });

  return (
    <>
      <Card className="mt-7">
        <Title>Share price</Title>
        {timeseries.isLoading ? (
          <div className="mt-4 h-80 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AreaChart
            className="mt-4 h-80"
            data={timeseries.data ?? []}
            categories={["netShareValue"]}
            index="timestamp"
            colors={["fuchsia"]}
            valueFormatter={(number) => format.format(number)}
          />
        )}
      </Card>
      <Card className="mt-7">
        <Title>Assets under management</Title>
        {timeseries.isLoading ? (
          <div className="mt-4 h-80 flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <AreaChart
            className="mt-4 h-80"
            data={timeseries.data ?? []}
            categories={["grossAssetValue"]}
            index="timestamp"
            colors={["indigo"]}
            valueFormatter={(number) => format.format(number)}
          />
        )}
      </Card>
    </>
  );
}

const format = Intl.NumberFormat("us", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  notation: "compact",
});
