export type PaystackResponse = {
  readonly statusCode: number;
  readonly status: boolean;
  readonly message: string;
  readonly data: Record<string, any> | Record<string, any>[] | null;
};

export type PaginationOptions = {
  readonly page?: number;
  readonly perPage?: number;
};

export type DateFilterOptions = {
  readonly from?: string;
  readonly to?: string;
};

export type PaginationAndDateFilterOptions =
  & PaginationOptions
  & DateFilterOptions;
