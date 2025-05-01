export const PENDLE_FACTORY = "0x03A03076a9F31d0FC2dcfc17B54Be0c29008dcD1";
export const PENDLE_PENDLE_PY_LP_ORACLE = "0x9a9fa8338dd5e5b2188006f1cd2ef26d921650c2";

export const RECOMMENDED_DURATION = 900; // 15 minutes

export const underlyingToAggregatorInfo = {
  "0xd9d920aa40f578ab794426f5c90f6c731d159def": {
    aggregator: "0xCDfDe35623592105FB38AB2EBfC8bEA7240C1686",
  },
  "0x80ac24aa929eaf5013f6436cda2a7ba190f5cc0b": {
    aggregator: "0x740ee3b8e79ee324c66b33c227d3cd23f413200d",
  },
  "0x4c9edd5852cd905f086c759e8383e09bff1e68b3": {
    aggregator: "0xEb9667C8C7569b2792a0b45f8aB74A94fA070889",
  },
} as const;
