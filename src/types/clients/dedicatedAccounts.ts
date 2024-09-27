import type { Country, Currency } from "../../enums.ts";

/**
 * A representation of the data sent to paystack to create a dedicated virtual
 * account.
 */
export type CreateDedicatedAccountPayload = {
  /**
   * Customer ID or code
   */
  readonly customer: string;
  /**
   * The bank slug for a preferred bank. To get a list of available banks,
   *  call ``paystackClient.dedicatedAccounts.getProviders`` method.
   */
  readonly preferredBank?: string;
  /**
   * Subaccount code of the account you want to split the transaction with
   */
  readonly subaccount?: string;
  /**
   * Split code consisting of the lists of accounts you want to split the transaction with
   */
  readonly splitCode?: string;
  /**
   * Customer's first name
   */
  readonly firstName?: string;
  /**
   * Customer's last name
   */
  readonly lastName?: string;
  /**
   * Customer's phone number
   */
  readonly phone?: string;
};

/**
 * A representation of the data sent to paystack to assign a dedicated virtual
 * account to a customer.
 */
export type AssignDedicatedAccountPayload = {
  /**
   * Customer email address
   */
  readonly email: string;
  /**
   * Customer's first name
   */
  readonly firstName: string;
  /**
   * Customer's last name
   */
  readonly lastName: string;
  /**
   * Customer's phone number
   */
  readonly phone: string;
  /**
   * The bank slug for preferred bank. To get a list of available banks, call the
   * `PaystackClient.miscellaneous.getBanks` with `payWithBankTransfer=true`
   */
  readonly preferredBank: string;
  /**
   * Currently accepts `Country.NIGERIA` only
   */
  readonly country?: Country;
  /**
   * Customer's account number
   */
  readonly accountNumber?: string;
  /**
   * Customer's Bank Verification Number
   */
  readonly bvn?: string;
  /**
   * Customer's bank code
   */
  readonly bankCode?: string;
  /**
   * Subaccount code of the account you want to split the transaction with
   */
  readonly subaccount?: string;
  /**
   * Split code consisting of the lists of accounts you want to split the transaction with
   */
  readonly splitCode?: string;
};

/**
 * A representation of the options available for retrieving a dedicated virtual
 * account.
 */
export type GetDedicatedAccountsOptions = {
  /**
   * Status of the dedicated virtual account
   */
  readonly active?: boolean;
  /**
   * The currency of the dedicated virtual account. Only ``Currency.NGN`` is currently allowed
   */
  readonly currency?: Currency;
  /**
   * The bank's slug in lowercase, without spaces e.g. wema-bank. call the `.getProviders`
   * method of `PaystackClient.dedicatedAccounts` property.
   */
  readonly providerSlug?: string;
  /**
   * The bank's ID e.g., 035
   */
  readonly bankId?: string;
  /**
   * The customer's ID
   */
  readonly customer?: string;
};

/**
 * A representation of data sent to Paystack to Split a dedicated virtual 
 * account transaction with one or more accounts
 */
export type SplitPayload = {
  /** Customer ID or code */
  readonly customer: string;
  /** Subaccount code of the account you want to split the transaction with */
  readonly subaccount?: string;
  /** Split code consisting of the lists of accounts you want to split the transaction with */
  readonly splitCode?: string;
  /**
   * The bank slug for preferred bank. To get a list of available banks, call the
   * `PaystackClient.miscellaneous.getBanks` with `payWithBankTransfer=true`
   */
  readonly preferredBank?: string;
};
