import type { DisputeStatus, Resolution } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of options available when retrieving disputes.
 * like paginating, filtering by date, transaction or the status of
 * the dispute. @see {@link PaginationAndDateFilterOptions}
 */
export type GetDisputesOptions = PaginationAndDateFilterOptions & {
  /** Transaction ID */
  transaction?: string;
  /** Any value of the {@link DisputeStatus} enum to denote the status of the
   * disputes you want to retrieve
   */
  status?: DisputeStatus;
};

/**
 * A representation of the data sent to paystack to denote the data sent to
 * provide evidence for a dispute.
 */
export type AddEvidencePayload = {
  /** The customer's email address */
  readonly customerEmail: string;
  /** The customer's name */
  readonly customerName: string;
  /** The customer's phone number */
  readonly customerPhone: string;
  /** The details of the service involved */
  readonly serviceDetails: string;
  /** The delivery address */
  readonly deliveryAddress: string;
  /** ISO 8601 representation of delivery date (YYYY-MM-DD) */
  readonly deliveryDate: string;
};

/**
 * A representation of the data sent to Paystack to resolve a dispute
 */
export type ResolveDisputePayload = {
  /**
   * Any value of the {@link Resolution} enum to denote how the dispute
   * should be resolved.
   */
  readonly resolution: Resolution;
  /** Reason for resolving the dispute */
  readonly message: string;
  /**
   * the amount to refund, in kobo if currency is NGN,
   * pesewas, if currency is GHS, and cents, if currency is ZAR
   */
  readonly refundAmount?: number;
  /**
   * filename of attachment returned via response from
   * `PaystackClient.disputes.getUploadUrl`
   */
  readonly uploadedFilename?: string;
  /**
   * Evidence ID for fraud claims
   */
  readonly evidence?: number;
};

/**
 * A representation of options available when exporting disputes.
 * @see {@link GetDisputesOptions}
 */
export type ExportDisputesOptions = GetDisputesOptions;
