// Make some properties on the given type optional
export type PartialPick<TObject extends object, TOptional extends keyof TObject> = Pick<
  TObject,
  Exclude<keyof TObject, TOptional>
> &
  Partial<Pick<TObject, TOptional>>;
