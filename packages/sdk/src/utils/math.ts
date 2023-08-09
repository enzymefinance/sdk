export function min(firstValue: bigint, ...restValues: bigint[]) {
  let minValue = firstValue;
  for (const value of restValues) {
    if (value < minValue) {
      minValue = value;
    }
  }

  return minValue;
}
