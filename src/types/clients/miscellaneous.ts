import type { BankType, Country, Currency, Gateway } from "../../enums.ts";

/**
 * A representation of options available when retrieving banks
 */
export type GetBanksOptions = {
  /**
   * The country from which to obtain the list of supported banks.
   * any value from the {@link Country} enum.
   */
  readonly country: Country;
  /**
   * Flag to enable cursor pagination.
   */
  readonly useCursor?: boolean;
  /**
   * A cursor that indicates your place in the list.
   * It can be used to fetch the next page of the list
   */
  readonly next?: string;
  /**
   * A cursor that indicates your place in the list. It should be used
   * to fetch the previous page of the list after an initial next request
   */
  readonly previous?: string;
  /**
   * The gateway type of the bank. Any value from the {@link Gateway} enum.
   */
  readonly gateway?: Gateway;
  /**
   * Type of financial channel. For Ghanaian channels, please use either
   * `BankType.MOBILE_MONEY` for mobile money channels OR `BankType.GHIPPS` for bank channels
   * @see {@link BankType}
   */
  readonly type?: BankType;
  /**
   * Any value from the {@link Currency} enum.
   */
  readonly currency?: Currency;
  /**
   * A flag to filter for available banks a customer can make a
   * transfer to complete a payment
   */
  readonly payWithBankTransfer?: boolean;
  /**
   * A flag to filter for banks a customer can pay directly from
   */
  readonly payWithBank?: boolean;
  /**
   * The number of objects to return per page. Defaults to 50,
   * and limited to 100 records per page.
   */
  readonly perPage?: number;
};
