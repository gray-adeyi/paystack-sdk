import type { TerminalEvent, TerminalEventAction } from "../../enums.ts";

/**
 * A representation of the data sent to Paystack
 * to push terminal events
 */
export type SendEventPayload = {
  /**
   * The type of event to push. Paystack currently supports `TerminalEventType.INVOICE` and
   * `TerminalEventType.TRANSACTION`.
   */
  readonly type: TerminalEvent;
  /**
   * The action the Terminal needs to perform. For the `TerminalEventType.INVOICE` type,
   * the action can either be `TerminalEventAction.PROCESS` or TerminalEventAction.VIEW.
   * For the `TerminalEventType.TRANSACTION` type, the action can either be
   * `TerminalEventAction.PROCESS` or `TerminalEventAction.PRINT`.
   */
  readonly action: TerminalEventAction;
  /**
   * The parameters needed to perform the specified action. For the invoice type, you need to
   * pass the invoice id and offline reference: {id: invoiceId, reference: offlineReference}.
   * For the transaction type, you can pass the transaction id: {id: transactionId}
   */
  // deno-lint-ignore no-explicit-any
  readonly data: Record<string, any>;
};

/**
 * Let's you customize how terminals are retrieved
 */
export type GetTerminalsOptions = {
  readonly perPage?: number;
  /**
   * A cursor that indicates your place in the list.
   * It should be used to fetch the next page.
   */
  readonly next?: string;
  /**
   * A cursor that indicates your place in the list.
   * It should be used to fetch the
   * previous page of the list after an initial next request
   */
  readonly previous?: string;
};
