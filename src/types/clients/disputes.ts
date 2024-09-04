import type { DisputeStatus, Resolution } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

export type GetDisputesOptions = PaginationAndDateFilterOptions & {
  transaction?: string;
  status?: DisputeStatus;
};

export type AddEvidencePayload = {
  readonly customerEmail: string;
  readonly customerName: string;
  readonly customerPhone: string;
  readonly serviceDetails: string;
  readonly deliveryAddress: string;
  readonly deliveryDate: string;
};

export type ResolveDisputePayload = {
  readonly resolution: Resolution;
  readonly message: string;
  readonly refundAmount?: number;
  readonly uploadedFilename?: string;
  readonly evidence?: number;
};

export type ExportDisputesOptions = GetDisputesOptions;
