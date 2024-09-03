import type { PaginationAndDateFilterOptions } from "../global.ts";

export type GetSettlementsOptions = PaginationAndDateFilterOptions & {
  readonly subaccount?: string;
};

export type GetSettlementTransactionsOptions =
  & PaginationAndDateFilterOptions
  & {};
