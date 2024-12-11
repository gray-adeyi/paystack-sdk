import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of the data sent to Paystack to create a payment
 * page
 */
export type CreatePaymentPagePayload = {
  /** Name of the page */
  readonly name: string;
  /** The description for the created page */
  readonly description?: string;
  /**
   * Amount should be in kobo if currency is ``Currency.NGN``, pesewas, if
   * currency is ``Currency.GHS``, and cents, if currency is ``Currency.ZAR``
   */
  readonly amount?: number;
  /**
   * The split code of the transaction split. e.g. SPL_98WF13Eb3w
   */
  readonly splitCode?: string;
  /**
   * URL slug you would like to be associated with this page.
   * Page will be accessible at ``https://paystack.com/pay/[slug]``
   */
  readonly slug?: string;
  /**
   * Extra data to configure the payment page including subaccount,
   * logo image, transaction charge
   */
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
  /**
   * If you would like Paystack to redirect some url upon
   * successful payment, specify the URL here.
   */
  readonly redirectUrl?: string;
  /**
   * If you would like to accept custom fields,
   * specify them here.
   */
  // deno-lint-ignore no-explicit-any
  readonly customFields?: any[];
};

/**
 * A representation of options available when retrieving pages.
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetPagesOptions = PaginationAndDateFilterOptions;

/**
 * A representation of the data sent to paystack to update a payment page.
 */
export type UpdatePaymentPagePayload = {
  /** Name of page */
  readonly name?: string;
  /** A description for the page */
  readonly description?: string;
  /**
   * Default amount you want to accept using this page.
   * If none is set, customer is free to provide any amount
   * of their choice. The latter scenario is useful for
   * accepting donations
   */
  readonly amount?: number;
  /**
   * Set to ``false`` to deactivate page url
   */
  readonly active?: boolean;
};
