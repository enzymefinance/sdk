export function multiplyBySlippage({ value, slippage }: { value: bigint; slippage?: number }) {
  if (!slippage) {
    return value;
  }
  const slippageInBps = convertFromRatioToBps(slippage);

  return applySlippage(value, slippageInBps);
}

export function applySlippage(value: bigint, slippageInBps: bigint) {
  const output = value - (value * slippageInBps) / 10000n;
  return output >= 0n ? output : 0n;
}

export function convertFromRatioToBps(ratio: number) {
  return BigInt(Math.floor(ratio * 10000));
}
