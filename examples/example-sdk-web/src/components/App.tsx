import { DecodeTransactionInput } from "./DecodeTransactionInput.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Text, Title } from "@tremor/react";

const client = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={client}>
      <main>
        <Title>Transaction decoding example</Title>
        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</Text>

        <DecodeTransactionInput hash="0x8a2f2d9c24c583e7a83aed75712a24dcb194d0bff6f2000d9c6c4dbbd46aaa09" />
      </main>
    </QueryClientProvider>
  );
}
