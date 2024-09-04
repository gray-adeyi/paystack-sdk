import type { Currency, Interval, Status } from "../../enums.ts";
import type { PaginationOptions } from "../global.ts";

export type CreatePlanPayload = {
  readonly name: string;
  readonly amount: number;
  readonly interval: Interval;
  readonly description?: string;
  readonly currency?: Currency;
  readonly invoiceLimit?: number;
  readonly sendInvoices?: boolean;
  readonly sendSms?: boolean;
};

export type GetPlansOptions = PaginationOptions & {
  readonly status?: Status;
  readonly interval?: Interval;
  readonly amount?: number;
};

export type UpdatePlanPayload = {
  readonly name?: string;
  readonly amount?: number;
  readonly interval?: Interval;
  readonly description?: string;
  readonly currency?: Currency;
  readonly invoiceLimit?: number;
  readonly sendInvoices?: boolean;
  readonly sendSms?: boolean;
};
