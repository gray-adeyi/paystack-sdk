/**
 * A representation of the response returned from Paystack from calling any of
 * the client methods that makes an API call
 */
export type PaystackResponse = {
  /** The http status code of the response */
  readonly statusCode: number;
  /** Status denotes if the request that led to this response was successful */
  readonly status: boolean;
  /** A brief description of the response */
  readonly message: string;
  /** The data returned from Paystack as a result of the request.
   * The keys of the data are transformed to camel case.
   */
  // deno-lint-ignore no-explicit-any
  readonly data: Record<string, any> | Record<string, any>[] | null;
  // Additional information about the response.
  readonly meta?: Record<string, any>;
  //In cases where the response has a status of `False` or the status code
  //is an error status code. the `type` field indicates the type of error e.g. `api_error
  readonly type?: string;
  //In cases where the response has a status of `False` or the status code
  //is an error status code. the `type` field indicates the type of error e.g. `api_error`
  readonly code?: string;
};

/**
 * A representation of options available for paginating a large data.
 * it is used with client methods where there's need to retrieve from
 * a large dataset in small partitions.
 */
export type PaginationOptions = {
  /** It denotes the current page/subset of the large data you want to retrieve. */
  readonly page?: number;
  /** It denotes how much items you want in a subset. */
  readonly perPage?: number;
};

/**
 * A representation of options available for filtering by date
 */
export type DateFilterOptions = {
  /** The start timestamp to start the filtering */
  readonly from?: string;
  /** The stop timestamp to end the filtering */
  readonly to?: string;
};

/**
 * A representation of options that allows pagination and filtering
 * by date. @see {@link PaginationOptions} and {@link DateFilterOptions}
 */
export type PaginationAndDateFilterOptions = PaginationOptions &
  DateFilterOptions;
