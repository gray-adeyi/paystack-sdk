import type { Country, Identification } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of the data sent to paystack to create a customer
 */
export type CreateCustomerPayload = {
  /**
   * The customer's email address
   */
  readonly email: string;
  /**
   * The customer's first name
   */
  readonly firstName?: string;
  /**
   * The customer's last name (surname)
   */
  readonly lastName?: string;
  /**
   * The customer's phone number
   */
  readonly phone?: string;
  /**
   * An object that you can attach to the customer. It can be used
   * to store additional information in a structured format.
   */
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
};

/**
 * Lets you customize how the customers are retrieved by filtering
 * by date or adjusting how much data should be returned or which
 * sets of data to be returned by pagination.
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetCustomersOptions = PaginationAndDateFilterOptions;

/**
 * A representation of the data sent to paystack to update a customer's
 * details
 */
export type UpdateCustomerPayload = {
  /** The customer's first name */
  readonly firstName?: string;
  /** The customer's last name */
  readonly lastName?: string;
  /**
   * The customer's phone number
   */
  readonly phone?: string;
  /**
   * An object that you can attach to the customer. It can be used
   * to store additional information in a structured format.
   */
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
};

/**
 * A representation of the data sent to paystack for validating a
 * customer
 */
export type ValidatePayload = {
  /**
   * Customer's first name
   */
  readonly firstName: string;
  /**
   * Customer's last name
   */
  readonly lastName: string;
  /**
   * Enum of Identification e.g `Identification.BVN`
   * Only `Identification.BANK_ACCOUNT` is supported at the moment
   */
  readonly type: Identification.BANK_ACCOUNT;
  /**
   * Customer's Country e.g `Country.NIGERIA`
   */
  readonly country: Country;
  /**
   * Customer's bank verification number
   */
  readonly bvn: string;
  /**
   * An identification number based on the `identificationType`
   */
  readonly identificationNumber?: string;
  /**
   * You can get the list of Bank Codes by calling
   * `PaystackClient.miscellaneous.getBanks` method.
   * (required if identificationType is Identification.BANK_ACCOUNT)
   */
  readonly bankCode?: string;
  /**
   * Customer's bank account number.
   * (required if identificationType is Identification.BANK_ACCOUNT)
   */
  readonly accountNumber?: string;
  /**
   * Customer's middle name
   */
  readonly middleName?: string;
};
