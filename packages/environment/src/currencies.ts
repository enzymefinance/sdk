export enum Currency {
  USD = "USD",
  AUD = "AUD",
  BTC = "BTC",
  CHF = "CHF",
  ETH = "ETH",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
}

export enum CurrencySlug {
  USD = "usd",
  AUD = "aud",
  BTC = "btc",
  CHF = "chf",
  ETH = "eth",
  EUR = "eur",
  GBP = "gbp",
  JPY = "jpy",
}

export interface CurrencyDefinition<TCurrency extends Currency = Currency> {
  readonly id: Currency;
  readonly slug: SlugByCurrency<TCurrency>;
  readonly label: string;
}

export type SlugByCurrency<TCurrency extends Currency> = TCurrency extends Currency.USD
  ? CurrencySlug.USD
  : TCurrency extends Currency.AUD
    ? CurrencySlug.AUD
    : TCurrency extends Currency.BTC
      ? CurrencySlug.BTC
      : TCurrency extends Currency.CHF
        ? CurrencySlug.CHF
        : TCurrency extends Currency.ETH
          ? CurrencySlug.ETH
          : TCurrency extends Currency.EUR
            ? CurrencySlug.EUR
            : TCurrency extends Currency.GBP
              ? CurrencySlug.GBP
              : TCurrency extends Currency.JPY
                ? CurrencySlug.JPY
                : never;

export type CurrencyBySlug<TCurrencySlug extends CurrencySlug> = TCurrencySlug extends CurrencySlug.USD
  ? Currency.USD
  : TCurrencySlug extends CurrencySlug.AUD
    ? Currency.AUD
    : TCurrencySlug extends CurrencySlug.BTC
      ? Currency.BTC
      : TCurrencySlug extends CurrencySlug.CHF
        ? Currency.CHF
        : TCurrencySlug extends CurrencySlug.ETH
          ? Currency.ETH
          : TCurrencySlug extends CurrencySlug.EUR
            ? Currency.EUR
            : TCurrencySlug extends CurrencySlug.GBP
              ? Currency.GBP
              : TCurrencySlug extends CurrencySlug.JPY
                ? Currency.JPY
                : never;

export function getCurrency<TCurrency extends Currency = Currency>(currency: TCurrency): CurrencyDefinition<TCurrency>;
export function getCurrency<TCurrencySlug extends CurrencySlug = CurrencySlug>(
  slug: TCurrencySlug,
): CurrencyDefinition<CurrencyBySlug<TCurrencySlug>>;
export function getCurrency(currencyOrSlug: Currency | CurrencySlug): CurrencyDefinition;

export function getCurrency(currencyOrSlug: Currency | CurrencySlug): CurrencyDefinition {
  if (isSupportedCurrency(currencyOrSlug)) {
    return currencies[currencyOrSlug];
  }

  if (isSupportedCurrencySlug(currencyOrSlug)) {
    return currencies[currencyBySlug[currencyOrSlug]];
  }

  throw new Error(`Invalid currency ${currencyOrSlug}`);
}

export function isCurrencyIdentifier(value: any): value is Currency | CurrencySlug {
  return isSupportedCurrency(value) || isSupportedCurrencySlug(value);
}

export function isSupportedCurrency(value: any): value is Currency {
  return typeof value === "string" && Object.values(Currency).includes(value as any);
}

export function isSupportedCurrencySlug(value: any): value is CurrencySlug {
  return typeof value === "string" && Object.values(CurrencySlug).includes(value as any);
}

export const slugByCurrency: {
  [TCurrency in Currency]: SlugByCurrency<TCurrency>;
} = {
  [Currency.USD]: CurrencySlug.USD,
  [Currency.AUD]: CurrencySlug.AUD,
  [Currency.BTC]: CurrencySlug.BTC,
  [Currency.CHF]: CurrencySlug.CHF,
  [Currency.ETH]: CurrencySlug.ETH,
  [Currency.EUR]: CurrencySlug.EUR,
  [Currency.GBP]: CurrencySlug.GBP,
  [Currency.JPY]: CurrencySlug.JPY,
};

export const currencyBySlug: {
  [TCurrencySlug in CurrencySlug]: CurrencyBySlug<TCurrencySlug>;
} = {
  [CurrencySlug.USD]: Currency.USD,
  [CurrencySlug.AUD]: Currency.AUD,
  [CurrencySlug.BTC]: Currency.BTC,
  [CurrencySlug.CHF]: Currency.CHF,
  [CurrencySlug.ETH]: Currency.ETH,
  [CurrencySlug.EUR]: Currency.EUR,
  [CurrencySlug.GBP]: Currency.GBP,
  [CurrencySlug.JPY]: Currency.JPY,
};

export const currencies: {
  [TCurrency in Currency]: CurrencyDefinition<TCurrency>;
} = {
  [Currency.ETH]: {
    id: Currency.ETH,
    label: "Ether",
    slug: CurrencySlug.ETH,
  },
  [Currency.BTC]: {
    id: Currency.BTC,
    label: "Bitcoin",
    slug: CurrencySlug.BTC,
  },
  [Currency.USD]: {
    id: Currency.USD,
    label: "United States dollar",
    slug: CurrencySlug.USD,
  },
  [Currency.EUR]: {
    id: Currency.EUR,
    label: "Euro",
    slug: CurrencySlug.EUR,
  },
  [Currency.CHF]: {
    id: Currency.CHF,
    label: "Swiss franc",
    slug: CurrencySlug.CHF,
  },
  [Currency.GBP]: {
    id: Currency.GBP,
    label: "Pound sterling",
    slug: CurrencySlug.GBP,
  },
  [Currency.AUD]: {
    id: Currency.AUD,
    label: "Australian dollar",
    slug: CurrencySlug.AUD,
  },
  [Currency.JPY]: {
    id: Currency.JPY,
    label: "Japanese yen",
    slug: CurrencySlug.JPY,
  },
};
