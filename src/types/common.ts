export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = T | Nullable<T> | Optional<T>;

export type WalletAddress = string;

export type AccountAddress = string;

export type TxHash = string;

export type Token = {
  address: AccountAddress;
  symbol: string;
  decimals: number;
  logo: string;
};
