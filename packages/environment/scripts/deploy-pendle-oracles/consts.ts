export const PENDLE_FACTORY = "0x03A03076a9F31d0FC2dcfc17B54Be0c29008dcD1";
export const PENDLE_PENDLE_PY_LP_ORACLE = "0x14418800e0b4c971905423aa873e83355922428c";

export const RECOMMENDED_DURATION = 900; // 15 minutes

export const underlyingToAggregatorInfo = {
  "0xd9d920aa40f578ab794426f5c90f6c731d159def": {
    aggregator: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    inverted: true,
    nonStandard: true,
  },
} as const;
