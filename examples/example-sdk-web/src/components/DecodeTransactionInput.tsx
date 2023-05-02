import { Spinner } from "./Spinner.js";
import { decodeSetupVaultParams } from "@enzymefinance/sdk";
import { useQuery } from "@tanstack/react-query";
import { type Hash, createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

function useDecodeTransactionInput({ hash }: { hash: Hash }) {
  return useQuery({
    queryKey: ["useDecodeTransactionInput", hash],
    queryFn: async () => {
      const tx = await client.getTransaction({
        hash,
      });

      return decodeSetupVaultParams(tx.input);
    },
  });
}

function formatJson(data: unknown) {
  return JSON.stringify(data, (_, value) => (typeof value === "bigint" ? value.toString() : value), 4);
}

export function DecodeTransactionInput({ hash }: { hash: Hash }) {
  const { data, isLoading } = useDecodeTransactionInput({ hash });

  if (isLoading) {
    return <Spinner />;
  }

  return <pre>{formatJson(data)}</pre>;
}
