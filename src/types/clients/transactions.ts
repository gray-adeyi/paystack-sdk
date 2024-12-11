import type {
  Bearer,
  Channel,
  Currency,
  TransactionStatus,
} from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of the data sent to paystack to initialize a transaction.
 */
export type InitializeTransactionPayload = {
  /**
   * Amount should be in kobo if currency is ``Currency.NGN``, pesewas,
   * if currency is ``Currency.GHS``, and cents, if currency is ``Currency.ZAR``
   */
  readonly amount: number;
  /**
   * Customer's email address
   */
  readonly email: string;
  /**
   * Any value from the {@link Currency} enum.
   */
  readonly currency?: Currency;
  /**
   * Unique transaction reference. Only ``-, ., =`` and
   * alphanumeric characters allowed.
   */
  readonly reference?: string;
  /**
   * Fully qualified url, e.g. ``https://example.com/`` .
   * Use this to override the callback url
   * provided on the dashboard for this transaction
   */
  readonly callbackUrl?: string;
  /**
   * If transaction is to create a subscription to a
   * predefined plan, provide plan code here.
   * This would invalidate the value provided in ``amount``
   */
  readonly plan?: string;
  /**
   * Number of times to charge customer during subscription to plan
   */
  readonly invoiceLimit?: number;
  /**
   * An object of additional info. check out this link
   * for more information. https://paystack.com/docs/payments/metadata
   */
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
  /**
   * An array of {@link Channel} enum values to control what channels
   * you want to make available to the user to make a payment with
   */
  readonly channels?: Channel[];
  /**
   * The split code of the transaction split. e.g. SPL_98WF13Eb3w
   */
  readonly splitCode?: string;
  /**
   * The code for the subaccount that owns the payment. e.g. ACCT_8f4s1eq7ml6rlzj
   */
  readonly subaccount?: string;
  /**
   * An amount used to override the split configuration for a single
   * split payment. If set, the amount specified goes to the main
   * account regardless of the split configuration.
   */
  readonly transferCharge?: number;
  /**
   * Any value from the {@link Bearer} enum. Who bears Paystack charges?
   */
  readonly bearer?: Bearer;
};

/**
 * Lets you customize how transactions are retrieved
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetTransactionsOptions = PaginationAndDateFilterOptions & {
  /**
   * Specify an ID for the customer whose transactions you want to retrieve
   */
  readonly customer?: string;
  /**
   * Filter transactions by status. any value from the {@link TransactionStatus} enum
   */
  readonly status?: TransactionStatus;
  /**
   * Filter transactions by amount. Specify the amount (in kobo if currency is
   * ``Currency.NGN``, pesewas, if currency is ``Currency.GHS``, and cents, if
   * currency is ``Currency.ZAR``)
   */
  readonly amount?: number;
};

/**
 * A representation of the data sent to paystack to charge a customer
 */
export type TransactionChargePayload = {
  /**
   * The amount to charge
   */
  readonly amount: number;
  /**
   * The customer's email address
   */
  readonly email: string;
  /**
   * Valid authorization code to charge
   */
  readonly authorizationCode: string;
  /**
   * Unique transaction reference. Only ``-, ., =`` and alphanumeric
   * characters allowed.
   */
  readonly reference?: string;
  /**
   * Currency in which amount should be charged. Any value from the
   * {@link Currency} enum.
   */
  readonly currency?: Currency;
  /**
   * Add a custom_fields attribute which has an array of objects if
   * you would like the fields to be added to your transaction when
   * displayed on the dashboard.
   * Sample: ``{"customFields":[{"displayName":"Cart ID",
   * "variableName": "cartId","value": "8393"}]}``
   */
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
  /**
   * A array of {@link Channel} enum values to control what channels you
   * want to make available to the user to make a payment with
   */
  readonly channels?: Channel[];
  /**
   * The code for the subaccount that owns the payment. e.g. ACCT_8f4s1eq7ml6rlzj
   */
  readonly subaccount?: string;
  /**
   * A flat fee to charge the subaccount for this transaction (in kobo if currency is NGN,
   * pesewas, if currency is GHS, and cents, if currency is ZAR). This overrides the split
   * percentage set when the subaccount was created. Ideally, you will need to use this if
   * you are splitting in flat rates (since subaccount creation only allows for percentage split).
   * e.g., 7000 for a 70 naira
   */
  readonly transactionCharge?: number;
  /**
   * Who bears Paystack charges? any value from the {@link Beaer} enum
   */
  readonly bearer?: Bearer;
  /**
   * If you are making a scheduled charge call, it is a good idea to queue them so the processing
   * system does not get overloaded causing transaction processing errors. Set ``queue=true`` to
   * take advantage of our queued charging.
   */
  readonly queue?: boolean;
};

/**
 * Lets you customize how you retrieve the total amount
 * your account has received.
 * @see {@link PaginationAndDateFilterOptions}
 */
export type TotalsOptions = PaginationAndDateFilterOptions;

/**
 * Lets you customize how exports are retrieved.
 * @see {@link PaginationAndDateFilterOptions}
 */
export type ExportOptions = PaginationAndDateFilterOptions & {
  /**
   * Specify an ID for the customer whose transactions you want
   * to retrieve
   */
  readonly customer?: string;
  /**
   * Filter transactions by status. Any value from
   * the {@link TransactionStatus} enum
   */
  readonly status?: TransactionStatus;
  /**
   * Specify the transaction currency to export.
   * Any value from the {@link Currency} enum
   */
  readonly currency?: Currency;
  /**
   * Filter transactions by amount. Specify the amount, in
   * kobo if currency is ``Currency.NGN``, pesewas, if currency
   * is ``Currency.GHS``, and cents, if currency is ``Currency.ZAR``
   */
  readonly amount?: number;
  /**
   * Set to ``true`` to export only settled transactions. ``false`` for
   * pending transactions. Leave undefined to export all transaction
   */
  readonly settled?: boolean;
  /**
   * An ID for the settlement whose transactions we should export
   */
  readonly settlement?: string;
  /**
   * Specify a payment page's id to export only transactions conducted on said page
   */
  readonly paymentPage?: string;
};

/**
 * A representation of the data sent to Paystack to initiate a
 * partial debit
 */
export type PartialDebitPayload = {
  /**
   * Authorization code.
   */
  readonly authorizationCode: string;
  /**
   * Specify the currency you want to debit. Any value
   * from the {@link Currency} enum.
   */
  readonly currency: Currency;
  /**
   * Amount should be in kobo if currency is ``Currency.NGN``, pesewas,
   * if currency is ``Currency.GHS``, and cents, if currency is ``Currency.ZAR``
   */
  readonly amount: number;
  /**
   * Customer's email address (attached to the authorization code)
   */
  readonly email: string;
  /**
   * Unique transaction reference. Only `-, ., =`
   * and alphanumeric characters allowed.
   */
  readonly reference?: string;
  /**
   * Minimum amount to charge
   */
  readonly atLeast?: number;
};
