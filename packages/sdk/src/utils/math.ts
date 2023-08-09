export function min(firstValue: bigint, ...restValues: bigint[]) {
  const values = [firstValue, ...restValues];

  let minValue = firstValue;

  for (let i = 1; i < values.length; i++) {
    const value = values[i];
    if (value === undefined) {
      throw new Error("value is undefined");
    }

    if (value < minValue) {
      minValue = value;
    }
  }

  return minValue;
}
