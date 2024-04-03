export function min(first: bigint, ...rest: Array<bigint>) {
  let min = first;
  for (const value of rest) {
    if (value < min) {
      min = value;
    }
  }

  return min;
}

export function max(first: bigint, ...rest: Array<bigint>) {
  let max = first;
  for (const value of rest) {
    if (value > max) {
      max = value;
    }
  }

  return max;
}
