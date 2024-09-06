import type { Status } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of a unit of a bulk charge
 */
export type BulkChargeInstruction = {
  /** The authorization code of the customer you want to charge. */
  readonly authorization: string;
  /** The amount you want to charge. */
  readonly amount: number;
  /** The transaction reference. */
  readonly reference: string;
};

/**
 * Lets you customize how the batches are retrieved by filtering
 * by date or adjusting how much data should be returned or which
 * sets of data to be returned by pagination.
 */
export type GetBatchesOptions = PaginationAndDateFilterOptions;

/**
 * Lets you customize how the batches are retrieved by filtering
 * by date or adjusting how much data should be returned or which
 * sets of data to be returned by pagination.
 */
export type GetChargesInBatchOptions = PaginationAndDateFilterOptions & {
  /** Lets you filter by the charge status */
  readonly status: Status;
};
