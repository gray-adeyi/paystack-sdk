import type { Currency, Interval, Status } from "../../enums.ts";
import type { PaginationOptions } from "../global.ts";

/**
 * A representation of the data sent to Paystack to create
 * a plan
 */
export type CreatePlanPayload = {
  /**
   * Name of the plan
   */
  readonly name: string;
  /**
   * Amount should be in kobo if currency is ``Currency.NGN``, pesewas,
   * if currency is ``Currency.GHS``, and cents, if currency is ``Currency.ZAR``
   */
  readonly amount: number;
  /**
   * Any value from the {@link Interval} enum.
   */
  readonly interval: Interval;
  /**
   * A description for this plan
   */
  readonly description?: string;
  /**
   * Currency in which amount is set. Any of the value from
   * the {@link Currency} enum
   */
  readonly currency?: Currency;
  /**
   * Number of invoices to raise during subscription to this plan.
   * Can be overridden by specifying an ``invoiceLimit`` while subscribing
   */
  readonly invoiceLimit?: number;
  /**
   * Set to ``false`` if you don't want invoices to be sent to your customers
   */
  readonly sendInvoices?: boolean;
  /**
   * Set to ``false`` if you don't want text messages to be sent to your customers
   */
  readonly sendSms?: boolean;
};

/**
 * Lets you customize how the plans on your integration are retrieved.
 * @see {@link PaginationOptions}
 */
export type GetPlansOptions = PaginationOptions & {
  /**
   * Filter list by plans with specified status
   */
  readonly status?: Status;
  /**
   * Filter list by plans with specified interval
   */
  readonly interval?: Interval;
  /**
   * Filter list by plans with specified amount ( kobo if currency
   * is ``Currency.NGN``, pesewas, if currency is ``Currency.GHS``,
   * and cents, if currency is ``Currency.ZAR``)
   */
  readonly amount?: number;
};

/**
 * A representation of the data sent to Paystack to update a plan
 */
export type UpdatePlanPayload = {
  /**
   * The name of the plan
   */
  readonly name?: string;
  /**
   * Amount should be in kobo if currency is
   * ``Currency.NGN`` and pesewas for ``Currency.GHS``
   */
  readonly amount?: number;
  /**
   * Any value from the {@link Interval} enum.
   */
  readonly interval?: Interval;
  /**
   * A description for this plan.
   */
  readonly description?: string;
  /**
   * Any value from the {@link Currency} enum.
   */
  readonly currency?: Currency;
  /**
   * Number of invoices to raise during subscription to this plan.
   * Can be overridden by specifying an ``invoiceLimit`` while subscribing.
   */
  readonly invoiceLimit?: number;
  /**
   * Set to ``false`` if you don't want invoices
   * to be sent to your customers
   */
  readonly sendInvoices?: boolean;
  /**
   * Set to ``false`` if you don't want text messages to
   * be sent to your customers
   */
  readonly sendSms?: boolean;
};
