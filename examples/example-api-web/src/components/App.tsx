import { TransportProvider } from "@connectrpc/connect-query";
import { type ConnectTransportOptions, createConnectTransport } from "@connectrpc/connect-web";
import { withTokenAuth } from "@enzymefinance/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text, Title } from "@tremor/react";
import { VaultPerformance } from "./VaultPerformance.js";

const token = import.meta.env.VITE_ENZYME_API_TOKEN as string | undefined;
if (!token) {
  throw new Error("MISSING API TOKEN!");
}

const transport = createConnectTransport(
  withTokenAuth<ConnectTransportOptions>(token, {
    baseUrl: "/api",
  }),
);

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <TransportProvider transport={transport}>
        <main>
          <Title>Dashboard</Title>
          <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

          <VaultPerformance address="0x23d3285bfe4fd42965a821f3aecf084f5bd40ef4" />
        </main>
      </TransportProvider>
    </QueryClientProvider>
  );
}
