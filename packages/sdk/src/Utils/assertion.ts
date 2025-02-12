export function never(_: never, description: string): never {
  throw new Error(description);
}

export function invariant(condition: any, description: string): asserts condition {
  if (!condition) {
    throw new Error(description);
  }
}

export function assertEnumType<TValue extends number | bigint, TObject extends Record<string, TValue>>(
  enumType: TObject,
  value: TValue,
): asserts value is TObject[keyof TObject] {
  if (!Object.values(enumType).includes(value as TObject[keyof TObject])) {
    throw new Error(`Incorret type: ${value}`);
  }
}
