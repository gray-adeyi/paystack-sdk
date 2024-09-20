import type { Currency } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of the data sent by paystack to initiate a transfer
 */
export type InitiateTransferPayload = {
  /**
   * Amount to transfer
   */
  readonly amount: number;
  /**
   * The beneficiary of the transfer
   */
  readonly recipient: string;
  /**
   * narration of the transfer
   */
  readonly reason?: string;
  /**
   * transfer currency
   */
  readonly currency?: Currency;
  /**
   * reference id
   */
  readonly reference?: string;
  /**
   * transfer source
   */
  readonly source: "balance";
};

/**
 * A representation of transfer instructions
 */
export type TransferInstruction = {
  /**
   * The amount to be transferred.
   */
  readonly amount: number;
  /**
   * The beneficiary of the transaction.
   */
  readonly recipient: string;
  /**
   * The reference for the transaction.
   */
  readonly reference?: string;
  /**
   * The narration of the transaction.
   */
  readonly reason?: string;
};

/**
 * Lets you customize how transfers are retrieved.
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetTransferOptions = PaginationAndDateFilterOptions & {
  /**
   * Filter by customer
   */
  readonly customer?: string;
};
