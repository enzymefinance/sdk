export function never(_: never, description: string): never {
  throw new Error(description);
}

// rome-ignore lint/suspicious/noExplicitAny: <explanation>
export function invariant(condition: any, description: string): asserts condition {
  if (!condition) {
    throw new Error(description);
  }
}
