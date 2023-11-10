import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text, Title } from "@tremor/react";
import { VaultPerformance } from "./VaultPerformance.js";

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <main>
        <Title>Dashboard</Title>
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

        <VaultPerformance address="0x23d3285bfe4fd42965a821f3aecf084f5bd40ef4" />
      </main>
    </QueryClientProvider>
  );
}
