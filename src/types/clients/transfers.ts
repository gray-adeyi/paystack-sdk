import type { Currency } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

export type InitiateTransferPayload = {
  readonly amount: number;
  readonly recipient: string;
  readonly reason?: string;
  readonly currency?: Currency;
  readonly reference?: string;
  readonly source: "balance";
};

export type TransferInstruction = {
  readonly amount: number;
  readonly recipient: string;
  readonly reference?: string;
  readonly reason?: string;
};

export type GetTransferOptions = PaginationAndDateFilterOptions & {
  readonly customer?: string;
};
