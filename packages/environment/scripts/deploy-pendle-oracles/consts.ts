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
  "0x9d39a5de30e57443bff2a8307a4256c8797a3497": {
    aggregator: "0xDEA4e203537c01b4896A318F72b3243273fACf53",
  },
  "0xd9a442856c234a39a81a089c06451ebaa4306a72": {
    aggregator: "0x114e286b85aacd4032a8b399cd288944fc5b7a90",
  },
  "0xdc035d45d973e3ec169d2276ddab16f1e407384f": {
    aggregator: "0x6c966976008c37BF60e019E3A4a802DD798d3b4b", // USDS/ETH
  },
} as const;
