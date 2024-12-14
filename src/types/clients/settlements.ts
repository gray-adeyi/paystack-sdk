import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * Lets you customize how settlements are retrieved.
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetSettlementsOptions = PaginationAndDateFilterOptions & {
  /**
   * Provide a subaccount ID to export only settlements for that subaccount.
   * Omit to export only transactions for the account.
   */
  readonly subaccount?: string;
};

/**
 * Lets you customize how settlement transactions are retrieved.
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetSettlementTransactionsOptions = PaginationAndDateFilterOptions;
