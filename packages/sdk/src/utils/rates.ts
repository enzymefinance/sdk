import { toSeconds } from "./conversion.js";
import { Decimal } from "decimal.js";
import { parseEther } from "viem";

const LocalDecimal = Decimal.clone({ precision: 2 * 27 });

const scaledPerSecondRateScale = 10n ** 27n;
const scaledPerSecondRateScaleDecimal = new LocalDecimal(`${scaledPerSecondRateScale}`);

export function calculateAmountDueForScaledPerSecondRate({
  scaledPerSecondRate,
  totalAmount,
  secondsSinceLastSettled,
}: {
  scaledPerSecondRate: bigint;
  totalAmount: bigint;
  secondsSinceLastSettled: bigint;
}) {
  const timeFactor = rpow(scaledPerSecondRate, secondsSinceLastSettled, scaledPerSecondRateScale);
  const amountDue = (totalAmount * (timeFactor - scaledPerSecondRateScale)) / scaledPerSecondRateScale;

  return amountDue;
}

export function convertRateToScaledPerSecondRate({
  perAnnumRateInBps,
  adjustInflation,
}: {
  perAnnumRateInBps: bigint;
  adjustInflation: boolean;
}) {
  const rateDecimal = new LocalDecimal(`${perAnnumRateInBps}`).div(10000);
  const effectiveRate = adjustInflation ? rateDecimal.div(new LocalDecimal(1).minus(rateDecimal)) : rateDecimal;
  const scaledRate = new LocalDecimal(1)
    .plus(effectiveRate)
    .pow(new LocalDecimal(1).div(`${toSeconds({ years: 1 })}`))
    .toSignificantDigits(27)
    .mul(scaledPerSecondRateScaleDecimal);

  return BigInt(scaledRate.toFixed(0));
}

export function convertScaledPerSecondRateToRate({
  scaledPerSecondRate,
  adjustInflation,
}: {
  scaledPerSecondRate: bigint;
  adjustInflation: boolean;
}) {
  const scaledPerSecondRateD = new LocalDecimal(`${scaledPerSecondRate}`).div(scaledPerSecondRateScaleDecimal);
  const effectiveRate = scaledPerSecondRateD.pow(`${toSeconds({ years: 1 })}`).minus(new LocalDecimal(1));
  const scaledPerAnnumRate = adjustInflation
    ? effectiveRate.div(new LocalDecimal(1).plus(effectiveRate))
    : effectiveRate;

  return parseEther(scaledPerAnnumRate.toFixed(17, Decimal.ROUND_UP) as `${number}`);
}

function rpow(x: bigint, n: bigint, b: bigint) {
  const xD = new LocalDecimal(`${x}`);
  const bD = new LocalDecimal(`${b}`);
  const nD = new LocalDecimal(`${n}`);

  return BigInt(xD.div(bD).pow(nD).mul(bD).toFixed(0));
}

export function multiplyByRate({
  inverse = false,
  rate,
  rateDecimals = 18,
  value,
}: {
  inverse?: boolean;
  rate: bigint;
  rateDecimals?: number;
  value: bigint;
}) {
  const oneUnit = BigInt(10 ** rateDecimals);

  return inverse ? (value * oneUnit) / rate : (value * rate) / oneUnit;
}
