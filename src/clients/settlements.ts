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
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param options - {@link GetSettlementsOptions} lets you customize the data
   * that is returned in the response
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Settlement}
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
   * @remarks
   *
   * For typescript users, you may experience inconsistencies in the returned data such as
   * the data returned doesn't match the method return type or the data returned has
   * more fields that are not showing up or flagged as errors. This is because no validation
   * is done to check if the actual returned data matches the return type. The returned data
   * is just cast as the return type. Also, the return types are based on the seen data as at
   * the time of implementation and are subject to errors and changes from paystack (e.g.,
   * paystack adding more fields, which makes the models incorrect). When faced with this issue
   * in development, you may cast the method return type as `any` and then cast is to a return
   * type that serves your purpose. Also, please create an issue for it at
   * https://github.com/gray-adeyi/paystack-sdk/issues so the issue is fixed in future releases.
   *
   * @param id - The settlement ID in which you want to fetch its transactions
   * @param options - {@link GetSettlementTransactionsOptions} lets you customize the
   * data that is to be returned in the response
   * @returns A promise that resolves to an object whose type is {@link PaystackResponse}.
   * The data property of the object is another object of type {@link Transaction}
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
