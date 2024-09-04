import type { Currency } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

export type CreateRefundPayload = {
  readonly transaction: string;
  readonly amount?: number;
  readonly currency?: Currency;
  readonly customerNote?: string;
  readonly merchantNote?: string;
};

export type GetRefundsOptions = PaginationAndDateFilterOptions & {
  readonly reference?: string;
  readonly currency?: Currency;
};
