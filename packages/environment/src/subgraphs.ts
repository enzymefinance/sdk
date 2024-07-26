export const subgraphs = {
  ethereum: {
    assets: { slug: "asset-universe", id: "4ZW3mDNgpDVy68RipQLJxvRw1FReJTfvA7nbB52J4Gjg" },
    balances: { slug: "vault-balances", id: "HwR7jTExHWNvQetTxRYEMQ5hywHyUkierAYvnGS7pBUS" },
    core: { slug: "enzyme-core", id: "9DLBBLep5UyU16kUQRvxBCMqko4q9XzuE4XsMMpARhKK", devVersion: "version/latest" },
    shares: { slug: "vault-shares", id: "6p2L2gQ4Hw4Dh2kxZFDJbcqtbv44vrJbrBEh3EjS7qVo" },
    vaults: { slug: "vault-lineage", id: "5FdivFcUPmVSqCFkv3jqJh3QYjHjh1ztzd7GHiCAMP1h" },
  },
  polygon: {
    assets: { slug: "asset-universe-polygon", id: "6gfWidQ9TBcHLyUPuL343dw8LpvXW7sALPPHpcZi7SKz" },
    balances: { slug: "vault-balances-polygon", id: "tLbAAASbNgTZuqkVdPMs8RJBXLs9WZS7758t1maT86C" },
    core: {
      slug: "enzyme-core-polygon",
      id: "GCAHDyqvZBLMwqdb9U7AqWAN4t4TSwR3aXMHDoUUFuRV",
      devVersion: "version/latest",
    },
    shares: { slug: "vault-shares-polygon", id: "7Tahv9dmeKKcF2SUeHU3ZN4X52y8KGwPo5UaFidJb1hr" },
    vaults: { slug: "vault-lineage-polygon", id: "hQMwVerKMpt8ChLU33jhZ4GLmcP8q2fBhJzw4JRFq4q" },
  },
  testnet: {
    assets: {
      slug: "asset-universe-testnet",
      id: "H7KYtV4eVas2Py83UE1596DPkQNRRNGiPqSbN1AbKMaX",
    },
    balances: {
      slug: "vault-balances-testnet",
      id: "86aJM6X5DB5vrCVapuFWufVKPBtVYmxygzxsLctRhc3r",
    },
    core: {
      slug: "enzyme-core-testnet",
      id: "98iFcdDw1g5akWxbTFqcs2TsUaJhVDNxPTgH8P2WBUao",
      devVersion: "redemption-queue-v10",
    },
    shares: {
      slug: "vault-shares-testnet",
      id: "EPZTMtyWpwckXczAry12HddRpssBjKjtrhWB1ZGK9bLt",
    },
    vaults: {
      slug: "vault-lineage-testnet",
      id: "BPhRz8C6rUcb3PXWpWFYCH2zjudLg76HjAeDtcNEWCNV",
    },
  },
} as const;
