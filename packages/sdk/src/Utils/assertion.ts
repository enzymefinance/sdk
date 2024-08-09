export function never(_: never, description: string): never {
  throw new Error(description);
}

export function invariant(condition: any, description: string): asserts condition {
  if (!condition) {
    throw new Error(description);
  }
}

export function assertEnumType<TObject extends Record<string, number>>(
  enumType: TObject,
  value: number,
): asserts value is TObject[keyof TObject] {
  if (!Object.values(enumType).includes(value as TObject[keyof TObject])) {
    throw new Error(`Incorret type: ${value}`);
  }
}
