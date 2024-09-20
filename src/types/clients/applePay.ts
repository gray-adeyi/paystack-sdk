/**
 * Let's you customize how the apple pay domains are retrieved.
 */
export type GetDomainsOptions = {
  /** Flag to enable cursor pagination on the endpoint */
  readonly useCursor?: boolean;
  /** A cursor that indicates your place in the list.
   * It can be used to fetch the next page of the list
   */
  readonly next?: string;
  /**
   * A cursor that indicates your place in the list.
   * It should be used to fetch the previous page of
   * the list after an initial next request
   */
  readonly previous?: string;
};
