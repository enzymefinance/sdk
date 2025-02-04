export type Hex = `0x${string}`;
export type Address = `0x${string}`;
export type AddressZero = "0x0000000000000000000000000000000000000000";
export type NarrowByType<T, N> = T extends { type: N } ? T : never;
