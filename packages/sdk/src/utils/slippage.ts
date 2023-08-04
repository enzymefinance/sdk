export function multiplyBySlippage({ amount, slippage }: { amount: bigint; slippage: bigint }) {
  const slippageFactor = 100n;

  return (amount * (slippageFactor - slippage)) / slippageFactor;
}
