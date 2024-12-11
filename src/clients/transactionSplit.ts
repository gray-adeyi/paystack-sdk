import RestClient, { HTTPMethod } from "../restClient.ts";
import type {
  GetSplitsOptions,
  TransactionSplitCreatePayload,
  UpdateTxSplitPayload,
} from "../types/clients/index.ts";
import type { PaystackResponse } from "../types/global.ts";
import type { TransactionSplit } from "../types/models.ts";

/**
 * TransactionSplitClient provides methods lets you interface with Paystack's
 * Transaction Splits API which enables merchants split the settlement for a transaction
 * across their payout account, and one or more Subaccounts.
 * https://paystack.com/docs/api/split/
 */
export default class TransactionSplitClient {
  private client: RestClient;

  /**
   * @constructor Instantiate a TransactionSplitClient
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
   * Create a split payment on your integration
   * @param payload : {@link TransactionSplitCreatePayload} is the data sent to
   * paystack to create a transaction split.
   * @returns A promise containing a {@link PaystackResponse}
   */
  create(payload: TransactionSplitCreatePayload): Promise<
    PaystackResponse<TransactionSplit>
  > {
    return this.client.call("/split", HTTPMethod.POST, payload) as Promise<
      PaystackResponse<TransactionSplit>
    >;
  }

  /**
   * Get/search for the transaction splits available on your integration.
   *
   * @param options : {@link GetSplitsOptions} lets you customize the data
   * to be returned in the response.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getSplits(options?: GetSplitsOptions): Promise<
    PaystackResponse<TransactionSplit[]>
  > {
    return this.client.call("/split", HTTPMethod.GET, null, options) as Promise<
      PaystackResponse<TransactionSplit[]>
    >;
  }

  /**
   * Get details of a split on your integration.
   *
   * @param id : The id of the split.
   * @returns A promise containing a {@link PaystackResponse}
   */
  getSplit(id: string): Promise<
    PaystackResponse<TransactionSplit>
  > {
    return this.client.call(`/split/${id}`, HTTPMethod.GET) as Promise<
      PaystackResponse<TransactionSplit>
    >;
  }

  /**
   * Update a transaction split details on your integration
   *
   * @param id : The split id
   * @param payload: {@link UpdateTxSplitPayload} is the data used to
   * update the transaction split.
   * @returns A promise containing a {@link PaystackResponse}
   */
  update(id: string, payload: UpdateTxSplitPayload): Promise<
    PaystackResponse<TransactionSplit>
  > {
    return this.client.call(`/split/${id}`, HTTPMethod.PUT, payload) as Promise<
      PaystackResponse<TransactionSplit>
    >;
  }

  /**
   * Add a Subaccount to a Transaction Split, or update
   * the share of an existing Subaccount in a Transaction Split
   *
   * @param id : the split ID
   * @param subaccount : the subaccount code.
   * @param share : This is the transaction share for the subaccount
   * @returns A promise containing a {@link PaystackResponse}
   */
  addOrUpdate(
    id: string,
    subaccount: string,
    share: number,
  ): Promise<PaystackResponse<TransactionSplit>> {
    return this.client.call(`/split/${id}/subaccount/add`, HTTPMethod.POST, {
      subaccount,
      share,
    }) as Promise<PaystackResponse<TransactionSplit>>;
  }

  /**
   * Remove a subaccount from a transaction split
   *
   * @param id : The split id,
   * @param subaccount: This is the subaccount code
   *
   * @returns A promise containing a {@link PaystackResponse}
   */
  remove(
    id: string,
    subaccount: string,
  ): Promise<PaystackResponse<TransactionSplit>> {
    return this.client.call(`/split/${id}/subaccount/remove`, HTTPMethod.POST, {
      subaccount,
    }) as Promise<PaystackResponse<TransactionSplit>>;
  }
}
