export function never(_: never, description: string): never {
  throw new Error(description);
}

export function invariant(condition: any, description: string): asserts condition {
  if (!condition) {
    throw new Error(description);
  }
}
