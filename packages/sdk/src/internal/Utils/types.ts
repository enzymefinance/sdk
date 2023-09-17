// Make some properties on the given type optional
export type PartialPick<TObject extends object, TOptional extends keyof TObject> = Prettify<
  Pick<TObject, Exclude<keyof TObject, TOptional>> & Partial<Pick<TObject, TOptional>>
>;

// Flatten all type properties into a human readable format.
export type Prettify<T> = {
  [K in keyof T]: T[K];
  // rome-ignore lint/nursery/noBannedTypes: permissable in this case
} & {};

export type TupleOf<T, N extends number, R extends unknown[]> = R["length"] extends N ? R : TupleOf<T, N, [T, ...R]>;

export type Tuple<T, N extends number> = N extends N ? (number extends N ? T[] : TupleOf<T, N, []>) : never;

export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
