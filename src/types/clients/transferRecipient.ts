import type { Currency, RecipientType } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

export type Recipient = {
  readonly type: RecipientType;
  readonly name: string;
  readonly accountNumber: string;
  readonly bankCode?: string;
};

export type CreatePayload = Recipient & {
  readonly description?: string;
  readonly currency?: Currency;
  readonly authCode?: string;
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
};

export type GetTransferRecipientsOptions = PaginationAndDateFilterOptions & {};
