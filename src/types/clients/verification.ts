import type { AccountType, Country, Document } from "../../enums.ts";

/**
 * A representation of the data sent to paystack to validate an account
 */
export type ValidateAccountPayload = {
  /**
   * Customer's first and last name registered with their bank
   */
  readonly accountName: string;
  /**
   * Customer's account number
   */
  readonly accountNumber: string;
  /**
   * Any value from the {@link AccountType} enum
   */
  readonly accountType: AccountType;
  /**
   * The bank code of the customer’s bank
   */
  readonly bankCode: string;
  /**
   * Any value from the {@link Country} enum
   */
  readonly countryCode: Country;
  /**
   * Customer’s mode of identity. any value from the
   * ``Document`` enum.
   */
  readonly documentType: Document;
  /**
   * Customer’s mode of identity number
   */
  readonly documentNumber?: string;
};
