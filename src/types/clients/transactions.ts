import type {
  Bearer,
  Channel,
  Currency,
  TransactionStatus,
} from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

export type InitializeTransactionPayload = {
  readonly amount: number;
  readonly email: string;
  readonly currency?: Currency;
  readonly reference?: string;
  readonly callbackUrl?: string;
  readonly plan?: string;
  readonly invoiceLimit?: number;
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
  readonly channels?: Channel[];
  readonly splitCode?: string;
  readonly subaccount?: string;
  readonly transferCharge?: number;
  readonly bearer?: Bearer;
};

export type GetTransactionsOptions = PaginationAndDateFilterOptions & {
  readonly customer?: string;
  readonly status?: TransactionStatus;
  readonly amount?: number;
};

export type ChargePayload = {
  readonly amount: number;
  readonly email: string;
  readonly authCode: string;
  readonly reference?: string;
  readonly currency?: Currency;
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
  readonly channels?: Channel[];
  readonly subaccount?: string;
  readonly transactionCharge?: number;
  readonly bearer?: Bearer;
  readonly queue?: boolean;
};

export type TotalsOptions = PaginationAndDateFilterOptions & {};

export type ExportOptions = PaginationAndDateFilterOptions & {
  readonly customer?: string;
  readonly status?: TransactionStatus;
  readonly currency?: Currency;
  readonly amount?: number;
  readonly settled?: boolean;
  readonly settlement?: string;
  readonly paymentPage?: string;
};

export type PartialDebitPayload = {
  readonly authCode: string;
  readonly currency: Currency;
  readonly amount: number;
  readonly email: string;
  readonly reference?: string;
  readonly atLeast?: number;
};
