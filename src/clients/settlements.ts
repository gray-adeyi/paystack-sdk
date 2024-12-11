import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetSettlementsOptions,
  GetSettlementTransactionsOptions,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { Settlement, Transaction } from "../types/models.ts";

/**
 * SettlementClient provides methods that lets you interface with Paystack's
 * Settlements API which allows you gain insights into payouts made by
 * Paystack to your bank account. https://paystack.com/docs/api/settlement/
 */
export default class SettlementClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a SettlementClient
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
   * Fetch settlements made to your settlement accounts.
   *
   * @param options : {@link GetSettlementsOptions} lets you customize the data
   * that is returned in the response
   * @returns A promise containing a {@link PaystackResponse}
   */
  getSettlements(
    options?: GetSettlementsOptions,
  ): Promise<PaystackResponse<Settlement>> {
    return this.client.call(
      "/settlement",
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Settlement>>;
  }

  /**
   * Get the transactions that make up a particular settlement
   *
   * @param id : The settlement ID in which you want to fetch its transactions
   * @param options : {@link GetSettlementTransactionsOptions} lets you customize the
   * data that is to be returned in the response
   * @returns A promise containing a {@link PaystackResponse}
   */
  getSettlementTransactions(
    id: string,
    options?: GetSettlementTransactionsOptions,
  ): Promise<PaystackResponse<Transaction>> {
    return this.client.call(
      `/settlement/${id}/transactions`,
      HTTPMethod.GET,
      null,
      options,
    ) as Promise<PaystackResponse<Transaction>>;
  }
}
