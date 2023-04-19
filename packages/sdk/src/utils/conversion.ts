import { Decimal } from "decimal.js";

export function toBps(decimal: Decimal.Value): bigint {
  return BigInt(new Decimal(decimal).mul(10000).toFixed(0, Decimal.ROUND_DOWN));
}

export function toWei(value: Decimal.Value, decimals = 18): bigint {
  return BigInt(new Decimal(value).mul(new Decimal(10).pow(decimals)).toFixed(0, Decimal.ROUND_DOWN));
}

export function fromWei(value: bigint, decimals = 18): number {
  return new Decimal(`${value}`).div(new Decimal(10).pow(decimals)).toNumber();
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
    result += BigInt(new Decimal(years).mul(31_557_600).toFixed(0, Decimal.ROUND_DOWN));
  }

  if (weeks) {
    result += BigInt(new Decimal(weeks).mul(604_800).toFixed(0, Decimal.ROUND_DOWN));
  }

  if (days) {
    result += BigInt(new Decimal(days).mul(86_400).toFixed(0, Decimal.ROUND_DOWN));
  }

  if (hours) {
    result += BigInt(new Decimal(hours).mul(3_600).toFixed(0, Decimal.ROUND_DOWN));
  }

  if (minutes) {
    result += BigInt(new Decimal(minutes).mul(60).toFixed(0, Decimal.ROUND_DOWN));
  }

  return result;
}

export function applySlippage(value: bigint, slippageInBps: bigint) {
  const output = value - (value * slippageInBps) / 10000n;
  return output >= 0n ? output : 0n;
}
