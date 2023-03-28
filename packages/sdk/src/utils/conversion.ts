import Decimal from "decimal.js";

export function toBps(decimal: Decimal.Value): bigint {
  return BigInt(new Decimal(decimal).mul(10000).toFixed(0));
}

export function toWei(decimal: Decimal.Value): bigint {
  return BigInt(new Decimal(decimal).mul(1000000000000000000).toFixed(0));
}

export function toSeconds({
  years = 0,
  weeks = 0,
  days = 0,
  minutes = 0,
  hours = 0,
}: {
  years?: Decimal.Value;
  weeks?: Decimal.Value;
  days?: Decimal.Value;
  hours?: Decimal.Value;
  minutes?: Decimal.Value;
}): bigint {
  let result = 0n;

  if (years) {
    result += BigInt(new Decimal(years).mul(31_557_600).toFixed(0));
  }

  if (weeks) {
    result += BigInt(new Decimal(weeks).mul(604_800).toFixed(0));
  }

  if (days) {
    result += BigInt(new Decimal(days).mul(86_400).toFixed(0));
  }

  if (hours) {
    result += BigInt(new Decimal(hours).mul(3_600).toFixed(0));
  }

  if (minutes) {
    result += BigInt(new Decimal(minutes).mul(60).toFixed(0));
  }

  return result;
}
