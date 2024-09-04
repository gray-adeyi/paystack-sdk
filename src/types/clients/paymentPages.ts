import type { PaginationAndDateFilterOptions } from "../global.ts";

export type CreatePaymentPagePayload = {
  readonly name: string;
  readonly description?: string;
  readonly amount?: number;
  readonly splitCode?: string;
  readonly slug?: string;
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
  readonly redirectUrl?: string;
  // deno-lint-ignore no-explicit-any
  readonly customFields?: any[];
};

export type GetPagesOptions = PaginationAndDateFilterOptions;

export type UpdatePaymentPagePayload = {
  readonly name: string;
  readonly description: string;
  readonly amount?: number;
  readonly active?: boolean;
};
