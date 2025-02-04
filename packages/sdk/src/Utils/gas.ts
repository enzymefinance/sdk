import type { PublicClient } from "viem";

export async function getGasPrice(client: PublicClient) {
  const [baseFee, maxPriorityFee] = await Promise.all([getBaseFee(client), getMaxPriorityFee(client)]);

  return baseFee + maxPriorityFee.fast;
}

export async function getBaseFee(client: PublicClient) {
  const baseFee = (await client.getBlock({ blockTag: "latest" })).baseFeePerGas;

  if (typeof baseFee === "bigint") {
    return baseFee;
  }

  const gasPrice = await client.getGasPrice();

  return gasPrice;
}

export async function getMaxPriorityFee(client: PublicClient) {
  const feeHistoryResult = await client.getFeeHistory({
    blockCount: 5,
    blockTag: "latest",
    rewardPercentiles: [25, 50, 75],
  });

  const maxPriorityFeeHistory = feeHistoryResult.reward ?? [[]];

  const slowPriorityFees = maxPriorityFeeHistory.map((item) => item[0]).filter((item) => item !== undefined);
  const standardPriorityFees = maxPriorityFeeHistory.map((item) => item[1]).filter((item) => item !== undefined);
  const fastPriorityFees = maxPriorityFeeHistory.map((item) => item[2]).filter((item) => item !== undefined);

  // Slow = 5-block priorityFee moving average - 25th Percentile
  // Standard = 5-block priorityFee moving average - 50th Percentile
  // Fast = 5-block priorityFee moving average - 75th Percentile

  const slow = slowPriorityFees.reduce((carry, value) => carry + value, 0n) / BigInt(slowPriorityFees.length);
  const standard =
    standardPriorityFees.reduce((carry, value) => carry + value, 0n) / BigInt(standardPriorityFees.length);
  const fast = fastPriorityFees.reduce((carry, value) => carry + value, 0n) / BigInt(fastPriorityFees.length);

  return { fast, slow, standard };
}
