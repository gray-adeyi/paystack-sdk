/**
 * A representation of the data that is sent to paystack
 * to initiate a charge.
 */
export type ChargePayload = {
  /** customer's email address */
  readonly email: string;
  /**
   * Amount should be in kobo if currency is NGN, pesewas, if currency is GHS,
   * and cents, if currency is ZAR
   */
  readonly amount: number;
  /**
   * Bank account to charge (don't send if charging an authorization code)
   */
  // deno-lint-ignore no-explicit-any
  readonly bank?: Record<string, any>;
  /**
   * Takes the settings for the Pay with Transfer (PwT) channel. Pass in the
   * accountExpiresAt param to set the expiry time.
   */
  // deno-lint-ignore no-explicit-any
  readonly bankTransfer?: Record<string, any>;
  /**
   * An authorization code to charge (don't send if charging a bank account)
   * pin: 4-digit PIN (send with a non-reusable authorization code)
   */
  readonly authCode?: string;
  /**
   * 4-digit PIN (send with a non-reusable authorization code)
   */
  readonly pin?: string;
  /**
   * An object of data
   */
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
  /**
   * Unique transaction reference. Only -, .\\`, = and alphanumeric characters allowed.
   * ussd: USSD type to charge (don't send if charging an authorization code, bank or card)
   */
  readonly reference?: string;
  /**
   * USSD type to charge (don't send if charging an authorization code, bank or card)
   * mobile_money: Mobile details (don't send if charging an authorization code, bank or card)
   */
  // deno-lint-ignore no-explicit-any
  readonly ussd?: Record<string, any>;
  /**
   * Mobile details (don't send if charging an authorization code, bank or card)
   */
  // deno-lint-ignore no-explicit-any
  readonly mobileMoney?: Record<string, any>;
  /**
   * This is the unique identifier of the device a user uses in making payment. Only -, .\\`,
   * = and alphanumeric characters allowed.
   */
  readonly deviceId?: string;
};

/**
 * A representation of the data that is sent to paystack to submit an address
 */
export type SubmitAddressPayload = {
  /**
   * Address submitted by user
   */
  readonly address: string;
  /**
   * Reference for ongoing transaction
   */
  readonly reference: string;
  /**
   * City submitted by user
   */
  readonly city: string;
  /**
   * State submitted by user
   */
  readonly state: string;
  /**
   * Zipcode submitted by user
   */
  readonly zipcode: string;
};
