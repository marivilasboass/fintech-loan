export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Nullable<T, TKeys extends keyof T> = { [K in keyof T]: K extends TKeys ? T[K] | null : T[K] }