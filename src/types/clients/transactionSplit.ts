import type { Bearer, Currency, TxSplit } from "../../enums.ts";
import { PaginationAndDateFilterOptions } from "../global.ts";

export type TxSplitAccount = {
  readonly subaccount: string;
  readonly share: number;
};

export type TransactionSplitCreatePayload = {
  readonly name: string;
  readonly type: TxSplit;
  readonly currency: Currency;
  readonly subaccounts: TxSplitAccount[];
  readonly bearerType: Bearer;
  readonly bearerSubaccount: string;
};

export type GetSplitsOptions = PaginationAndDateFilterOptions & {
  readonly name: string;
  readonly sortBy?: string;
  readonly active?: boolean;
};

export type UpdateTxSplitPayload = {
  readonly name: string;
  readonly active: boolean;
  readonly bearerType?: Bearer;
  readonly bearerSubaccount?: string;
};
