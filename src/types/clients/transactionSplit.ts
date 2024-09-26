import type { Bearer, Currency, TxSplit } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of a transaction split account
 */
export type TxSplitAccount = {
  readonly subaccount: string;
  readonly share: number;
};

/**
 * A representation of the data sent to paystack to create a
 * transaction split
 */
export type TransactionSplitCreatePayload = {
  /**
   * Name of the transaction split
   */
  readonly name: string;
  /**
   * The type of transaction split you want to create.
   * Any value from the {@link SplitType} enum
   */
  readonly type: TxSplit;
  /**
   * Any value from the {@link Currency} enum
   */
  readonly currency: Currency;
  /**
   * An array of {@link TxSplitAccount} containing subaccount code and
   * number of shares: ``[{subaccount: 'ACT_xxxxxxxxxx', share: xxx},{...}]``
   */
  readonly subaccounts: TxSplitAccount[];
  /**
   * Any value from the {@link Bearer} enum
   */
  readonly bearerType: Bearer;
  /**
   * Subaccount code
   */
  readonly bearerSubaccount?: string;
};

/**
 * Lets you customize how you retrieve transaction split
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetSplitsOptions = PaginationAndDateFilterOptions & {
  /**
   * The name of the split
   */
  readonly name?: string;
  /**
   * Sort by name, defaults to createdAt date
   */
  readonly sortBy?: string;
  /**
   * Flag to filter by active
   */
  readonly active?: boolean;
};

/**
 * A representation of the data sent to paystack to update a transaction
 * split
 */
export type UpdateTxSplitPayload = {
  /**
   * The name of the transaction split
   */
  readonly name?: string;
  /**
   * Flag for active
   */
  readonly active?: boolean;
  /**
   * Any value from the {@link Bearer} enum
   */
  readonly bearerType?: Bearer;
  /**
   * Subaccount code of a subaccount in the split group.
   * This should be specified only if `the bearerType`
   * is ``Bearer.SUB_ACCOUNT``
   */
  readonly bearerSubaccount?: string;
};
