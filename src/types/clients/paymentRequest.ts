import type { Currency, Status } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of tax data
 */
export type Tax = {
  /** The name of the tax */
  readonly name: string;
  /** The charge of the tax */
  readonly amount: number;
};

/** A representation of line item data */
export type LineItem = {
  /** The name of the product */
  readonly name: string;
  /** The price of the product */
  readonly amount: number;
  /** The number of units of the product */
  readonly quantity: number;
};

/**
 * A representation of the data sent to Paystack to create
 * a payment request.
 */
export type CreatePaymentRequestPayload = {
  /**
   * The customer's ID or code
   */
  readonly customer: string;
  /**
   * Payment request amount. It should be used when {@link LineItem} 
   * and {@link Tax} values aren't specified.
   */
  readonly amount: number;
  /**
   * ISO 8601 representation of request due date
   */
  readonly dueDate?: string;
  /**
   * A short description of the payment request
   */
  readonly description?: string;
  /**
   * List of line items int the format [{"name":"item 1", "amount":2000, "quantity": 1}]
   */
  readonly lineItems?: LineItem[];
  /**
   * List of taxes to be charged in the format [{"name":"VAT", "amount":2000}]
   */
  readonly tax?: Tax[];
  /**
   * Any value from Currency enum. default ``Currency.NGN``
   */
  readonly currency?: Currency;
  /**
   * Indicates whether Paystack sends an email notification to customer. Defaults to ``true``
   */
  readonly sendNotifications?: boolean;
  /**
   * Indicate if request should be saved as draft. Defaults to ``false`` and overrides send_notification
   */
  readonly draft?: boolean;
  /**
   * Set to ``true`` to create a draft invoice (adds an auto-incrementing invoice number
   * if none is provided) even if there are no line_items or tax passed
   */
  readonly hasInvoice?: boolean;
  /**
   * Numeric value of invoice. Invoice will start from 1 and auto increment from there.
   * This field is to help override whatever value Paystack decides. Auto increment for
   * subsequent invoices continue from this point.
   */
  readonly invoiceNumber?: number;
  /**
   * The split code of the transaction split. e.g. SPL_98WF13Eb3w
   */
  readonly splitCode?: string;
};

/**
 * Let you customize how payment requests are retrieved via pagination
 * date filtering, filtering by customer,status,currency or archived
 * payment request @see {@link GetPaymentRequestsOptions}
 */
export type GetPaymentRequestsOptions = PaginationAndDateFilterOptions & {
  /**
   * Filter by customer ID
   */
  readonly customer?: string;
  /**
   * Filter by payment request status. Any value from enum of {@link Status}
   */
  readonly status?: Status;
  /**
   * Filter by currency. Any value from enum of {@link Currency}
   */
  readonly currency?: Currency;
  /**
   * Show archived payment requests.
   */
  readonly includeArchive?: boolean;
};

/**
 * A representation of the data sent to paystack to update
 * a payment request. @see {@link CreatePaymentRequestPayload}
 */
export type UpdatePaymentRequestPayload = Omit<
  CreatePaymentRequestPayload,
  "hasInvoice"
>;
