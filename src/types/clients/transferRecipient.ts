import type { Currency, RecipientType } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of a transfer recipient
 */
export type Recipient = {
  /**
   * Recipient Type. any value from the {@link RecipientType} enum
   */
  readonly type: RecipientType;
  /**
   * A name for the recipient
   */
  readonly name: string;
  /**
   * Required if ``type`` is ``RecipientType.NUBAN`` or ``RecipientType.BASA``
   */
  readonly accountNumber: string;
  /**
   * Required if ``type`` is ``RecipientType.NUBAN`` or ``RecipientType.BASA``.
   * You can get the list of Bank Codes by calling
   * the ``PaystackClient.miscellaneous.getBanks`` method
   */
  readonly bankCode?: string;
};

/**
 * A representation of the data sent to paystack to create
 * a transfer recipient
 */
export type CreateTransferRecipientPayload = Recipient & {
  readonly description?: string;
  readonly currency?: Currency;
  readonly authCode?: string;
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
};

/**
 * Lets you customize how transfer recipients are retrieved
 * @see {@link PaginationAndDateFilterOptions}
 */
export type GetTransferRecipientsOptions = PaginationAndDateFilterOptions;
