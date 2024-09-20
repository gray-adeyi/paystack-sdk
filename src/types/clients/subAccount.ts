import type { Schedule } from "../../enums.ts";
import type { PaginationAndDateFilterOptions } from "../global.ts";

/**
 * A representation of the data sent to paystack to create a subaccount.
 */
export type CreateSubAccountPayload = {
  /**
   * Name of business for subaccount
   */
  readonly businessName: string;
  /**
   * Bank Code for the bank. You can get the
   * list of Bank Codes by calling 
   * ``PaystackClient.miscellaneous.getBanks`` method
   */
  readonly settlementBank: string;
  /**
   * bank account number
   */
  readonly accountNumber: string;
  /**
   * The default percentage charged when receiving on behalf of this subaccount
   */
  readonly percentageCharge: number;
  /**
   * A description for this subaccount
   */
  readonly description?: string;
  /**
   * A contact email for the subaccount
   */
  readonly primaryContactEmail?: string;
  /**
   * A name for the contact person for this subaccount
   */
  readonly primaryContactName?: string;
  /**
   * A phone number to call for this subaccount
   */
  readonly primaryContactPhone?: string;
  /**
   * Add a custom_fields attribute which has a list of dictionaries if
   * you would like the fields to be added to your transaction when
   * displayed on the dashboard.
   * Sample: ``{"custom_fields":[{"display_name":"Cart ID",
   * "variable_name": "cart_id","value": "8393"}]}``
   */
  // deno-lint-ignore no-explicit-any
  readonly metadata?: Record<string, any>;
};

/**
 * Lets you customize how subaccounts are retrieved.
 * @see {@link GetSubAccountsOptions}
 */
export type GetSubAccountsOptions = PaginationAndDateFilterOptions;

/**
 * A representation of the data sent to paystack to update a subaccount
 */
export type UpdateSubAccountPayload = CreateSubAccountPayload & {
  readonly active?: boolean;
  readonly settlementSchedule?: Schedule;
};
