import type { PaginationOptions } from "../global.ts";

/**
 * A representation of the data sent to Paystack
 * to create a subscription
 */
export type CreateSubscriptionPayload = {
  /**
   * Customer's email address or customer code
   */
  readonly customer: string;
  /**
   * The plan's code
   */
  readonly plan: string;
  /**
   * If customer has multiple authorizations, you can set
   * the desired authorization you wish to use for this
   * subscription here. If this is not supplied, the
   * customer's most recent authorization would be used
   */
  readonly authorization?: string;
  /**
   * Set the date for the first debit. (ISO 8601 format) e.g. 2017-05-16T00:30:13+01:00
   */
  readonly startDate?: string;
};

/**
 * Lets you customize how subscriptions are retrieved
 * @see {@link PaginationOptions}
 */
export type GetSubscriptionsOptions = PaginationOptions & {
  /**
   * Filter by Customer ID
   */
  readonly customer?: string;
  /**
   * Filter by Plan ID
   */
  readonly plan?: string;
};
