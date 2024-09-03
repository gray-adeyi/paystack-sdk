import type { Currency, Status } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

export type Tax = {
  readonly name: string;
  readonly amount: number;
};

export type LineItem = {
  readonly name: string;
  readonly amount: number;
  readonly quantity: number;
};

export type CreatePaymentRequestPayload = {
  readonly customer: string;
  readonly amount: number;
  readonly dueDate?: string;
  readonly description?: string;
  readonly lineItems?: LineItem[];
  readonly tax?: Tax[];
  readonly currency?: Currency;
  readonly sendNotifications?: boolean;
  readonly draft?: boolean;
  readonly hasInvoice?: boolean;
  readonly invoiceNumber?: number;
  readonly splitCode?: string;
};

export type GetPaymentRequestsOptions = PaginationAndDateFilterOptions & {
  readonly customer?: string;
  readonly status?: Status;
  readonly currency?: Currency;
  readonly includeArchive?: boolean;
};

export type UpdatePaymentRequestPayload = Omit<
  CreatePaymentRequestPayload,
  "hasInvoice"
>;
