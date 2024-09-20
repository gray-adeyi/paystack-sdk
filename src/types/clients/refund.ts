import type { Currency } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of the data sent to Paystack to create
 * a refund.
 */
export type CreateRefundPayload = {
  /**
   * Transaction reference or id
   */
  readonly transaction: string;
  /**
   * Amount ( in kobo if currency is NGN, pesewas, if currency is
   * GHS, and cents, if currency is ZAR ) to be refunded to the
   * customer. Amount is optional(defaults to original
   * transaction amount) and cannot be more than the original
   * transaction amount
   */
  readonly amount?: number;
  /**
   * Any value from the {@link Currency} enum
   */
  readonly currency?: Currency;
  /**
   * Customer's reason
   */
  readonly customerNote?: string;
  /**
   * Merchant's reason
   */
  readonly merchantNote?: string;
};

/**
 * Lets you customize how refunds are retrieved
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetRefundsOptions = PaginationAndDateFilterOptions & {
  /**
   * Identifier for transaction to be refunded
   */
  readonly reference?: string;
  /**
   * Any value from the {@link Currency} enum
   */
  readonly currency?: Currency;
};
