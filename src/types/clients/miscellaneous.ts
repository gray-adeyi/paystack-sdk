import type { BankType, Country, Currency, Gateway } from "../../enums.ts";

export type GetBanksOptions = {
  readonly country: Country;
  readonly useCursor?: boolean;
  readonly next?: string;
  readonly previous?: string;
  readonly gateway?: Gateway;
  readonly type?: BankType;
  readonly currency?: Currency;
  readonly payWithBankTransfer?: boolean;
  readonly payWithBank?: boolean;
  readonly perPage?: number;
};
