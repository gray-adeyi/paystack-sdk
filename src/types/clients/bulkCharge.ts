import { Status } from "../../enums.ts";
import { PaginationAndDateFilterOptions } from "../global.ts";

export type BulkChargeInstruction = {
  readonly authorization: string;
  readonly amount: number;
  readonly reference: string;
};

export type GetBatchesOptions = PaginationAndDateFilterOptions & {};

export type GetChargesInBatchOptions = PaginationAndDateFilterOptions & {
  readonly status: Status;
};
