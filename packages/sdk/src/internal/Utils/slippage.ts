export function multiplyBySlippage({ amount, slippage }: { amount: bigint; slippage: bigint }) {
  const slippageFactor = 100n;

  return (amount * (slippageFactor - slippage)) / slippageFactor;
}

export function applySlippage(value: bigint, slippageInBps: bigint) {
  const output = value - (value * slippageInBps) / 10000n;
  return output >= 0n ? output : 0n;
}

export function convertFromRatioToBps(ratio: number) {
  return BigInt(Math.floor(ratio * 10000));
}
