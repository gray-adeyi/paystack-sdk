import type { Schedule } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

export type CreateSubAccountPayload = {
  readonly businessName: string;
  readonly settlementBank: string;
  readonly accountNumber: string;
  readonly percentageCharge: number;
  readonly description?: string;
  readonly primaryContactEmail?: string;
  readonly primaryContactName?: string;
  readonly primaryContactPhone?: string;
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
};

export type GetSubAccountsOptions = PaginationAndDateFilterOptions & {};

export type UpdateSubAccountPayload = CreateSubAccountPayload & {
  readonly active?: boolean;
  readonly settlementSchedule?: Schedule;
};
