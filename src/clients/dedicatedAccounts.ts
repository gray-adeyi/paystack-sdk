import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  AssignDedicatedAccountPayload,
  CreateDedicatedAccountPayload,
  GetDedicatedAccountsOptions,
  SplitPayload,
} from "../types/clients/dedicatedAccounts.ts";
import type { PaystackResponse } from "../types/global.ts";

/**
 * DedicatedAccountClient provides methods that lets you interface with Paystack's
 * Dedicated Virtual Account API
 *
 * The Dedicated Virtual Account API enables Nigerian merchants to manage
 * unique payment accounts of their customers.
 * https://paystack.com/docs/api/dedicated-virtual-account/
 */
export default class DedicatedAccountClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a DedicatedAccountClient
   *
   * @param secretKey - Your paystack integration secret key.
   * @param client - A custom rest client to use for making api calls to paystack's instead
   * of creating a new one with the secretKey
   */
  constructor(secretKey?: string, client?: RestClient) {
    if (client) {
      this.client = client;
    } else {
      this.client = new RestClient(secretKey);
    }
  }

  /**
   * Created a dedicated virtual account for an existing customer.
   *
   * @remarks This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
   *
   * @param payload : {@link CreateDedicatedAccountPayload} is the data used to
   * create the dedicated virtual account.
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: CreateDedicatedAccountPayload): Promise<PaystackResponse> {
    return this.client.call(
      "/dedicated_account",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Create a customer, validate the customer, and assign a DVA to the customer.
   *
   * @remarks This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
   *
   * @param payload : The data sent to paystack.
   * @returns A promise containing a {@link PaystackResponse}
   */
  assign(payload: AssignDedicatedAccountPayload): Promise<PaystackResponse> {
    return this.client.call(
      "/dedicated_account/assign",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Fetches dedicated virtual accounts available on your integration.
   *
   * @param options : {@link GetDedicatedAccountsOptions} lets you customize
   * the array of dedicated accounts returned in the PaystackResponse.data.
   * It requires the `active` flag in the options which let's you filter by
   * active dedicated accounts.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getDedicatedAccounts(
    options: GetDedicatedAccountsOptions,
  ): Promise<PaystackResponse> {
    return this.client.call(
      "/dedicated_account",
      HTTPMethod.GET,
      null,
      options,
    );
  }

  /**
   * Get details of a dedicated virtual account on your integration.
   *
   * @remarks This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
   *
   * @param dedicatedAccountId : ID of the dedicated virtual account.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getDedicatedAccount(dedicatedAccountId: string): Promise<PaystackResponse> {
    return this.client.call(
      `/dedicated_account/${dedicatedAccountId}`,
      HTTPMethod.GET,
    );
  }

  /**
   * Requery Dedicated Virtual Account for new transactions
   *
   * @remarks This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
   *
   * @param accountNumber : Virtual account number to requery
   * @param providerSlug : The bank's slug in lowercase, without spaces.
   * e.g. wema-bank
   * @param date : The day the transfer was made in YYYY-MM-DD ISO format.
   * @returns A promise containing a {@link PaystackResponse}
   */
  requery(
    accountNumber: string,
    providerSlug: string,
    date?: string,
  ): Promise<PaystackResponse> {
    return this.client.call(
      "dedicated_account",
      HTTPMethod.GET,
      null,
      { accountNumber, providerSlug, date },
    );
  }

  /**
   * Deactivate a dedicated virtual account on your integration.
   *
   * @remarks This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
   *
   * @param dedicatedAccountId : ID of the dedicated virtual account.
   * @returns A promise containing a {@link PaystackResponse}
   */
  deactivate(dedicatedAccountId: string): Promise<PaystackResponse> {
    return this.client.call(
      `dedicated_account/${dedicatedAccountId}`,
      HTTPMethod.DELETE,
    );
  }

  /**
   * Split a dedicated virtual account transaction with one or more accounts
   *
   * @remarks This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
   *
   * @param payload : {@link SplitPayload}
   * @returns A promise containing a {@link PaystackResponse}
   */
  split(payload: SplitPayload): Promise<PaystackResponse> {
    return this.client.call(
      "/dedicated_account/split",
      HTTPMethod.POST,
      payload,
    );
  }

  /**
   * Removes a split.
   *
   * If you've previously set up split payment for transactions on a
   * dedicated virtual account, you can remove it with this method.
   *
   * @remarks This feature is only available to businesses in Nigeria.
   * Paystack currently supports Wema Bank and Titan Paystack.
   *
   * @param accountNumber : Dedicated virtual account number
   * @returns A promise containing a {@link PaystackResponse}
   */
  removeSplit(accountNumber: string): Promise<PaystackResponse> {
    return this.client.call(
      "/dedicated_account/split",
      HTTPMethod.DELETE,
      { accountNumber },
    );
  }

  /**
   * Get available bank providers for a dedicated virtual account
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  getProviders(): Promise<PaystackResponse> {
    return this.client.call(
      "/dedicated_account/available_providers",
      HTTPMethod.GET,
    );
  }
}
