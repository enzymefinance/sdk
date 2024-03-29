export const SHARES_UNIT = 1_000_000_000_000_000_000n;
export const ETH_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
export const ONE_HOUR_IN_SECONDS = 60n * 60n;
export const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS * 24n;
export const ONE_WEEK_IN_SECONDS = ONE_DAY_IN_SECONDS * 7n;
export const ONE_YEAR_IN_SECONDS = (ONE_DAY_IN_SECONDS * 36525n) / 100n;
export const ONE_PERCENT_IN_BPS = 100n;
export const FIVE_PERCENT_IN_BPS = ONE_PERCENT_IN_BPS * 5n;
export const TEN_PERCENT_IN_BPS = ONE_PERCENT_IN_BPS * 10n;
export const ONE_HUNDRED_PERCENT_IN_BPS = 10_000n;
export const ONE_HUNDRED_PERCENT_IN_WEI = 1_000_000_000_000_000_000n;
export const TEN_PERCENT_IN_WEI = ONE_HUNDRED_PERCENT_IN_WEI / 10n;
export const FIVE_PERCENT_IN_WEI = ONE_HUNDRED_PERCENT_IN_WEI / 20n;
export const ONE_PERCENT_IN_WEI = ONE_HUNDRED_PERCENT_IN_WEI / 100n;
export const ONE_ONE_HUNDREDTH_PERCENT_IN_WEI = ONE_HUNDRED_PERCENT_IN_WEI / 10_000n;
export const NULL_ADDRESS_ALT = "0x0000000000000000000000000000000000000001";

export const AddressListUpdateType = {
  None: 0n,
  AddOnly: 1n,
  RemoveOnly: 2n,
  AddAndRemove: 3n,
} as const;

export const UintListUpdateType = {
  None: 0n,
  AddOnly: 1n,
  RemoveOnly: 2n,
  AddAndRemove: 3n,
} as const;
